import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import { Container } from "@mui/material";
import { CustomerFormWrapper } from "./pages/CustomerFormWrapper";

function App() {
  return (
    <BrowserRouter>
     <Container style={{ marginTop: '40px', marginBottom : '20px'}}>
      <Routes>
        <Route path = '/' element = {<CustomerFormWrapper/>} />
        <Route path = '/customerlist' element = {<CustomerList/>} />
      </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
