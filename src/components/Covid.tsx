import { Box, Heading } from '@chakra-ui/layout';
import { ParentSize } from '@visx/responsive';
import { LineMarkSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import { expenditures } from '../data';

const covidExpenditures = expenditures;

const ministers = Array.from(new Set(covidExpenditures.map((e) => e.name)));

export function Covid() {
  return (
    <Box>
      <Heading>COVID19</Heading>

      <ParentSize>
        {({ width }) => (
          <XYPlot width={width} height={1200} xType="ordinal">
            <XAxis />
            <YAxis />
            {ministers.slice(1, 400).map((minister) => (
              <LineMarkSeries
                style={{ fill: 'none' }}
                key={minister}
                data={covidExpenditures
                  .filter((e) => e.name === minister)
                  .sort((a, b) => b.year - a.year || b.quarter - a.quarter)
                  .map((e) => ({
                    x: `${e.year}/Q${e.quarter}`,
                    y: e._service_contracts,
                  }))}
              />
            ))}
          </XYPlot>
        )}
      </ParentSize>
    </Box>
  );
}
