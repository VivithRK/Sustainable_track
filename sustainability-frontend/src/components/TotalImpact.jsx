import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';

const TotalImpact = ({ points }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Total Impact Points
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min((points / 200) * 100, 100)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#2e7d32',
                borderRadius: 5,
              },
            }}
          />
        </Box>
        <Typography variant="h4" sx={{ color: '#2e7d32', minWidth: 80, textAlign: 'right' }}>
          {points}
        </Typography>
      </Box>
      <Typography color="text.secondary">
        Keep adding sustainable actions to increase your impact!
      </Typography>
    </Paper>
  );
};

export default TotalImpact; 