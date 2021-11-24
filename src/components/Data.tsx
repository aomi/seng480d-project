import { Box, Heading } from '@chakra-ui/layout';
import { Table, Thead, Tbody, Td, Tr, Th } from '@chakra-ui/react';
import { ministers } from '../data';

export const Data = () => {
  return (
    <Box>
      <Heading>Data</Heading>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Parliament</Th>
            <Th>Name</Th>
            <Th>Constituency</Th>
            <Th>Party</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ministers.map((minister) => {
            return (
              <Tr key={minister.name + minister.parliament}>
                <Td>{minister.parliament}</Td>
                <Td>{minister.name}</Td>
                <Td>{minister.constituency}</Td>
                <Td>{minister.party}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
