
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TextField, Box } from '@mui/material';

function StockPage() {
  const [data, setData] = useState([]);
  const [minutes, setMinutes] = useState(30);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=${minutes}`);
        const history = res.data.stockHistory || [];
        setData(history);
        const avg = history.reduce((sum, d) => sum + d.price, 0) / history.length;
        setAverage(avg);
      } catch (e) {
        console.error("Error fetching stock data", e);
      }
    }
    fetchData();
  }, [minutes]);

  return (
    <Box p={2}>
      <TextField
        label="Minutes"
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        sx={{ mb: 2 }}
      />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="lastUpdatedAt" hide />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <ReferenceLine y={average} label="Average" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default StockPage;
