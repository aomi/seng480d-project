import { Box, Heading } from '@chakra-ui/layout';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/slider';
import { useMemo, useState } from 'react';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { CurrencyFormatter } from '../data/currency';
import { expenditures, PartyColor, totalPartySpending } from '../data';

export function PartySpending() {
  const [value, setValue] = useState<number[]>([2021, 2021]);
  const data = useMemo(
    () =>
      totalPartySpending
        .filter(
          ({ year, _travel }) =>
            year >= value[0] && year <= value[1] && _travel > 0,
        )
        .sort((a, b) => b._travel - a._travel)
        .reduce<{
          [key: string]: { y: number; fill: string };
        }>((acc, curr) => {
          if (!acc[curr.party]) {
            acc[curr.party] = {
              y: curr._travel,
              fill: PartyColor(curr.party),
            };
          } else {
            acc[curr.party].y += curr._travel;
          }
          return acc;
        }, {}),
    [value],
  );

  return (
    <Box m="5">
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={['min', 'max']}
        size={'sm'}
        defaultValue={value}
        min={2012}
        max={2021}
        onChangeEnd={(e) => setValue(e)}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
      {/* crudely show the current year values */}
      {JSON.stringify(value)}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={Object.keys(data).map((c) => ({
            name: c,
            y: data[c].y,
            fill: data[c].fill,
          }))}
        >
          <XAxis dataKey="name" />
          <YAxis dataKey="y" />
          <Bar dataKey="y" fill="#8884d8" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
      {JSON.stringify(data)}
      <Heading>Top 10 Spenders</Heading>
      {expenditures
        .filter(
          ({ year, quarter }) =>
            year >= value[0] && year <= value[1] && quarter === 4,
        )
        .sort((a, b) => b.total - a.total)
        .slice(0, 10)
        .map((e, i) => (
          <Box key={e.name + i}>
            <Box>
              {i + 1} - {e.name} - {e.constituency_name} - {e.year}
            </Box>
            <Box>{CurrencyFormatter(e.total)}</Box>
          </Box>
        ))}
    </Box>
  );
}
