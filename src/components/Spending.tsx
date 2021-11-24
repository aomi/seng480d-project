import { Box, Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { useState } from 'react';
import {
  expenditures,
  getConstituenciesByName,
  getPartyColorByName,
} from '../data';
import {
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  XAxis,
  XYPlot,
  MarkSeries,
  LineSeries,
  YAxis,
} from 'react-vis';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { Bar } from '@visx/shape';

const e = expenditures;

const ministers = Array.from(
  new Set(expenditures.map((expenditure) => expenditure.name)),
);

const cmp = (a: number, b: number) => +(a > b) - -(a < b);

function SpendingX() {
  const xScale = scaleBand({
    range: [0, 1000],
    domain: [0, 5],
  });

  const yScale = scaleLinear({
    range: [500, 0],
    domain: [0, 4],
  });

  return (
    <Box>
      <ParentSize>
        {(parent) => (
          <svg width={parent.width} height={500}>
            {/* Sets the background using a graident and assigns an id which is used in the rect tag */}
            {/* <GradientTealBlue id="teal" /> */}
            {/* <rect width={parent.width} height={500} fill="url(#teal)" rx={14} /> */}

            <Group top={0}>
              {[
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 4 },
              ].map((d, i) => {
                const barX = xScale(d.x);
                const barY = yScale(d.y);
                const barWidth = xScale.bandwidth();
                const barHeight = yScale(d.y) ?? 0;
                return (
                  <Bar
                    key={`bar-${i}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="#b18e8e"
                  />
                );
              })}
            </Group>
          </svg>
        )}
      </ParentSize>
    </Box>
  );
}

export function Spending() {
  const [minister, setMinister] = useState<null | string>(null);

  return (
    <Box>
      <Select onChange={(e) => setMinister(e.target.value)}>
        <option value="">Select a Minister</option>
        {ministers.map((minister) => (
          <option key={minister} value={minister}>
            {minister}
          </option>
        ))}
      </Select>

      <Box p="5">
        <Heading size="4xl">{minister?.split(',').reverse().join(' ')}</Heading>
        <Heading size="xl">Constituencies</Heading>
        {getConstituenciesByName(minister).map((constituency) => (
          <Box>
            <p></p>
            <p>
              {constituency.parliament}th {constituency.constituency} -{' '}
              {constituency.party}
            </p>
          </Box>
        ))}
        <Heading size="xl">Triannual Spending</Heading>
        <ParentSize>
          {(parent) => (
            <XYPlot width={parent.width} height={300} xType="ordinal">
              <XAxis />
              <YAxis />
              <VerticalBarSeries
                animation
                barWidth={0.9}
                color={getPartyColorByName(minister)}
                data={e
                  .filter((c) => c.name === minister && c.quarter !== 4)
                  .sort(
                    (a, b) => cmp(a.year, b.year) || cmp(a.quarter, b.quarter),
                  )
                  .map((c) => ({ x: `${c.year}/${c.quarter}`, y: c.total }))}
              />
            </XYPlot>
          )}
        </ParentSize>
        <Heading size="xl">Annual Spending</Heading>
        <ParentSize>
          {(parent) => (
            <XYPlot width={parent.width} height={300} xType="ordinal">
              <XAxis />
              <YAxis />
              <HorizontalGridLines />
              <VerticalBarSeries
                animation
                barWidth={0.9}
                color={getPartyColorByName(minister)}
                data={e
                  .filter((c) => c.name === minister && c.quarter === 4)
                  .sort(
                    (a, b) => cmp(a.year, b.year) || cmp(a.quarter, b.quarter),
                  )
                  .map((c) => ({ x: `${c.year}`, y: c.total }))}
              />
            </XYPlot>
          )}
        </ParentSize>
        <SpendingX />
      </Box>
    </Box>
  );
}
