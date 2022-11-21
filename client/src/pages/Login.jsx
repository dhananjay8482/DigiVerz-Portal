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
import loginDay from "../assets/login1D.png";
import loginNight from "../assets/login1N.png";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  var formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const loginUser = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://127.0.0.1:5000/user/login",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(response);
        // if (response.data && response.data.access_token) {
        //   const token = response.data.access_token;
        //   const accountType = response.data.account_type ? response.data.account_type : '';
        //   console.log('token', token);
        //   window.sessionStorage.setItem('access_token', token);
        //   window.sessionStorage.setItem('account_type', accountType);

        //   if (accountType === 'admin') {
        //     console.log('Admin Login');
        //     history.replace('/admin');
        //   } else if (accountType === 'charity') {
        //     console.log('Charity Login');
        //     history.replace('/charity');
        //   } else {
        //     console.log('Regular Login');
        //     history.replace('/');
        //   }
        //   window.location.reload();
        // } else {
        //   const err = response.data.message;
        //   throw Error('Error: ' + err);
        // }
        if (response.data.name) {
          console.log("Regular Login");
          // history.replace('/');
          navigate("/modelBuilder");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  };

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
        <SimpleGrid columns={[2, null, 2]} spacing="30vh">
          <Box mt={'20px'} >
            <Text  as="b" fontSize="6xl" ml={'-10vh'} >
              Login Page
            </Text>
            {colorMode === "light" ? (
              <Image
                ml={"-1rem"}
                mt={"2rem"}
                boxSize="400px"
                objectFit="cover"
                src={loginDay}
                alt="Login"
              />
            ) : (
              <Image
                ml={"-1rem"}
                mt={"2rem"}
                boxSize="400px"
                objectFit="cover"
                src={loginNight}
                alt="Login"
              />
            )}
          </Box>

          {/* --------------------------- Half Page ------------------------------------------ */}
          
          
          <Box mt={'7vh'} ml='5vh' >
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Login To Your Account</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={loginUser}>
                <Stack
                  spacing={4}
                  p="1rem"
                  //   backgroundColor="current"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.500" />}
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.500" />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    borderRadius={20}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
            <Box mt={'2vh'} >
              New to us?{" "}
              <Link color="teal.500" href={"/register"}>
                Sign Up
              </Link>
            </Box>
          </Box>
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default Login;
