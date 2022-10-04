import { useState } from 'react'
import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route ,Routes, Link} from 'react-router-dom';
import './App.css'
import { VStack } from "@chakra-ui/layout";
import Navbar from './pages/Navbar';
import About from './pages/About';
import LandingPage from './pages/LandingPage';
import Routess from './pages/Routes';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {/* <About /> */}
        <Router>
          <Navbar />
          <Routess />
        </Router>
      </Box>
    </ChakraProvider>
  )
}

export default App
