import React from 'react';
import Navbar from './components/Navbar';
import PatientForm from './components/PatientForm';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <PatientForm />
      </Container>
    </div>
  );
}

export default App;
