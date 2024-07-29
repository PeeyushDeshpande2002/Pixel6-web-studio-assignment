import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box, Typography, Card, CardContent, CardActions, Grid, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CustomerForm = ({ onSave }) => {
  const [pan, setPan] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [addresses, setAddresses] = useState([{ line1: '', line2: '', postcode: '', city: '', state: '' }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validatePan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const validatePostcode = (postcode) => /^[0-9]{6}$/.test(postcode);

  const handlePanChange = async (e) => {
    const panValue = e.target.value.toUpperCase();
    setPan(panValue);

    if (validatePan(panValue)) {
      setLoading(true);
      try {
        const response = await fetch('https://lab.pixel6.co/api/verify-pan.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ panNumber: panValue }),
        });
        const data = await response.json();
        if (data.isValid) {
          setFullName(data.fullName);
        }
      } catch (error) {
        console.error('Error verifying PAN:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);

    if (field === 'postcode' && validatePostcode(value)) {
      fetchPostcodeDetails(value, index);
    }
  };

  const fetchPostcodeDetails = async (postcode, index) => {
    setLoading(true);
    try {
      const response = await fetch('https://lab.pixel6.co/api/get-postcode-details.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode }),
      });
      const data = await response.json();
      const newAddresses = [...addresses];
      newAddresses[index].city = data.city[0].name;
      newAddresses[index].state = data.state[0].name;
      setAddresses(newAddresses);
    } catch (error) {
      console.error('Error fetching postcode details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!validatePan(pan)) {
      alert('Please enter a valid PAN.');
      return;
    }
    if (!fullName || fullName.length > 140) {
      alert('Please enter a valid Full Name with a maximum length of 140 characters.');
      return;
    }
    if (!validateEmail(email) || email.length > 255) {
      alert('Please enter a valid Email with a maximum length of 255 characters.');
      return;
    }
    if (!validateMobile(mobile)) {
      alert('Please enter a valid Mobile Number.');
      return;
    }
    if (addresses.some(address => !address.line1 || !validatePostcode(address.postcode))) {
      alert('Please fill all required address fields with valid data.');
      return;
    }
  
    // Ensure onSave is a function before calling it
    if (typeof onSave === 'function') {
      onSave({ pan, fullName, email, mobile, addresses });
    } else {
      console.error('onSave is not defined or is not a function');
    }
  };

  const addAddress = () => {
    if (addresses.length < 10) {
      setAddresses([...addresses, { line1: '', line2: '', postcode: '', city: '', state: '' }]);
    }
  };

  const removeAddress = (index) => {
    const newAddresses = addresses.filter((_, idx) => idx !== index);
    setAddresses(newAddresses);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 3, borderRadius: 3, boxShadow: '0 5px 15px rgba(0,0,0,0.3)', backgroundColor: '#e3f2fd',}}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{  color: '#1e88e5', fontWeight: 'bold' }}>Customer Form</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="PAN"
              value={pan}
              onChange={handlePanChange}
              required
              fullWidth
              variant="outlined"
              
              sx={{ mb: 2 }}
            />
            {loading && <CircularProgress size={20} />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              fullWidth
              inputProps={{ maxLength: 140 }}
              variant="outlined"
              
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
              variant="outlined"
              
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              fullWidth
              inputProps={{ maxLength: 10 }}
              placeholder="+91"
              variant="outlined"
             
              sx={{ mb: 2 }}
            />
          </Grid>
          {addresses.map((address, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item container xs={12} justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ color: '#3f51b5' }}>Address {index + 1}</Typography>
                <Button
                  onClick={() => removeAddress(index)}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  sx={{ mb: 1 }}
                >
                  Delete Address
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 1"
                  value={address.line1}
                  onChange={(e) => handleAddressChange(index, 'line1', e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ style: { color: '#3f51b5' } }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2"
                  value={address.line2}
                  onChange={(e) => handleAddressChange(index, 'line2', e.target.value)}
                  fullWidth
                  variant="outlined"
                  
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Postcode"
                  value={address.postcode}
                  onChange={(e) => handleAddressChange(index, 'postcode', e.target.value)}
                  required
                  fullWidth
                  inputProps={{ maxLength: 6 }}
                  variant="outlined"
                 
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  value={address.state}
                  onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                 
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          ))}
          {addresses.length < 10 && (
            <Grid item xs={12}>
              <Button onClick={addAddress} variant="contained" color="primary" startIcon={<AddIcon />}>
                Add Address
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button onClick={handleSave} variant="contained" color="primary" endIcon={<SaveIcon />}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomerForm;
