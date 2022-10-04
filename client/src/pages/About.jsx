import React, { Component } from 'react';
import {
  VStack,Heading, Box, 
  // Image,
   Flex, Badge, Text} from '@chakra-ui/react';


export default function About() {
  return (
    <>
      <VStack spacing={8}>
        <Box
          p="5"
          maxW="1000px"
          borderWidth="15px"
          marginTop={"20vh"}
          borderColor={"lightteal"}
        >
          <Heading mb={5}>About This Website</Heading>
          <Flex align="z" mt={2}>
            <Badge fontSize="xl" ml={4} colorScheme="red">
              Introduction
            </Badge>
          </Flex>
          <Text mt={2} ml={55} textAlign="justify">
            &emsp;&emsp;This is portal based project. Created For Kaar tech 
          </Text>
          <Text
            mt={2}
            ml={4}
            textAlign="left"
            fontSize="Med"
            fontWeight="bold"
            lineHeight="short"
            color="red.700"
          >
            Created by :
          </Text>
          <Text mt={2} ml={55} fontWeight="semibold" textAlign="justify">
            Dhananjay Sonar
            <br />
            
          </Text>
        </Box>
      </VStack>
    </>
  );
}

