// MapCacheManager.js
import { openDB } from 'idb';

const DB_NAME = 'map-tiles-db';
const DB_VERSION = 2;
const TILES_STORE = 'tiles';
const METADATA_STORE = 'metadata';
const CACHE_VERSION = 1; // Increment when tile source changes

/**
 * Initializes the IndexedDB database for map tile storage
 */
export const initCacheDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      // Handle database upgrades
      if (oldVersion < 1) {
        if (!db.objectStoreNames.contains(TILES_STORE)) {
          db.createObjectStore(TILES_STORE, { keyPath: 'id' });
        }
      }
      
      if (oldVersion < 2) {
        // Add metadata store for tracking cache status
        if (!db.objectStoreNames.contains(METADATA_STORE)) {
          db.createObjectStore(METADATA_STORE, { keyPath: 'id' });
        }
      }
    },
  });
};

/**
 * Gets current cache statistics
 * @returns {Promise<{tileCount: number, sizeMB: string, tilesByZoom: Object}>}
 */
export const getCacheStats = async () => {
  try {
    const db = await initCacheDB();
    const tiles = await db.getAll(TILES_STORE);
    
    // Calculate total size of all blobs
    let totalSize = 0;
    const tilesByZoom = {};
    
    for (const tile of tiles) {
      totalSize += tile.blob.size;
      
      // Extract zoom level from tile id (format: "z:x:y")
      const zoomLevel = tile.id.split(':')[0];
      tilesByZoom[zoomLevel] = (tilesByZoom[zoomLevel] || 0) + 1;
    }
    
    return {
      tileCount: tiles.length,
      sizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      tilesByZoom
    };
  } catch (error) {
    console.error('Error calculating cache size:', error);
    return { 
      tileCount: 0, 
      sizeMB: '0',
      tilesByZoom: {}
    };
  }
};

/**
 * Checks available storage using the Storage API
 * @returns {Promise<{used: number, available: number, total: number} | null>}
 */
export const checkStorageAvailability = async () => {
  try {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const { usage, quota } = await navigator.storage.estimate();
      const usedMB = Math.round(usage / (1024 * 1024));
      const quotaMB = Math.round(quota / (1024 * 1024));
      const availableMB = quotaMB - usedMB;
      
      return {
        used: usedMB,
        available: availableMB,
        total: quotaMB
      };
    }
    return null; // Storage API not available
  } catch (error) {
    console.error('Error checking storage:', error);
    return null;
  }
};

/**
 * Estimates the number of tiles needed for a given area and zoom levels
 * @param {Object} bounds - The bounds of the area {north, south, east, west}
 * @param {number} minZoom - Minimum zoom level
 * @param {number} maxZoom - Maximum zoom level
 * @returns {number} - Estimated number of tiles
 */
export const estimateTileCount = (bounds, minZoom, maxZoom) => {
  let totalTiles = 0;
  
  for (let zoom = minZoom; zoom <= maxZoom; zoom++) {
    const nwTile = latLngToTile(bounds.north, bounds.west, zoom);
    const seTile = latLngToTile(bounds.south, bounds.east, zoom);
    
    const xTiles = seTile.x - nwTile.x + 1;
    const yTiles = seTile.y - nwTile.y + 1;
    
    totalTiles += xTiles * yTiles;
  }
  
  return totalTiles;
};

/**
 * Estimates the size of a tile cache based on tile count
 * @param {number} tileCount - Number of tiles
 * @returns {string} - Estimated size in MB (formatted to 1 decimal place)
 */
export const estimateCacheSize = (tileCount) => {
  // Average OSM tile size is around 15KB (can vary based on area details)
  const avgTileSizeKB = 15;
  const estimatedSizeKB = tileCount * avgTileSizeKB;
  return (estimatedSizeKB / 1024).toFixed(1); // Convert to MB
};

/**
 * Converts latitude/longitude to tile coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} zoom - Zoom level
 * @returns {{x: number, y: number}} - Tile coordinates
 */
export const latLngToTile = (lat, lng, zoom) => {
  const n = Math.pow(2, zoom);
  const x = Math.floor((lng + 180) / 360 * n);
  const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
  return { x, y };
};

/**
 * Cleans up old tiles to free up storage space
 * @param {number} olderThanDays - Delete tiles older than this many days
 * @returns {Promise<number>} - Number of tiles deleted
 */
export const cleanupOldTiles = async (olderThanDays = 30) => {
  try {
    const db = await initCacheDB();
    const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
    const tx = db.transaction(TILES_STORE, 'readwrite');
    const store = tx.objectStore(TILES_STORE);
    
    // Get all tiles
    const allTiles = await store.getAll();
    
    // Find old tiles or tiles with old version
    const oldTiles = allTiles.filter(tile => 
      (tile.timestamp < cutoffTime) || 
      (!tile.version || tile.version < CACHE_VERSION)
    );
    
    // Delete old tiles
    for (const tile of oldTiles) {
      await store.delete(tile.id);
    }
    
    await tx.done;
    return oldTiles.length;
  } catch (error) {
    console.error('Error cleaning up old tiles:', error);
    return 0;
  }
};

/**
 * Clears all cached tiles and metadata
 * @returns {Promise<boolean>} - Success indicator
 */
export const clearAllCachedData = async () => {
  try {
    const db = await initCacheDB();
    
    // Clear tiles
    const tilesTx = db.transaction(TILES_STORE, 'readwrite');
    await tilesTx.objectStore(TILES_STORE).clear();
    await tilesTx.done;
    
    // Clear metadata
    const metadataTx = db.transaction(METADATA_STORE, 'readwrite');
    await metadataTx.objectStore(METADATA_STORE).clear();
    await metadataTx.done;
    
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

/**
 * Gets the detailed metadata for a cached region
 * @param {string} regionId - ID of the region (e.g., 'itbayat-cache-status')
 * @returns {Promise<Object|null>} - Metadata object or null if not found
 */
export const getRegionCacheStatus = async (regionId) => {
  try {
    const db = await initCacheDB();
    return await db.get(METADATA_STORE, regionId);
  } catch (error) {
    console.error('Error getting region cache status:', error);
    return null;
  }
};