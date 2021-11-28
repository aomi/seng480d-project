import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text,
} from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import { useRef, useState } from 'react';
import { Distance } from './components/Distance';
import { Map } from './components/Map';
import { SpendingByMember } from './components/SpendingByMember';
import { expenditures, getConstituenciesByName, PartyColor } from './data';
import './index.css';

const ministers = Array.from(
  new Set(expenditures.map((expenditure) => expenditure.name)),
).sort();

const useScroll = (): [() => void, any] => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const executeScroll = () => {
    if (elRef.current) {
      elRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return [executeScroll, elRef];
};

export const App = () => {
  const [executeScroll, elRef] = useScroll();
  const [minister, setMinister] = useState<string | null>();

  const handleClick = (minister: string | null) => {
    setMinister(minister);
    executeScroll();
  };

  return (
    <Box p="2">
      <Flex justify="space-between">
        <Box>
          <Heading size="xl">
            SENG 480D Project - Members of Parliament Spending
          </Heading>
          <Text>
            This is a project for the SENG 480D course at the University of
            Victoria by Aomi Jokoji and Kanato Sato.
          </Text>
        </Box>
        <Box>
          Source: <Link href="https://www.ourcommons.ca/en">Our Commons</Link>{' '}
          and{' '}
          <Link href="https://open.canada.ca/en/open-data">
            Open Data Canada
          </Link>
        </Box>
      </Flex>
      <Box>
        <Distance onPointClick={handleClick} />
      </Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={4}>
          <div ref={elRef}>
            <SpendingByMember minister={minister} />
          </div>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Select
              onChange={(e) => setMinister(e.target.value)}
              size="md"
              value={minister ?? 'Select a Minister'}
              fontWeight="bold"
              fontSize="2xl"
            >
              {ministers.map((minister) => (
                <option key={minister} value={minister}>
                  {minister}
                </option>
              ))}
            </Select>
            <Box>
              <Heading ml="5" mt="2" size="md">
                Constituencies
              </Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Parliament</Th>
                    <Th>Constituency Name</Th>
                    <Th>Province/Territory</Th>
                    <Th>Party</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {minister &&
                    getConstituenciesByName(minister)
                      .sort((a, b) => b.parliament - a.parliament)
                      .map((constituency) => (
                        <Tr
                          key={
                            constituency.name +
                            constituency.parliament +
                            constituency.constituency
                          }
                        >
                          <Td>{constituency.parliament}</Td>
                          <Td>{constituency.constituency}</Td>
                          <Td> {constituency.province}</Td>
                          <Td display="flex">
                            <Text color={PartyColor(constituency.party)} mr="2">
                              ■
                            </Text>
                            {constituency.party}
                          </Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
