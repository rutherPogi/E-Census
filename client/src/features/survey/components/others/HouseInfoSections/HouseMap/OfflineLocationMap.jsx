// OfflineLocationMap.jsx
import { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import PlaceIcon from '@mui/icons-material/Place';
import { openDB } from 'idb';

// Constants
const ITBAYAT_COORDINATES = [20.7758, 121.8491];
const DEFAULT_ZOOM = 14;
const MIN_ZOOM = 12;
const MAX_ZOOM = 17;
const CACHE_VERSION = 1; // Increment when tile source changes

// Configure the radius for caching around Itbayat
const CACHE_RADIUS = {
  lat: 0.08, // About 8km north-south
  lng: 0.08  // About 8km east-west
};

// Initialize IndexedDB for map tiles
const initDB = async () => {
  return openDB('map-tiles-db', 2, {
    upgrade(db, oldVersion, newVersion) {
      // Handle database upgrades
      if (oldVersion < 1) {
        if (!db.objectStoreNames.contains('tiles')) {
          db.createObjectStore('tiles', { keyPath: 'id' });
        }
      }
      
      if (oldVersion < 2) {
        // Add metadata store for tracking cache status
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'id' });
        }
      }
    },
  });
};

// Custom hook to check online status
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
};

// Custom hook to check if Itbayat area is cached
const useItbayatCacheStatus = () => {
  const [isCached, setIsCached] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkCache = async () => {
      try {
        const db = await initDB();
        const metadata = await db.get('metadata', 'itbayat-cache-status');
        
        if (metadata && metadata.version === CACHE_VERSION && metadata.isComplete) {
          setIsCached(true);
        } else {
          setIsCached(false);
        }
      } catch (error) {
        console.error('Error checking cache status:', error);
        setIsCached(false);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkCache();
  }, []);
  
  return { isCached, isChecking };
};

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Offline-ready tile layer
const CachedTileLayer = ({ url, isOnline, subdomains = ['a', 'b', 'c'] }) => {
  const tileLayerRef = useRef(null);
  const [db, setDb] = useState(null);
  
  useEffect(() => {
    const setupDB = async () => {
      const database = await initDB();
      setDb(database);
    };
    setupDB();
  }, []);

  // Return a URL for the tile, using cache when available
  const getTileUrl = async (coords) => {
    const z = coords.z;
    const x = coords.x;
    const y = coords.y;
    const tileId = `${z}:${x}:${y}`;
    
    if (!db) return url.replace('{z}', z).replace('{x}', x).replace('{y}', y).replace('{s}', subdomains[0]);
    
    try {
      // Try to get tile from IndexedDB
      const tile = await db.get('tiles', tileId);
      
      if (tile) {
        // Return cached tile as blob URL
        return URL.createObjectURL(tile.blob);
      } else if (isOnline) {
        // If online and not cached, fetch from network
        const subdomain = subdomains[Math.floor(Math.random() * subdomains.length)];
        return url.replace('{z}', z).replace('{x}', x).replace('{y}', y).replace('{s}', subdomain);
      } else {
        // If offline and not cached, return placeholder
        return '/offline-tile.png';
      }
    } catch (error) {
      console.error('Error retrieving tile:', error);
      return url.replace('{z}', z).replace('{x}', x).replace('{y}', y).replace('{s}', subdomains[0]);
    }
  };

  // TileLayer with custom caching behavior
  return (
    <TileLayer
      ref={tileLayerRef}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url={url}
      eventHandlers={{
        tileloadstart: async (e) => {
          if (!isOnline || !db) return;
          
          const { coords } = e.tile;
          const z = coords.z;
          const x = coords.x;
          const y = coords.y;
          const tileId = `${z}:${x}:${y}`;
          
          try {
            // Check if tile already exists in cache
            const existingTile = await db.get('tiles', tileId);
            if (!existingTile) {
              // Fetch and cache tile
              const subdomain = subdomains[Math.floor(Math.random() * subdomains.length)];
              const tileUrl = url
                .replace('{z}', z)
                .replace('{x}', x)
                .replace('{y}', y)
                .replace('{s}', subdomain);
              
              const response = await fetch(tileUrl);
              if (response.ok) {
                const blob = await response.blob();
                
                // Store in IndexedDB
                await db.put('tiles', { 
                  id: tileId, 
                  blob, 
                  timestamp: Date.now(),
                  version: CACHE_VERSION
                });
              }
            }
          } catch (error) {
            console.error('Error caching tile:', error);
          }
        }
      }}
    />
  );
};

