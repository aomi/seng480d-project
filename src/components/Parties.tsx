// https://airbnb.io/visx/polygons

import { Polygon } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { GradientPinkRed } from '@visx/gradient';
import { ministers } from '../data';
import { Box } from '@chakra-ui/layout';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';
import { useState } from 'react';

const parties: { [key: string]: string } = {
  'Canadian Alliance': '#00a8ff',
  Liberal: '#ff0000',
  'Bloc Québécois': '#00d9ff',
  NDP: '#ff6600',
  PC: '#ffffff',
  Reform: '',
  Independent: '#888888',
  'Ind. CA': '',
  Conservative: '#0000ff',
  'Independent Bloc Québécois': '#000000',
  'Green Party': '#3d9b35',
  'Indepedent Conservative': '#0000ff',
  'Conversative Indepedent': '#0000ff',
  "People's Party": '#ae00ff',
  'Co-operative Commonwealth Federation': '#ff0000',
};

export const PartyColor = (party?: string | null): string => {
  return party ? parties[party] ?? 'ffffff' : '#ffffff';
};

export const background = '#7f82e3';

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export type PolygonProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

export function PartiesVisualization({
  width,
  height,
  margin = defaultMargin,
}: PolygonProps) {
  const [n, setN] = useState(10);
  const [polygonSize, setPolygonSize] = useState(15);

  const polygons = ministers
    .filter((m) => m.parliament === 44)
    .sort(
      (a, b) =>
        +((a.party ?? '') > (b.party ?? '')) ||
        -((a.party ?? '') < (b.party ?? '')),
    )
    .slice(0, n)
    .map((m, i) => ({
      sides: 4,
      fill: PartyColor(m.party),
      rotate: 45,
    }));

  const yScale = scaleBand<number>({
    domain: polygons.map((p, i) => i),

    range: [0, height],
  });

  // const s = scaleLinear<number>({
  //   domain: polygons.map((p, i) => i),
  //   padding: 5,
  // });

  yScale.rangeRound([0, height]);

  console.log(yScale.bandwidth());
  console.log(polygons.map((p, i) => i));

  return (
    <Box>
      <Slider
        defaultValue={0}
        max={ministers.filter((m) => m.parliament === 44).length}
        aria-label=""
        onChange={(e) => setN(e)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Slider
        defaultValue={0}
        max={20}
        aria-label=""
        onChange={(e) => setPolygonSize(e)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <svg width={width} height={height}>
        <rect width={width} height={height} />
        <GradientPinkRed id="polygon-pink" />
        {polygons.map((polygon, i) => (
          <Group key={`polygon-${i}`} top={yScale(i)} left={0}>
            {/* <Polygon
              sides={polygon.sides}
              size={yScale.bandwidth()}
              fill={polygon.fill}
              rotate={polygon.rotate}
            /> */}
            <rect
              width={width / polygonSize}
              height={yScale.bandwidth()}
              fill={polygon.fill}
            />
          </Group>
        ))}
      </svg>
      {/* {polygons.map((polygon, i) => (
        <Box key={`polygon-${i}`}>{(yScale(i) || 0) + polygonSize / 2}</Box>
      ))} */}
    </Box>
  );
}
