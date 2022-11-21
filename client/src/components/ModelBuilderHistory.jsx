import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function ModelBuilderHistory() {

    const data = [{
        "_id": {
          "$oid": "6346ab9c1837f9ac03248f26"
        },
        "location": "2nd Phase Judicial Layout",
        "bhk": 2,
        "bath": 1,
        "sqft": "1000",
        "answer": "2252818.77"
      },{
        "_id": {
          "$oid": "6348f32581e6b0afe598d3fd"
        },
        "location": "1st Phase JP Nagar",
        "bhk": 2,
        "bath": 1,
        "sqft": "1000",
        "answer": "8488405.22"
      }]

      const dataDisplay = data.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.location}</td>
                    <td>{info.bhk}</td>
                    <td>{info.bath}</td>
                    <td>{info.sqft}</td>
                    <td>₹ {info.answer}</td>
                </tr>
            )
        }
)
  return (
    <>
      <div>ModelBuilderHistory</div>
      <TableContainer m={'10vh'} >
        <Table variant="striped" colorScheme="teal" >
          {/* <TableCaption>History</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Location</Th>
              <Th>BHK</Th>
              <Th>No. of Bath</Th>
              <Th>Square Feet</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataDisplay}
          </Tbody>
          {/* <Tfoot>
            <Tr>
            <Th>Location</Th>
              <Th>BHK</Th>
              <Th>No. of Bath</Th>
              <Th>Square Feet</Th>
              <Th>Price</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
}
export default ModelBuilderHistory;


