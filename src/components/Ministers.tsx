import { Box, Heading } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Link } from 'react-router-dom';
import {
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import { partyDistribution } from '../data';
import { useState } from 'react';
import { PartyColor } from './Parties';

export function Ministers() {
  const [useCanvas] = useState(false);

  const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

  console.log(partyDistribution);

  const parties = Array.from(
    new Set(partyDistribution.map((party) => party.party)),
  );

  return (
    <div>
      <XYPlot width={500} height={300} stackBy="y" xDomain={[36, 44]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        {parties.map((party) => (
          <BarSeries
            // xDomain={[36, 44]}
            key={party}
            data={partyDistribution
              .filter((c) => c.party === party)
              .map((c) => ({ x: c.parliament, y: c.name }))}
            barWidth={0.05}
            color={PartyColor(party)}
          />
        ))}
      </XYPlot>
    </div>
  );
}
