import React, { useState } from 'react';
import {  Select, Box, Text } from '@chakra-ui/react';

function Dropdown({selectedMatchType,setSelectedMatchType}) {
   
  
    const handleChange = (event) => {
      setSelectedMatchType(event.target.value);
    };
  
    return (
        <Box p={4} maxW="300px" margin={1.5} borderWidth={3} borderRadius="md" boxShadow="md" borderColor="blue.200">
          <Select
            placeholder="Select Match Type"
            value={selectedMatchType}
            onChange={handleChange}
            bg="white"
            borderColor="blue.200"
            borderRadius="md"

          >
            <option value="international">International</option>
            <option value="League">League</option>
            
            <option value="domestic">Domestic</option>
            <option value="women">Women</option>
          </Select>
  
          {/* Display selected match type */}
          {selectedMatchType && (
            <Text mt={4}>
              Selected Match Type: <strong>{selectedMatchType}</strong>
            </Text>
          )}
        </Box>
    );
  }
  
  export default Dropdown;