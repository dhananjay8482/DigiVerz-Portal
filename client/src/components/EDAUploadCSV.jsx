import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SimpleGrid, Box, Image, Text,useColorMode, Input, Button } from '@chakra-ui/react'
import uploadDay from '../assets/uploadCSVD.png'
import uploadNight from '../assets/uploadCSVN.png'

import { AttachmentIcon} from '@chakra-ui/icons'

export default function EDAUploadCSV() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:5000/file';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      navigate('/EDA/result')
    });

  }

  return(
    <SimpleGrid columns={2} spacing={20} pt={20} >
        <Box height='80px'>
        <Text  as="b" fontSize="6xl" ml={'-10vh'} >
              Data Quality Report
            </Text>
            {colorMode === "light" ? (
              <Image
                ml={"-1rem"}
                mt={"2rem"}
                boxSize="500px"
                objectFit="cover"
                src={uploadDay}
              />
            ) : (
              <Image
                ml={"-1rem"}
                mt={"2rem"}
                boxSize="500px"
                objectFit="cover"
                src={uploadNight}
              />
            )}
        </Box>
        <Box height='80px' mr={10} mt='40' width='500px' border={1} >
          <form onSubmit={handleSubmit} >
            <Text mt={5} as="b" fontSize="3xl" ml={'-10vh'} mr={55} >
              Upload Your File Here...
            </Text>
            <Input mt={15} mr={15}  type="file" onChange={handleChange}  />
            <Button mt={5}  leftIcon={<AttachmentIcon />} colorScheme='teal' variant='solid' type="submit" >
              Upload
            </Button>
            
          </form>
        </Box>
      </SimpleGrid>

  )
}
