import { useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";

export const CustomerFormWrapper = () => {
    const navigate = useNavigate();
  
    const handleSave = (customerData) => {
      // Save customer data to local storage
      const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];
      existingCustomers.push(customerData);
      localStorage.setItem('customers', JSON.stringify(existingCustomers));
      // Redirect to the customer list page
      navigate('/customerlist');
    };
  
    return <CustomerForm onSave={handleSave} />;
  };