// A component to handle map click events
function MapWithPin({ position, setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
}

// A component to handle map center control
function MapController({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, DEFAULT_ZOOM);
    }
  }, [position, map]);
  
  return null;
}

// Helper function to convert lat/lng to tile coordinates
const latLngToTile = (lat, lng, zoom) => {
  const n = Math.pow(2, zoom);
  const x = Math.floor((lng + 180) / 360 * n);
  const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
  return { x, y };
};

// Helper function to estimate tile count for a given area and zoom levels
const estimateTileCount = (bounds, minZoom, maxZoom) => {
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

// Function to clean old tiles and manage storage
const cleanupOldTiles = async (db) => {
  try {
    const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const tx = db.transaction('tiles', 'readwrite');
    const store = tx.objectStore('tiles');
    
    // Get all tiles
    const allTiles = await store.getAll();
    
    // Find old tiles or tiles with old version
    const oldTiles = allTiles.filter(tile => 
      (tile.timestamp < oneMonthAgo) || 
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

// Main LocationMap component
export default function OfflineLocationMap({ position, setPosition, showNotification }) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isCachingTiles, setIsCachingTiles] = useState(false);
  const [cachingProgress, setCachingProgress] = useState(0);
  const [cachingStats, setCachingStats] = useState({ total: 0, cached: 0, failed: 0 });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  
  const isOnline = useOnlineStatus();
  const { isCached, isChecking } = useItbayatCacheStatus();
  
  // Check if we need to prompt for Itbayat caching
  useEffect(() => {
    const checkAndPrompt = async () => {
      if (!isChecking && isOnline && !isCached) {
        setSnackbarMessage('Itbayat map area is not cached for offline use. Cache now?');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
      }
    };
    
    checkAndPrompt();
  }, [isChecking, isOnline, isCached]);
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };
  
  const handleCacheFromSnackbar = () => {
    setSnackbarOpen(false);
    handleCacheItbayat();
  };
  
  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      showNotification("Geolocation is not supported by your browser", "error");
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        setIsGettingLocation(false);
        showNotification("Current location detected successfully", "success");
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "You denied the request for Geolocation";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out";
            break;
        }
        
        showNotification(errorMessage, "error");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };
  
  // Function to specifically cache the Itbayat area
  const handleCacheItbayat = async () => {
    if (!isOnline) {
      showNotification("You need to be online to cache map tiles", "error");
      return;
    }
    
    // Define the area to cache
    const bounds = {
      north: ITBAYAT_COORDINATES[0] + CACHE_RADIUS.lat,
      south: ITBAYAT_COORDINATES[0] - CACHE_RADIUS.lat,
      east: ITBAYAT_COORDINATES[1] + CACHE_RADIUS.lng,
      west: ITBAYAT_COORDINATES[1] - CACHE_RADIUS.lng
    };
    
    // Estimate the number of tiles
    const estimatedTileCount = estimateTileCount(bounds, MIN_ZOOM, MAX_ZOOM);
    const estimatedSizeMB = estimateCacheSize(estimatedTileCount);
    
    // Check available storage
    const storageInfo = await checkStorageAvailability();
    const currentCache = await getCurrentCacheSize();
    
    // Show confirmation with size information
    const confirmMessage = `
      This will cache approximately ${estimatedTileCount} map tiles 
      (estimated ${estimatedSizeMB} MB) for Itbayat.
      
      ${currentCache.tileCount > 0 ? 
        `Current cache: ${currentCache.tileCount} tiles (${currentCache.sizeMB} MB)` : 
        'No existing cache.'}
      
      ${storageInfo ? 
        `Available storage: ${storageInfo.available} MB of ${storageInfo.total} MB total.` : 
        ''}
      
      Continue with caching?
    `;
    
    if (window.confirm(confirmMessage)) {
      // Use the Itbayat coordinates as center
      cacheMapTiles(ITBAYAT_COORDINATES);
    }
  };

  // Helper function to estimate cache size in MB
  const estimateCacheSize = (tileCount) => {
    // Average OSM tile size is around 15KB (can vary based on area details)
    const avgTileSizeKB = 15;
    const estimatedSizeKB = tileCount * avgTileSizeKB;
    return (estimatedSizeKB / 1024).toFixed(1); // Convert to MB
  };

  // Function to get current cache size
  const getCurrentCacheSize = async () => {
    try {
      const db = await initDB();
      const tiles = await db.getAll('tiles');
      
      // Calculate total size of all blobs
      let totalSize = 0;
      for (const tile of tiles) {
        totalSize += tile.blob.size;
      }
      
      return {
        tileCount: tiles.length,
        sizeMB: (totalSize / (1024 * 1024)).toFixed(1)
      };
    } catch (error) {
      console.error('Error calculating cache size:', error);
      return { tileCount: 0, sizeMB: 0 };
    }
  };

  // Function to check available storage
  const checkStorageAvailability = async () => {
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

  // Function to pre-cache map tiles for offline use
  const cacheMapTiles = async (centerCoordinates = null) => {
    if (!isOnline) {
      showNotification("You need to be online to cache map tiles", "error");
      return;
    }

    setIsCachingTiles(true);
    setCachingStats({ total: 0, cached: 0, failed: 0 });
    
    try {
      const db = await initDB();
      
      // Clean up old tiles first
      const deletedCount = await cleanupOldTiles(db);
      if (deletedCount > 0) {
        console.log(`Cleaned up ${deletedCount} old or outdated tiles`);
      }
      
      // Define the area to cache
      const center = centerCoordinates || position || ITBAYAT_COORDINATES;
      
      const bounds = {
        north: center[0] + CACHE_RADIUS.lat,
        south: center[0] - CACHE_RADIUS.lat,
        east: center[1] + CACHE_RADIUS.lng,
        west: center[1] - CACHE_RADIUS.lng
      };
      
      // Estimate the number of tiles
      const estimatedTileCount = estimateTileCount(bounds, MIN_ZOOM, MAX_ZOOM);
      setCachingStats(prev => ({ ...prev, total: estimatedTileCount }));
      
      // Calculate tile coordinates for each zoom level
      const tilesToCache = [];
      
      for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++) {
        // Convert lat/lng to tile coordinates
        const nwTile = latLngToTile(bounds.north, bounds.west, zoom);
        const seTile = latLngToTile(bounds.south, bounds.east, zoom);
        
        for (let x = nwTile.x; x <= seTile.x; x++) {
          for (let y = nwTile.y; y <= seTile.y; y++) {
            tilesToCache.push({ x, y, z: zoom });
          }
        }
      }
      
      // Cache tiles in smaller batches to avoid overwhelming the network
      const BATCH_SIZE = 5;
      let cachedCount = 0;
      let failedCount = 0;
      
      // Function to process a batch of tiles
      const processBatch = async (tiles) => {
        const promises = tiles.map(async (tile) => {
          const tileId = `${tile.z}:${tile.x}:${tile.y}`;
          
          try {
            // Check if tile already exists
            const existingTile = await db.get('tiles', tileId);
            
            if (!existingTile || !existingTile.version || existingTile.version < CACHE_VERSION) {
              // Choose a random subdomain for load balancing
              const subdomain = ['a', 'b', 'c'][Math.floor(Math.random() * 3)];
              const tileUrl = `https://${subdomain}.tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`;
              
              const response = await fetch(tileUrl);
              
              if (response.ok) {
                const blob = await response.blob();
                
                await db.put('tiles', { 
                  id: tileId, 
                  blob, 
                  timestamp: Date.now(),
                  version: CACHE_VERSION
                });
                return { success: true };
              } else {
                return { success: false };
              }
            }
            
            return { success: true, wasCached: true };
          } catch (error) {
            console.error(`Failed to cache tile ${tileId}:`, error);
            return { success: false };
          }
        });
        
        const results = await Promise.all(promises);
        
        const successCount = results.filter(r => r.success).length;
        const newFailedCount = results.filter(r => !r.success).length;
        
        cachedCount += successCount;
        failedCount += newFailedCount;
        
        setCachingStats(prev => ({
          ...prev,
          cached: cachedCount,
          failed: failedCount
        }));
        
        setCachingProgress(Math.floor(((cachedCount + failedCount) / tilesToCache.length) * 100));
      };
      
      // Process tiles in batches
      for (let i = 0; i < tilesToCache.length; i += BATCH_SIZE) {
        const batch = tilesToCache.slice(i, i + BATCH_SIZE);
        await processBatch(batch);
        
        // Small delay to avoid overwhelming the network
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Update metadata to indicate cache is complete
      await db.put('metadata', { 
        id: 'itbayat-cache-status', 
        isComplete: true, 
        version: CACHE_VERSION,
        timestamp: Date.now(),
        center: centerCoordinates || position || ITBAYAT_COORDINATES
      });
      
      // Show success message
      showNotification(
        `Successfully cached ${cachedCount} map tiles for offline use${failedCount > 0 ? ` (${failedCount} failed)` : ''}`, 
        "success"
      );
    } catch (error) {
      console.error('Error caching map tiles:', error);
      showNotification("Failed to cache map tiles", "error");
    } finally {
      setIsCachingTiles(false);
    }
  };

  const handleCenterOnItbayat = () => {
    setPosition(ITBAYAT_COORDINATES);
  };

  return (
    <Box sx={{ position: 'relative', height: 400, width: '100%', mb: 3 }}>
      <MapContainer 
        center={position || ITBAYAT_COORDINATES} 
        zoom={DEFAULT_ZOOM} 
        style={{ height: '100%', width: '100%' }}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
      >
        <CachedTileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          isOnline={isOnline}
          subdomains={['a', 'b', 'c']}
        />
        <MapWithPin position={position} setPosition={setPosition} />
        <MapController position={position} />
      </MapContainer>
      
      {/* Status indicator for online/offline */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          zIndex: 1000,
          backgroundColor: isOnline ? 'success.light' : 'error.light',
          color: 'white',
          padding: '4px 8px',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        {isOnline ? 'Online' : <><WifiOffIcon fontSize="small" /> Offline</>}
      </Box>
      
      {/* Current location button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<MyLocationIcon />}
        onClick={handleGetCurrentLocation}
        disabled={isGettingLocation}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'primary.main',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          boxShadow: 2
        }}
      >
        {isGettingLocation ? 'Locating...' : 'Use My Location'}
      </Button>
      
      {/* Center on Itbayat button */}
      <Button
        variant="contained"
        color="info"
        startIcon={<PlaceIcon />}
        onClick={handleCenterOnItbayat}
        sx={{
          position: 'absolute',
          top: 56, // Position below the location button
          right: 10,
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'info.main',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          boxShadow: 2
        }}
      >
        Go to Itbayat
      </Button>
      
      {/* Cache tiles button */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={isCachingTiles ? <CircularProgress size={20} color="inherit" /> : <SaveAltIcon />}
        onClick={handleCacheItbayat}
        disabled={isCachingTiles || !isOnline}
        sx={{
          position: 'absolute',
          top: 102, // Position below the Itbayat button
          right: 10,
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'secondary.main',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          boxShadow: 2
        }}
      >
        {isCachingTiles 
          ? `Caching (${cachingProgress}%)`
          : isCached 
            ? 'Update Offline Map' 
            : 'Cache Itbayat Map'}
      </Button>
      
      {/* Cache info button - shows current cache size */}
      {isOnline && !isCachingTiles && (
        <Button
          variant="text"
          size="small"
          onClick={async () => {
            const currentCache = await getCurrentCacheSize();
            const storageInfo = await checkStorageAvailability();
            
            let message = `Current cache: ${currentCache.tileCount} tiles (${currentCache.sizeMB} MB)`;
            
            if (storageInfo) {
              message += `\nStorage usage: ${storageInfo.used} MB of ${storageInfo.total} MB total`;
              message += `\nAvailable: ${storageInfo.available} MB`;
            }
            
            alert(message);
          }}
          sx={{
            position: 'absolute',
            top: 148, // Position below the cache button
            right: 10,
            zIndex: 1000,
            color: 'text.secondary',
            fontSize: '0.75rem'
          }}
        >
          Cache Info
        </Button>
      )}
      
      {/* Caching details overlay */}
      {isCachingTiles && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 1000,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 1,
            borderRadius: 1,
            boxShadow: 2,
            maxWidth: '220px'
          }}
        >
          <Typography variant="body2">
            Caching {cachingStats.total} tiles
          </Typography>
          <Typography variant="body2" color="success.main">
            ✓ {cachingStats.cached} tiles cached
          </Typography>
          {cachingStats.failed > 0 && (
            <Typography variant="body2" color="error.main">
              ✗ {cachingStats.failed} failed
            </Typography>
          )}
        </Box>
      )}
      
      {/* Offline map notice */}
      {!isOnline && (
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            maxWidth: '90%'
          }}
        >
          <WifiOffIcon />
          <Typography variant="body2">
            {isCached 
              ? "You're offline. Using cached map tiles." 
              : "You're offline. Only cached areas will display correctly."}
          </Typography>
        </Box>
      )}
      
      {/* Cache prompt snackbar */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={10000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          action={
            snackbarSeverity === 'info' && (
              <Button color="inherit" size="small" onClick={handleCacheFromSnackbar}>
                Cache Now
              </Button>
            )
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}