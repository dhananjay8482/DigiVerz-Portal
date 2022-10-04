import React, { Component } from 'react';

import {
  VStack,Heading, Box, Button, 
  // Image,
   Flex, Badge, Text} from '@chakra-ui/react';

import { Link } from 'react-router-dom'   

export default function LandingPage() {
  return (
    <VStack>
        <Box
          p="5"
          maxW="1000px"
          borderWidth="1px"
          marginTop={"20vh"}
          borderColor={"lightteal"}
        >
            <h1>Landing page</h1>
            <Link to="/login" ><Button>Login</Button></Link>
            
        </Box>
    </VStack>
  )
}
