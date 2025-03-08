import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AnimatedPage from './AnimatedPage';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(to bottom right, #ffffff, #f8faf8)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            transform: 'translateY(-50%)',
            fontSize: '400px',
          }}
        >
          🌱
        </motion.div>

        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#1a1a1a'
                }}
              >
                Track Your Positive Impact
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  mb: 4,
                  color: '#2e7d32'
                }}
              >
                On The Planet
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  color: '#666',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Record and measure your sustainability efforts with Green Steps. Every small action contributes to a better future.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  backgroundColor: '#2e7d32',
                  fontSize: '1.2rem',
                  py: 1.5,
                  px: 4,
                  borderRadius: 50,
                  '&:hover': {
                    backgroundColor: '#1b5e20',
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  bottom: -100,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#666',
                  fontStyle: 'italic'
                }}
              >
                Designed with sustainability in mind.
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </AnimatedPage>
  );
};

export default HomePage; 