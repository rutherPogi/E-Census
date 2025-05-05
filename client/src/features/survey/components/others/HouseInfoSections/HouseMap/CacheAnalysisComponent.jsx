// CacheAnalysisComponent.jsx
import { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, CircularProgress, 
  Paper, Divider, List, ListItem, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, AlertTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import {
  getCacheStats,
  checkStorageAvailability,
  cleanupOldTiles,
  clearAllCachedData,
  getRegionCacheStatus
} from './MapCacheManager';

/**
 * Component to display and manage map cache statistics and information
 */
export default function CacheAnalysisComponent() {
  const [cacheStats, setCacheStats] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cleanupStatus, setCleanupStatus] = useState({ success: false, message: '' });
  const [showCleanupStatus, setShowCleanupStatus] = useState(false);
  const [itbayatStatus, setItbayatStatus] = useState(null);

  // Load cache statistics on component mount
  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      
      try {
        const stats = await getCacheStats();
        const storage = await checkStorageAvailability();
        const itbayatCacheStatus = await getRegionCacheStatus('itbayat-cache-status');
        
        setCacheStats(stats);
        setStorageInfo(storage);
        setItbayatStatus(itbayatCacheStatus);
      } catch (error) {
        console.error('Error loading cache stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, []);

  // Handle cleanup of old tiles
  const handleCleanupOldTiles = async () => {
    setIsLoading(true);
    
    try {
      const deletedCount = await cleanupOldTiles(30); // Delete tiles older than 30 days
      
      if (deletedCount > 0) {
        setCleanupStatus({
          success: true,
          message: `Successfully removed ${deletedCount} old or outdated tiles`
        });
      } else {
        setCleanupStatus({
          success: true,
          message: 'No old tiles to clean up'
        });
      }
      
      // Reload stats
      const stats = await getCacheStats();
      const storage = await checkStorageAvailability();
      setCacheStats(stats);
      setStorageInfo(storage);
    } catch (error) {
      setCleanupStatus({
        success: false,
        message: 'Error cleaning up old tiles'
      });
    } finally {
      setIsLoading(false);
      setShowCleanupStatus(true);
    }
  };

  // Handle clearing all cached data
  const handleClearAllData = async () => {
    setDialogOpen(false);
    setIsLoading(true);
    
    try {
      const success = await clearAllCachedData();
      
      if (success) {
        setCleanupStatus({
          success: true,
          message: 'Successfully cleared all cached map data'
        });
        
        // Reset stats
        setCacheStats({ tileCount: 0, sizeMB: '0', tilesByZoom: {} });
        setItbayatStatus(null);
      } else {
        setCleanupStatus({
          success: false,
          message: 'Failed to clear cached data'
        });
      }
    } catch (error) {
      setCleanupStatus({
        success: false,
        message: 'Error clearing cached data'
      });
    } finally {
      setIsLoading(false);
      setShowCleanupStatus(true);
    }
  };

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom display="flex" alignItems="center">
        <StorageIcon sx={{ mr: 1 }} /> Map Cache Analysis
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Cache Overview */}
          <Typography variant="h6" gutterBottom>
            Cache Overview
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography>
              <strong>Total Tiles Cached:</strong> {cacheStats?.tileCount || 0} tiles
            </Typography>
            <Typography>
              <strong>Total Size:</strong> {cacheStats?.sizeMB || 0} MB
            </Typography>
            
            {/* Itbayat Status */}
            {itbayatStatus && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle1">
                  <strong>Itbayat Region Status:</strong>
                </Typography>
                <Typography>
                  <strong>Status:</strong> {itbayatStatus.isComplete ? 'Fully Cached' : 'Partially Cached'}
                </Typography>
                <Typography>
                  <strong>Cache Version:</strong> {itbayatStatus.version || 'Unknown'}
                </Typography>
                <Typography>
                  <strong>Last Updated:</strong> {formatDate(itbayatStatus.timestamp)}
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Device Storage */}
          {storageInfo && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Device Storage
              </Typography>
              <Typography>
                <strong>Storage Used:</strong> {storageInfo.used} MB of {storageInfo.total} MB total
              </Typography>
              <Typography>
                <strong>Available Storage:</strong> {storageInfo.available} MB
              </Typography>
              
              {/* Storage usage progress bar */}
              <Box sx={{ mt: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <Box
                      sx={{
                        height: 10,
                        borderRadius: 1,
                        background: `linear-gradient(to right, #4caf50 0%, #8bc34a 50%, #ff9800 75%, #f44336 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          width: `${(storageInfo.used / storageInfo.total) * 100}%`,
                          bgcolor: 'rgba(0, 0, 0, 0.2)',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round((storageInfo.used / storageInfo.total) * 100)}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Map cache uses approximately {Math.round((cacheStats?.sizeMB / storageInfo.total) * 100)}% of total storage
                </Typography>
              </Box>
            </Box>
          )}
          
          {/* Tiles by Zoom Level */}
          {cacheStats?.tilesByZoom && Object.keys(cacheStats.tilesByZoom).length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                <AnalyticsIcon sx={{ mr: 1 }} /> Tiles by Zoom Level
              </Typography>
              
              <List dense>
                {Object.entries(cacheStats.tilesByZoom)
                  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                  .map(([zoomLevel, count]) => (
                    <ListItem key={zoomLevel}>
                      <ListItemText 
                        primary={`Zoom Level ${zoomLevel}`} 
                        secondary={`${count} tiles (approx. ${((count * 15) / 1024).toFixed(1)} MB)`} 
                      />
                    </ListItem>
                  ))
                }
              </List>
            </Box>
          )}
          
          {/* Cache Management Buttons */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={handleCleanupOldTiles}
              disabled={isLoading || (cacheStats?.tileCount || 0) === 0}
            >
              Clean Old Tiles
            </Button>
            
            <Button 
              variant="outlined" 
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDialogOpen(true)}
              disabled={isLoading || (cacheStats?.tileCount || 0) === 0}
            >
              Clear All Cache
            </Button>
          </Box>
          
          {/* Status Alert */}
          {showCleanupStatus && (
            <Alert 
              severity={cleanupStatus.success ? "success" : "error"}
              sx={{ mt: 2 }}
              onClose={() => setShowCleanupStatus(false)}
            >
              <AlertTitle>{cleanupStatus.success ? "Success" : "Error"}</AlertTitle>
              {cleanupStatus.message}
            </Alert>
          )}
        </>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Confirm Cache Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete all cached map tiles? This will require re-downloading
            map data when you go online again.
          </Typography>
          {itbayatStatus?.isComplete && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This will remove the cached Itbayat region maps. Users will not be able to view
              maps offline until they cache the area again.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleClearAllData} color="error">
            Delete All Cache
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}