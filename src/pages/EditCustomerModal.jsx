import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';

export const EditCustomerModal = ({ open, customer, onClose, onSave }) => {
  const [editedCustomer, setEditedCustomer] = React.useState(customer);

  const handleChange = (field, value) => {
    setEditedCustomer({ ...editedCustomer, [field]: value });
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...editedCustomer.addresses];
    updatedAddresses[index][field] = value;
    setEditedCustomer({ ...editedCustomer, addresses: updatedAddresses });
  };

  const handleSaveChanges = () => {
    onSave(editedCustomer);
  };

  React.useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <TextField
          label="PAN"
          value={editedCustomer.pan || ''}
          onChange={(e) => handleChange('pan', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Full Name"
          value={editedCustomer.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={editedCustomer.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mobile"
          value={editedCustomer.mobile || ''}
          onChange={(e) => handleChange('mobile', e.target.value)}
          fullWidth
          margin="normal"
        />
        {editedCustomer.addresses && editedCustomer.addresses.map((address, index) => (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">Address {index + 1}</Typography>
            <TextField
              label="Line 1"
              value={address.line1 || ''}
              onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Line 2"
              value={address.line2 || ''}
              onChange={(e) => handleAddressChange(index, 'line2', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postcode"
              value={address.postcode || ''}
              onChange={(e) => handleAddressChange(index, 'postcode', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              value={address.city || ''}
              onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              value={address.state || ''}
              onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};