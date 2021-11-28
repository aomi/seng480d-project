// https://airbnb.io/visx/polygons

import { Polygon } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { GradientPinkRed } from '@visx/gradient';
import { ministers, PartyColor } from '../data';
import { Box } from '@chakra-ui/layout';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';
import { useState } from 'react';

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
