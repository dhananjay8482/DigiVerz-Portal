import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'  
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        position={"fixed"}
        width={"100vw"}
        height={"auto"}
        bg={useColorModeValue("gray.200", "gray.900")}
        px={"6vw"}
        zIndex={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading fontSize={"2xl"}>DigiVerz Portals</Heading>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              
              <Link to="/" ><Button>Home</Button></Link>
              <Link to="/about" ><Button>About</Button></Link>
              
            </Stack>
          </Flex>
        </Flex>
      </Box>
      
    </>
  );
}

export default Navbar;
