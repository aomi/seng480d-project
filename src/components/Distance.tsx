import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';
import { PropsWithChildren, useMemo, useState } from 'react';

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CurrencyFormatter } from '../data/currency';
import {
  expenditureCategories,
  expenditures,
  PartyColor,
  partyColors,
} from '../data';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { Radio, RadioGroup } from '@chakra-ui/radio';

const isWithinRange = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
};

const max = Math.max(...expenditures.map(({ distance }) => distance));

const x = expenditures.map(
  ({
    year,
    quarter,
    constituency_name,
    constituency_size,
    number_of_electors,
    party,
    _hospitality,
    _employees_salaries,
    _travel,
    total,
    distance,
    name,
  }) => ({
    year,
    quarter,
    constituency_name,
    constituency_size,
    number_of_electors,
    party,
    _hospitality,
    _employees_salaries,
    _travel,
    total,
    distance,
    name,
  }),
);

export const BorderWrapper = ({
  children,
  color,
}: PropsWithChildren<{ color: string }>) => (
  <Box borderBottom="3px solid" borderColor={color} pb="0.5">
    {children}
  </Box>
);

type YType =
  | '_travel'
  | '_employees_salaries'
  | '_hospitality'
  | 'number_of_electors';

const SpendingCategoriesInfo: Record<
  YType,
  { title: string; description: string }
> = {
  _travel: {
    title: 'Travel',
    description:
      'This category includes the travel expenses charged under the Travel Points System and to the Member’s Office Budget.',
  },
  _employees_salaries: {
    title: 'Salaries',
    description: 'This category includes the salaries of Members’ employees.',
  },
  _hospitality: {
    title: 'Hospitality',
    description:
      'This category includes hospitality expenses incurred for events in the fulfillment of parliamentary functions.',
  },
  number_of_electors: {
    title: 'Electors',
    description: 'Number of electors in a Members’ constituency',
  },
};

type Props = {
  onPointClick?: (name: string) => void;
};

export function Distance({ onPointClick }: Props) {
  const [distanceRange, setDistanceRange] = useState([0, max]);
  const [year, setYear] = useState(2019);

  const [category, setCategory] = useState<YType>('_travel');

  const handleYear = (value: number) => {
    setYear(value);
  };

  const handleFilter = (value: number[]) => {
    setDistanceRange(value);
  };

  const handlePointClick = (point: any) => {
    // console.log(point);
    if (point.name) {
      onPointClick?.(point.name);
    }
  };

  const data = useMemo(
    () =>
      x
        .filter((c) => c.year === year && c.quarter === 4)
        .filter((c) =>
          isWithinRange(c.distance, distanceRange[0], distanceRange[1]),
        )
        .map((c) => ({
          x: c.distance,
          y: c[category],
          fill: PartyColor(c.party),
          name: c.name,
          party: c.party,
          constituency_name: c.constituency_name,
        })),
    [distanceRange, year, category],
  );

  const labels = useMemo(
    () =>
      Array.from(
        new Set(data.map((d) => d.party).filter((d) => (d?.length ?? 0) > 0)),
      ),
    [data],
  );

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Heading size="lg">
          {SpendingCategoriesInfo[category].title} vs. Distance to Ottawa
        </Heading>
        <Heading size="lg" fontWeight="normal">
          Year: <b>{year}</b> | Distance Range: <b>{distanceRange[0]}km</b> -{' '}
          <b>{Math.round(distanceRange[1])}km</b>
        </Heading>
      </Flex>
      <Flex justify="space-between">
        <Text fontSize="lg">
          {SpendingCategoriesInfo[category].title}:{' '}
          {SpendingCategoriesInfo[category].description}
        </Text>
        <RadioGroup onChange={setCategory as any} value={category} size="md">
          <Stack direction="row" spacing={4}>
            <BorderWrapper
              color={
                expenditureCategories.find(
                  (c) => c.key === '_employees_salaries',
                )?.color ?? ''
              }
            >
              <Radio colorScheme="blackAlpha" value="_employees_salaries">
                Salaries
              </Radio>
            </BorderWrapper>
            <BorderWrapper
              color={
                expenditureCategories.find((c) => c.key === '_travel')?.color ??
                ''
              }
            >
              <Radio colorScheme="blackAlpha" value="_travel">
                Travel
              </Radio>
            </BorderWrapper>
            <BorderWrapper color="red">
              <Radio colorScheme="blackAlpha" value="number_of_electors">
                Number of Electors
              </Radio>
            </BorderWrapper>
          </Stack>
        </RadioGroup>
      </Flex>
      <Box>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart height={500} margin={{ left: 70, top: 15 }}>
            <CartesianGrid />
            <Tooltip cursor={{ strokeDasharray: '33' }} />
            <XAxis
              label={{ value: 'Distance to Ottawa', dy: 15 }}
              type="number"
              dataKey="x"
              name="distance"
              unit="km"
            />
            <YAxis
              label={{
                dx: -80,
                value: SpendingCategoriesInfo[category].title,
                angle: -90,
              }}
              type="number"
              dataKey="y"
              name="expenditure"
              unit={category === '_travel' ? '$' : ''}
              tickFormatter={(v) =>
                category.indexOf('_') ? v : CurrencyFormatter(v)
              }
            />
            <Legend
              // verticalAlign="middle"
              // align="bottom"
              // layout="vertical"

              textAnchor="end"
              payload={labels.map<Payload>((c, i) => ({
                value: <Text>{c}</Text>,
                color: PartyColor(c),
                type: 'circle',
                id: 'ID' + i,
              }))}
              formatter={(value) => <Text textColor="black">{value}</Text>}
            />
            <Scatter
              dataKey="x"
              fill="#8884d8"
              data={data}
              onClick={handlePointClick}
              // isAnimationActive={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <Flex direction="row" justify="center">
          <Box w="8.5em">
            <Text>Distance Range</Text>
            <Text>Year</Text>
          </Box>
          <Box w="100%">
            <RangeSlider
              w="100%"
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={['min', 'max']}
              defaultValue={[0, max]}
              min={0}
              max={max}
              colorScheme="gray"
              onChange={handleFilter}
              size="sm"
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Slider
              w="100%"
              defaultValue={year}
              min={2012}
              max={2021}
              aria-label=""
              onChange={handleYear}
              size="sm"
            >
              <SliderTrack />
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
