import React from 'react';
import './App.css';
import {} from 'leaflet';
import { Box, Heading } from '@chakra-ui/layout';
import { Map } from './components/Map';

function App() {
  return (
    <Box>
      <Box h="5vh" bg="green.300" px="2">
        <Heading color="white">The Federal Government</Heading>
      </Box>
      <Map />
      <Box h="5vh" bg="blue.300" px="2">
        SLIDER
      </Box>
    </Box>
  );
}

export default App;
