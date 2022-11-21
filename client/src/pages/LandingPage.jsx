import React, { Component, useState, useEffect, useRef } from "react";

import {
  Avatar,
  Text,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import landing1D from "../assets/landing1D.png";
import landing1N from "../assets/landing1N.png";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LandingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="flex-start"
      >
        <SimpleGrid columns={[1, null, 2]} spacing="50vh">
          <Box mt={"7vh"} ml="2vh">
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Get More Analytics From</Heading>
            <Heading color="teal.400">Your Own Data</Heading>

            <Link to="/login" >
              <Button mt={"7vh"} ml={"-45vh"}  >Get Started</Button>
            </Link>
          </Box>

  {/* --------------------------- Half Page ------------------------------------------ */}
          <Box mt={"20px"}>
            
            {colorMode === "light" ? (
              <Image
                ml={"-1rem"}
                mt={"2rem"}
                boxSize="400px"
                objectFit="cover"
                src={landing1D}
                alt="Login"
              />
            ) : (
              <Image
                ml={"-1rem"}
                mt={"2rem"}
                boxSize="400px"
                objectFit="cover"
                src={landing1N}
                alt="Login"
              />
            )}
          </Box>

        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default LandingPage;
