import React, { useState } from 'react';
import {
  Card, CardContent, CardActions, Typography, Grid, Button, Box
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { EditCustomerModal } from './EditCustomerModal';

const CustomerList = () => {
  const [customers, setCustomers] = useState(JSON.parse(localStorage.getItem('customers')) || []);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
  };

  const handleEdit = (customer, index) => {
    setSelectedCustomer({ ...customer, index });
    setOpen(true);
  };

  const handleSave = (updatedCustomer) => {
    const updatedCustomers = [...customers];
    updatedCustomers[selectedCustomer.index] = updatedCustomer;
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
        Customer List
      </Typography>
      <Grid container spacing={3}>
        {customers.map((customer, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{
              backgroundColor: '#e3f2fd',
              borderRadius: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.03)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1e88e5', fontWeight: 'bold' }}>
                  PAN: {customer.pan}
                </Typography>
                <Typography variant="body1" sx={{ color: '#5e35b1' }}>Name: {customer.fullName}</Typography>
                <Typography variant="body1" sx={{ color: '#5e35b1' }}>Email: {customer.email}</Typography>
                <Typography variant="body1" sx={{ color: '#5e35b1' }}>Mobile: {customer.mobile}</Typography>
                {customer.addresses.map((address, addrIndex) => (
                  <Box key={addrIndex} sx={{ marginTop: 2 }}>
                    <Typography variant="body2" sx={{ color: '#43a047', fontWeight: 'bold' }}>
                      Address {addrIndex + 1}:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20' }}>Line 1: {address.line1}</Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20' }}>Line 2: {address.line2}</Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20' }}>Postcode: {address.postcode}</Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20' }}>City: {address.city}</Typography>
                    <Typography variant="body2" sx={{ color: '#1b5e20' }}>State: {address.state}</Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(customer, index)}
                  sx={{
                    backgroundColor: '#1e88e5',
                    '&:hover': { backgroundColor: '#1565c0' }
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(index)}
                  sx={{
                    backgroundColor: '#e53935',
                    '&:hover': { backgroundColor: '#b71c1c' }
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedCustomer && (
        <EditCustomerModal
          open={open}
          customer={selectedCustomer}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default CustomerList;
