import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, Snackbar, AppBar, Toolbar, Button, CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ActionForm from './components/ActionForm';
import ActionsTable from './components/ActionsTable';
import TotalImpact from './components/TotalImpact';
import HomePage from './components/HomePage';
import AnimatedPage from './components/AnimatedPage';
import api from './services/api';

const Dashboard = ({ 
  actions, 
  editingAction, 
  notification, 
  handleSubmit, 
  handleEdit, 
  handleDelete, 
  handleCloseNotification,
  isLoading,
  error 
}) => {
  const totalPoints = actions.reduce((sum, action) => sum + action.points, 0);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <AnimatedPage>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TotalImpact points={totalPoints} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box id="add-action" sx={{ mb: 4, mt: 4 }}>
            <ActionForm 
              onSubmit={handleSubmit}
              initialData={editingAction}
            />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ActionsTable 
            actions={actions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </motion.div>

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </AnimatedPage>
  );
};

const Navigation = () => {
  const location = useLocation();
  
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{
                color: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              🌱 Green Steps
            </Typography>
          </Link>
          <Box>
            <Button
              component={Link}
              to="/"
              sx={{
                color: location.pathname === '/' ? '#2e7d32' : '#666',
                mr: 2,
                '&:hover': { color: '#2e7d32' }
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                color: location.pathname === '/dashboard' ? '#2e7d32' : '#666',
                '&:hover': { color: '#2e7d32' }
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

function App() {
  const [actions, setActions] = useState([]);
  const [editingAction, setEditingAction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchActions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getActions();
      setActions(data);
    } catch (error) {
      console.error('Error fetching actions:', error);
      setError(error.message || 'Error fetching actions. Please check if the backend server is running.');
      showNotification('Error fetching actions', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingAction) {
        await api.updateAction(editingAction.id, formData);
        showNotification('Action updated successfully');
        setEditingAction(null);
      } else {
        await api.createAction(formData);
        showNotification('Action created successfully');
      }
      fetchActions();
    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Error saving action';
      showNotification(errorMessage, 'error');
    }
  };

  const handleEdit = (action) => {
    setEditingAction(action);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAction(id);
      showNotification('Action deleted successfully');
      fetchActions();
    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Error deleting action';
      showNotification(errorMessage, 'error');
    }
  };

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                actions={actions}
                editingAction={editingAction}
                notification={notification}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleCloseNotification={handleCloseNotification}
                isLoading={isLoading}
                error={error}
              />
            } 
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App; 