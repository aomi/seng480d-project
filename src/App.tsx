import { useMemo, useState } from 'react';
import { Box } from '@chakra-ui/layout';

import { Select } from '@chakra-ui/select';
import {
  Crosshair,
  MarkSeries,
  VerticalBarSeries,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import { expenditures, years } from './data';

export const App = () => {
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedName, setSelectedName] = useState('');

  const yearData = useMemo(
    () => expenditures.filter((d) => d.year === selectedYear),
    [selectedYear],
  );

  const d = expenditures
    .filter((d) => d.quarter === 4 && d.name === selectedName)
    .sort((a, b) => b.total - a.total)
    .map((d, i) => ({ x: i, y: d.total ?? 0 }));

  return (
    <Box>
      <Box>
        <Select
          onChange={(e) => setSelectedYear(Number(e.currentTarget.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Box>
      <Box p="10">
        <Select onChange={(e) => setSelectedName(e.currentTarget.value)}>
          {yearData.map((d, i) => (
            <option key={d.name + selectedYear + i} value={d.name}>
              {d.name}
            </option>
          ))}
        </Select>

        <XYPlot width={800} height={500} xType="time">
          <VerticalBarSeries data={d} barWidth={0.4} />
          <XAxis />
          <YAxis tickFormat={(v) => `$${v}`} />
          <Crosshair values={d}>
            <Box>
              <p></p>
            </Box>
          </Crosshair>
        </XYPlot>
      </Box>
    </Box>
  );
};
