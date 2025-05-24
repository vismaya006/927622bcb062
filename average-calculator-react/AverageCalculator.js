
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function AverageCalculator() {
  const [input, setInput] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const calculateAverage = () => {
    try {
      const numbers = input
        .split(',')
        .map(num => parseFloat(num.trim()))
        .filter(num => !isNaN(num));

      if (numbers.length === 0) {
        setError('Please enter a list of valid numbers.');
        setAverage(null);
        return;
      }

      const sum = numbers.reduce((acc, num) => acc + num, 0);
      const avg = sum / numbers.length;

      setAverage(avg);
      setError('');
    } catch (e) {
      setError('Something went wrong.');
      setAverage(null);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Average Calculator</Typography>
      <TextField
        label="Enter numbers (comma-separated)"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={calculateAverage}>Calculate Average</Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {average !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Average: {average.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}

export default AverageCalculator;
