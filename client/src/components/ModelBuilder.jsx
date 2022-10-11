import React, { Component, useState, useEffect, useRef } from "react";

import {
  Avatar,
  Box,
  Button,
  chakra,Image ,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  SimpleGrid,
  Select, Text,Fade, ScaleFade, Collapse,useDisclosure 
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaUserAlt,
  FaMapMarkedAlt,
  FaHotel,
  FaShower,
  FaHSquare,
} from "react-icons/fa";
import houseImage from "../assets/house.png"
import axios from "axios";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaMapMarkedAlt = chakra(FaMapMarkedAlt);
const CFaHotel = chakra(FaHotel);
const CFaShower = chakra(FaShower);
const CFaTarp = chakra(FaHSquare);

const ModelBuilder = () => {
  const locations = [
    "1st Block Jayanagar",
    "1st Phase JP Nagar",
    "2nd Phase Judicial Layout",
    "2nd Stage Nagarbhavi",
    "5th Block Hbr Layout",
    "5th Phase JP Nagar",
    "6th Phase JP Nagar",
    "7th Phase JP Nagar",
    "8th Phase JP Nagar",
    "9th Phase JP Nagar",
    "AECS Layout",
    "Abbigere",
    "Akshaya Nagar",
    "Ambalipura",
    "Ambedkar Nagar",
    "Amruthahalli",
    "Anandapura",
    "Ananth Nagar",
    "Anekal",
    "Anjanapura",
    "Ardendale",
    "Arekere",
    "Attibele",
    "BEML Layout",
    "BTM 2nd Stage",
    "BTM Layout",
    "Babusapalaya",
    "Badavala Nagar",
    "Balagere",
    "Banashankari",
    "Banashankari Stage II",
    "Banashankari Stage III",
    "Banashankari Stage V",
    "Banashankari Stage VI",
    "Banaswadi",
    "Banjara Layout",
    "Bannerghatta",
    "Bannerghatta Road",
    "Basavangudi",
    "Basaveshwara Nagar",
    "Battarahalli",
    "Begur",
    "Begur Road",
    "Bellandur",
    "Benson Town",
    "Bharathi Nagar",
    "Bhoganhalli",
    "Billekahalli",
    "Binny Pete",
    "Bisuvanahalli",
    "Bommanahalli",
    "Bommasandra",
    "Bommasandra Industrial Area",
    "Bommenahalli",
    "Brookefield",
    "Budigere",
    "CV Raman Nagar",
    "Chamrajpet",
    "Chandapura",
    "Channasandra",
    "Chikka Tirupathi",
    "Chikkabanavar",
    "Chikkalasandra",
    "Choodasandra",
    "Cooke Town",
    "Cox Town",
    "Cunningham Road",
    "Dasanapura",
    "Dasarahalli",
    "Devanahalli",
    "Devarachikkanahalli",
    "Dodda Nekkundi",
    "Doddaballapur",
    "Doddakallasandra",
    "Doddathoguru",
    "Domlur",
    "Dommasandra",
    "EPIP Zone",
    "Electronic City",
    "Electronic City Phase II",
    "Electronics City Phase 1",
    "Frazer Town",
    "GM Palaya",
    "Garudachar Palya",
    "Giri Nagar",
    "Gollarapalya Hosahalli",
    "Gottigere",
    "Green Glen Layout",
    "Gubbalala",
    "Gunjur",
    "HAL 2nd Stage",
    "HBR Layout",
    "HRBR Layout",
    "HSR Layout",
    "Haralur Road",
    "Harlur",
    "Hebbal",
    "Hebbal Kempapura",
    "Hegde Nagar",
    "Hennur",
    "Hennur Road",
    "Hoodi",
    "Horamavu Agara",
    "Horamavu Banaswadi",
    "Hormavu",
    "Hosa Road",
    "Hosakerehalli",
    "Hoskote",
    "Hosur Road",
    "Hulimavu",
    "ISRO Layout",
    "ITPL",
    "Iblur Village",
    "Indira Nagar",
    "JP Nagar",
    "Jakkur",
    "Jalahalli",
    "Jalahalli East",
    "Jigani",
    "Judicial Layout",
    "KR Puram",
    "Kadubeesanahalli",
    "Kadugodi",
    "Kaggadasapura",
    "Kaggalipura",
    "Kaikondrahalli",
    "Kalena Agrahara",
    "Kalyan nagar",
    "Kambipura",
    "Kammanahalli",
    "Kammasandra",
    "Kanakapura",
    "Kanakpura Road",
    "Kannamangala",
    "Karuna Nagar",
    "Kasavanhalli",
    "Kasturi Nagar",
    "Kathriguppe",
    "Kaval Byrasandra",
    "Kenchenahalli",
    "Kengeri",
    "Kengeri Satellite Town",
    "Kereguddadahalli",
    "Kodichikkanahalli",
    "Kodigehaali",
    "Kodigehalli",
    "Kodihalli",
    "Kogilu",
    "Konanakunte",
    "Koramangala",
    "Kothannur",
    "Kothanur",
    "Kudlu",
    "Kudlu Gate",
    "Kumaraswami Layout",
    "Kundalahalli",
    "LB Shastri Nagar",
    "Laggere",
    "Lakshminarayana Pura",
    "Lingadheeranahalli",
    "Magadi Road",
    "Mahadevpura",
    "Mahalakshmi Layout",
    "Mallasandra",
    "Malleshpalya",
    "Malleshwaram",
    "Marathahalli",
    "Margondanahalli",
    "Marsur",
    "Mico Layout",
    "Munnekollal",
    "Murugeshpalya",
    "Mysore Road",
    "NGR Layout",
    "NRI Layout",
    "Nagarbhavi",
    "Nagasandra",
    "Nagavara",
    "Nagavarapalya",
    "Narayanapura",
    "Neeladri Nagar",
    "Nehru Nagar",
    "OMBR Layout",
    "Old Airport Road",
    "Old Madras Road",
    "Padmanabhanagar",
    "Pai Layout",
    "Panathur",
    "Parappana Agrahara",
    "Pattandur Agrahara",
    "Poorna Pragna Layout",
    "Prithvi Layout",
    "R.T. Nagar",
    "Rachenahalli",
    "Raja Rajeshwari Nagar",
    "Rajaji Nagar",
    "Rajiv Nagar",
    "Ramagondanahalli",
    "Ramamurthy Nagar",
    "Rayasandra",
    "Sahakara Nagar",
    "Sanjay nagar",
    "Sarakki Nagar",
    "Sarjapur",
    "Sarjapur  Road",
    "Sarjapura - Attibele Road",
    "Sector 2 HSR Layout",
    "Sector 7 HSR Layout",
    "Seegehalli",
    "Shampura",
    "Shivaji Nagar",
    "Singasandra",
    "Somasundara Palya",
    "Sompura",
    "Sonnenahalli",
    "Subramanyapura",
    "Sultan Palaya",
    "TC Palaya",
    "Talaghattapura",
    "Thanisandra",
    "Thigalarapalya",
    "Thubarahalli",
    "Thyagaraja Nagar",
    "Tindlu",
    "Tumkur Road",
    "Ulsoor",
    "Uttarahalli",
    "Varthur",
    "Varthur Road",
    "Vasanthapura",
    "Vidyaranyapura",
    "Vijayanagar",
    "Vishveshwarya Layout",
    "Vishwapriya Layout",
    "Vittasandra",
    "Whitefield",
    "Yelachenahalli",
    "Yelahanka",
    "Yelahanka New Town",
    "Yelenahalli",
    "Yeshwanthpur",
    "other",
  ];

  const [value, setValue] = useState("");

  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [bath, setBath] = useState("");
  const [sqft, setSqft] = useState("");

  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure()

  var formData = new FormData();
  formData.append("location", location);
  formData.append("bhk", bhk);
  formData.append("bath", bath);
  formData.append("total_sqft", sqft);

  const predictValue = (e) => {
    e.preventDefault();
    console.log("Location : " + location);
    console.log("BHK : " + bhk);
    console.log("Bath : " + bath);
    console.log("Sqft : " + sqft);
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/modelbuilder/predict",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(response);

        if (response.data.name) {
          setValue(response.data.ans);
          console.log("Price : " + response.data.ans);
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  };

  return (
    <SimpleGrid columns={[2, null, 2]} spacing="20px">
      <Box mt={"5rem"}  >
        <Text fontFamily={'New Century Schoolbook, TeX Gyre Schola, serif'} as='b' fontSize='7xl'>
            BENGLORE   </Text><br />
        <Text p={'1rem'} style={{ background:"orange" }} as='mark' fontFamily={'New Century Schoolbook, TeX Gyre Schola, serif'}  fontSize='7xl'>
        HOUSE PRICE </Text><br />
        <Text fontFamily={'New Century Schoolbook, TeX Gyre Schola, serif'} as='b' fontSize='7xl'>
        PREDICTOR </Text><br />

        <SimpleGrid columns={[2, null, 2]} spacing="10rem">
            <Box >
                <Image
                    ml={'10rem'}
                    mt={'2rem'}
                    boxSize='250px'
                    objectFit='cover'
                    src={houseImage}
                    alt='House'
                />
            </Box>  
            <Box mt={'2rem'}>
                <Text  fontSize='xl'>
                # Try to fill required data as per your requirement and our model will Let you know Predicted Value.   </Text><br />
                <Button ml={'-13rem'} onClick={onToggle}>How To Use</Button>
            <Collapse in={isOpen} animateOpacity>
                <Box
                p='20px'
                color='white'
                mt='4'
                mb='8'
                bg='teal.500'
                rounded='md'
                shadow='md'
                >
                <p> Put The Necessory Information regarding House inside the Form like :</p>
                <p> * Location of House</p>
                <p> * Number of BHK </p>
                <p> * Number of Bathrooms</p>
                <p> * And Area of House in Square feets</p>
                <p> At the End Hit the 'Click To Predict' Button... </p>

                </Box>
            </Collapse>
            </Box>    
            
        </SimpleGrid>   
       </Box>




      {/* Benglore Buildeing Price predictor */}

      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Avatar bg="teal.500" /> */}
          <Heading color="teal.400">Model Builder</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={predictValue}>
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
                      children={<CFaMapMarkedAlt color="gray.500" />}
                      mr="2rem"
                    />
                    <Select
                      ml={"3rem"}
                      placeholder="Select Location "
                      children={<FaMapMarkedAlt color="gray.500" />}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {/* locations.forEach((element) => {
                            <option value={ element } >element</option>
                        }); */}
                      {/* Manually  */}
                      <option value="1st Block Jayanagar">
                        1st Block Jayanagar
                      </option>
                      <option value="1st Phase JP Nagar">
                        1st Phase JP Nagar
                      </option>
                      <option value="2nd Phase Judicial Layout">
                        2nd Phase Judicial Layout
                      </option>
                      <option value="2nd Stage Nagarbhavi">
                        2nd Stage Nagarbhavi
                      </option>
                      <option value="5th Block Hbr Layout">
                        5th Block Hbr Layout
                      </option>
                      <option value="5th Phase JP Nagar">
                        5th Phase JP Nagar
                      </option>
                      <option value="6th Phase JP Nagar">
                        6th Phase JP Nagar
                      </option>
                      <option value="7th Phase JP Nagar">
                        7th Phase JP Nagar
                      </option>
                      <option value="8th Phase JP Nagar">
                        8th Phase JP Nagar
                      </option>
                      <option value="9th Phase JP Nagar">
                        9th Phase JP Nagar
                      </option>
                      <option value="AECS Layout">AECS Layout</option>
                      <option value="Abbigere">Abbigere</option>
                      <option value="Akshaya Nagar">Akshaya Nagar</option>
                      <option value="Ambalipura">Ambalipura</option>
                      <option value="Ambedkar Nagar">Ambedkar Nagar</option>
                    </Select>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaHotel color="gray.500" />}
                    />
                    <Input
                      type="text"
                      placeholder="Enter BHK"
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaShower color="gray.500" />}
                    />
                    <Input
                      type="text"
                      placeholder="Number of Bathrooms"
                      value={bath}
                      onChange={(e) => setBath(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaTarp color="gray.500" />}
                    />
                    <Input
                      type="text"
                      placeholder="SquareFeet"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  borderRadius={20}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Tap To Predict
                </Button>
              </Stack>
            </form>
          </Box>

        </Stack>
        <br />

        {value ? (
          <Box>
            <Text  p={'1rem'} m={'2rem'} as='b' style={{ background:"orange", color:"black" }}  fontFamily={'New Century Schoolbook, TeX Gyre Schola, serif'}  fontSize='4xl'>
            Predicted Value : {value}</Text><br />
          </Box>
        ) : (
          <h1></h1>
        )}
      </Flex>
    </SimpleGrid>
  );
};

export default ModelBuilder;
