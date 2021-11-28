import { Box, Heading } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Link } from 'react-router-dom';
import {
  Highlight,
  HighlightArea,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import { PartyColor, partyDistribution } from '../data';
import { useMemo, useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

export function Ministers() {
  const [useCanvas] = useState(false);

  const [selectionStart, setSelectionStart] = useState<
    number | null | undefined
  >(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null | undefined>(
    null,
  );

  const handleDrag = (area: HighlightArea | null) => {
    setSelectionStart(area && area.left);
    setSelectionEnd(area && area.right);
    console.log(area);
  };

  const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

  console.log(partyDistribution);

  const parties = useMemo(
    () => Array.from(new Set(partyDistribution.map((party) => party.party))),
    [],
  );

  return (
    <div>
      <Box p="5">
        <ParentSize>
          {({ width }) => (
            <XYPlot
              width={width}
              height={500}
              stackBy="y"
              xType="ordinal"
              margin={{ left: 50 }}
            >
              <XAxis title="Parliament" />
              <YAxis title="Members" />
              {parties.map((party) => (
                <BarSeries
                  // xDomain={[36, 44]}
                  key={party}
                  data={partyDistribution
                    .filter((c) => c.party === party)
                    .map((c) => ({ x: c.parliament, y: c.name }))}
                  barWidth={0.9}
                  color={PartyColor(party)}
                />
              ))}
              <Highlight
                color="red"
                drag
                enableY={false}
                onDrag={handleDrag}
                onDragEnd={handleDrag}
              />
              <HorizontalGridLines />
              <VerticalGridLines />
            </XYPlot>
          )}
        </ParentSize>
        <div>
          <b>selectionStart:</b>{' '}
          {`${Math.floor(selectionStart ?? 0 * 100) / 100},`}
          <b>selectionEnd:</b> {`${Math.floor(selectionEnd ?? 0 * 100) / 100},`}
        </div>
      </Box>
    </div>
  );
}
