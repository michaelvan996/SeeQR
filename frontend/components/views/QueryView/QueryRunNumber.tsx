import React from 'react';
import { TextField } from '@mui/material/';
import Box from '@mui/material/Box';
// import styled from 'styled-components'

interface QueryRunProps {
  runNumber?: number;
  onChange: (runNumber: number) => void;
}

const QueryRunNumber = ({ runNumber, onChange }: QueryRunProps) => (
  <Box>
    <TextField
      label="Number of Queries"
      value={runNumber}
      onChange={(evt) => onChange(Number(evt.target.value))}
    />
  </Box>
);
 
export default QueryRunNumber;
