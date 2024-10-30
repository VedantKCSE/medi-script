import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import headerImageUrl from '../assets/pre-header.png';

const PatientForm = () => {
  // State for patient details
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    weight: ''
  });

  // State for medicines list
  const [medicines, setMedicines] = useState([
    { name: '', timing: '', food: '' }
  ]);

  // State for special instructions
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Handler for patient details
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for medicines details
  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const newMedicines = [...medicines];
    newMedicines[index][name] = value;
    setMedicines(newMedicines);
  };

  // Handler for special instructions
  const handleSpecialInstructionsChange = (e) => {
    setSpecialInstructions(e.target.value);
  };

  // Add new medicine field
  const addMedicine = () => {
    setMedicines([...medicines, { name: '', timing: '', food: '' }]);
  };

  // Remove a medicine field
  const removeMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add custom header image
    doc.addImage(headerImageUrl, 'PNG', 10, 10, 190, 70); // Adjust dimensions as needed

    // Add a horizontal line below the header
    doc.setDrawColor(128, 0, 0); // Maroon color
    doc.line(10, 80, 200, 80); // Draw line from (10,80) to (200,80)

    // Patient details
    doc.setFontSize(16);
    doc.setTextColor(128, 0, 0);
    doc.setFont("Helvetica", "bold"); // Set font to bold
    doc.text('Patient Details', 10, 90); // Position the section title below the header

    doc.setFont("Helvetica", "normal");
    // Patient details
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${patient.name}  |  Age: ${patient.age}  |  Weight: ${patient.weight}`, 10, 100);

    // Medicines list
    doc.setFontSize(16);
    doc.setTextColor(128, 0, 0);
    doc.setFont("Helvetica", "bold"); // Set font to bold
    doc.text('Medicines', 10, 120); // Position section title below patient details

    doc.setFont("Helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    // Medicines details
    doc.setFontSize(14);
    medicines.forEach((medicine, index) => {
      const yPosition = 130 + index * 8; // Space out medicines
      doc.text(`${medicine.name}    -    ${medicine.timing}    -    ${medicine.food}`, 10, yPosition);
    });

    // Special Instructions
    doc.setFontSize(16);
    doc.setTextColor(128, 0, 0);
    doc.setFont("Helvetica", "bold"); // Set font to bold
    doc.text('Instructions', 10, 130 + medicines.length * 8); // Position section title below medicines

    doc.setFont("Helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(specialInstructions, 10, 140 + medicines.length * 8); // Add the special instructions

    // Save the PDF
    doc.save(`${patient.name}_prescription.pdf`);
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      <Typography variant="h4" color="primary">Patient Form</Typography>

      {/* Patient Details */}
      <TextField
        label="Patient Name"
        name="name"
        value={patient.name}
        onChange={handlePatientChange}
        required
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={patient.age}
        onChange={handlePatientChange}
        required
      />
      <TextField
        label="Weight"
        name="weight"
        type="number"
        value={patient.weight}
        onChange={handlePatientChange}
        required
      />

      {/* Medicines Details */}
      <Typography variant="h5" color="primary" sx={{ marginBottom: 2 }}>Medicines</Typography>
      {medicines.map((medicine, index) => (
        <Box
          key={index}
          sx={{
            display: { xs: 'block', sm: 'flex' }, // Stack on small screens, flex on larger screens
            alignItems: 'center',
            width: '100%',
            marginBottom: 2
          }}
        >
          <TextField
            label="Medicine Name"
            name="name"
            value={medicine.name}
            onChange={(e) => handleMedicineChange(index, e)}
            required
            sx={{ flex: 1, marginRight: { xs: 0, sm: 1 }, marginBottom: { xs: 1, sm: 0 } }} // Margin adjustments for mobile
          />

          {/* Timing Dropdown */}
          <FormControl
            required
            sx={{
              flex: { xs: '100%', sm: 1 }, // Full width on small screens, flex on larger
              marginRight: { xs: 0, sm: 1 },
              marginBottom: { xs: 1, sm: 0 },
              width: "40%"
            }}
          >
            <InputLabel>Timing</InputLabel>
            <Select
              name="timing"
              value={medicine.timing}
              onChange={(e) => handleMedicineChange(index, e)}
              fullWidth // Ensures the dropdown takes full width
            >
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Noon">Noon</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </Select>
          </FormControl>

          {/* Food Instruction Dropdown */}
          <FormControl
            required
            sx={{
              flex: { xs: '100%', sm: 1 }, // Full width on small screens, flex on larger
              marginRight: { xs: 0, sm: 1 },
              marginBottom: { xs: 1, sm: 0 },
              width: "45%"
            }}
          >
            <InputLabel>Food Instruction</InputLabel>
            <Select
              name="food"
              value={medicine.food}
              onChange={(e) => handleMedicineChange(index, e)}
              fullWidth // Ensures the dropdown takes full width
            >
              <MenuItem value="Before Eating">Before Eating</MenuItem>
              <MenuItem value="After Eating">After Eating</MenuItem>
            </Select>
          </FormControl>

          <IconButton color="secondary" onClick={() => removeMedicine(index)}>
            <Remove />
          </IconButton>
        </Box>
      ))}

      <Button variant="outlined" color="primary" startIcon={<Add />} onClick={addMedicine}>
        Add Medicine
      </Button>

      {/* Special Instructions */}
      <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>Instructions</Typography>
      <TextField
        label="Enter Special Instructions"
        multiline
        rows={4}
        value={specialInstructions}
        onChange={handleSpecialInstructionsChange}
      />

      {/* Actions */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          generatePDF();
        }}
      >
        Save & Create PDF
      </Button>
    </Box>
  );
};

export default PatientForm;
