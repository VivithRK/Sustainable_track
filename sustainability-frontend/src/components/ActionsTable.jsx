import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionsTable = ({ actions, onEdit, onDelete }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Your Actions</Typography>
        <IconButton
          color="primary"
          onClick={() => window.location.href = '#add-action'}
          sx={{
            backgroundColor: '#2e7d32',
            color: 'white',
            borderRadius: 2,
            px: 2,
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
            '& .MuiSvgIcon-root': {
              mr: 1,
            },
          }}
        >
          <Typography variant="button" sx={{ color: 'white' }}>
            Add Action
          </Typography>
        </IconButton>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell>{action.id}</TableCell>
                <TableCell>{action.action}</TableCell>
                <TableCell>{new Date(action.date).toLocaleDateString()}</TableCell>
                <TableCell align="right" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {action.points}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(action)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(action.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActionsTable; 