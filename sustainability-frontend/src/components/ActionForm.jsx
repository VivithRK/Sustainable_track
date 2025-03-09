import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Collapse,
  Stack
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * @typedef {Object} Action
 * @property {string} action - The name/description of the sustainable action
 * @property {string} date - The date when the action was performed
 * @property {number} points - The impact points awarded for the action
 */

/**
 * ActionForm Component - Handles the creation and editing of sustainable actions
 * 
 * @param {Object} props
 * @param {(formData: Action) => void} props.onSubmit - Callback function when form is submitted
 * @param {Action} [props.initialData] - Initial data for editing an existing action
 */
const ActionForm = ({ onSubmit, initialData }) => {
  // State to control form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form data state with initial values
  const [formData, setFormData] = useState({
    action: initialData?.action || '',
    date: initialData?.date 
      ? new Date(initialData.date).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
    points: initialData?.points || ''
  });

  /**
   * Handles input field changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert points to number before submission
    const submissionData = {
      ...formData,
      points: Number(formData.points)
    };
    onSubmit(submissionData);
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        action: '',
        date: new Date().toISOString().split('T')[0],
        points: ''
      });
    }
    setIsFormOpen(false);
  };

  /**
   * Handles form cancellation
   * Resets form data and closes the form
   */
  const handleCancel = () => {
    setIsFormOpen(false);
    setFormData({
      action: initialData?.action || '',
      date: initialData?.date 
        ? new Date(initialData.date).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0],
      points: initialData?.points || ''
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Add Action Button */}
      {!isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
            sx={{
              backgroundColor: '#2e7d32',
              color: 'white',
              borderRadius: 50,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Add Action
          </Button>
        </motion.div>
      )}

      {/* Collapsible Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Action"
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Points"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    required
                  />
                  <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        borderColor: '#666',
                        color: '#666',
                        '&:hover': {
                          borderColor: '#333',
                          color: '#333',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SaveIcon />}
                      sx={{
                        backgroundColor: '#2e7d32',
                        borderRadius: 2,
                        px: 4,
                        '&:hover': {
                          backgroundColor: '#1b5e20',
                        },
                      }}
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ActionForm; 