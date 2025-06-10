import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

function TicketForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tickets', { title, description });
      setSuccess(true);
      setTitle('');
      setDescription('');
      if (onSubmit) onSubmit();
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Submit a New Ticket</Typography>
      {success && <Alert severity="success">Ticket submitted!</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Submit Ticket</Button>
      </form>
    </Box>
  );
}

export default TicketForm; 