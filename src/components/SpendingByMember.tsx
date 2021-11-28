import { Box, Divider, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { useState, useMemo, useEffect } from 'react';
import {
  expenditureCategories,
  expenditures,
  getConstituenciesByName,
  PartyColor,
} from '../data';

import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox';
import { CurrencyFormatter } from '../data/currency';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BorderWrapper, SpendingCategoriesInfo, YType } from './Distance';

const cmp = (a: number, b: number) => +(a > b) - +(a < b);

type Props = {
  minister?: string | null;
};

export function SpendingByMember({ minister: name }: Props) {
  const [minister, setMinister] = useState<string | null>();

  const [description, setDescription] = useState('');

  const [isStacked, setIsStacked] = useState(true);

  const [showCategories, setShowCategories] = useState({
    _employees_salaries: true,
    _service_contracts: true,
    _travel: true,
    _hospitality: true,
  });

  useEffect(() => {
    if (name) setMinister(name);
  }, [name]);

  const data = useMemo(
    () =>
      expenditures
        .filter((e) => e.name === minister)
        .sort((a, b) => cmp(a.year, b.year) || cmp(a.quarter, b.quarter))
        .map((e) => ({ ...e, x: `${e.year}/Q${e.quarter}` })),
    [minister],
  );

  const handleCategoryToggle =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowCategories({ ...showCategories, [key]: e.target.checked });
    };

  const handleCategoryMouseOver =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const c = key as YType;
      setDescription(SpendingCategoriesInfo[c].description);
    };

  return (
    <Box>
      <Box>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="lg">Member Spending vs. Time</Heading>
          </Box>
          <Flex align="center">
            <CheckboxGroup>
              <HStack spacing={4} mx="2">
                {expenditureCategories.map((category) => (
                  <BorderWrapper
                    color={category.color}
                    onMouseOver={handleCategoryMouseOver(category.key)}
                  >
                    <Checkbox
                      key={category.key}
                      size="md"
                      colorScheme="blackAlpha"
                      defaultIsChecked
                      onChange={handleCategoryToggle(category.key)}
                    >
                      {category.title}
                    </Checkbox>
                  </BorderWrapper>
                ))}
                <BorderWrapper color={'white'}>
                  <Checkbox
                    size="md"
                    colorScheme="blackAlpha"
                    defaultIsChecked
                    onChange={(e) => setIsStacked(!isStacked)}
                  >
                    Stack
                  </Checkbox>
                </BorderWrapper>
              </HStack>
            </CheckboxGroup>
          </Flex>
        </Flex>
        <Text>{description}</Text>
      </Box>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart margin={{ left: 70, bottom: 20 }} data={data}>
          <CartesianGrid />
          <XAxis dataKey="x" label={{ value: 'Year | Quarter', dy: 20 }} />
          <YAxis
            label={{
              dx: -80,
              value: 'Spending',
              angle: -90,
            }}
            tickFormatter={(v) => CurrencyFormatter(v)}
          />
          <Tooltip />
          {expenditureCategories.map(
            (category) =>
              showCategories[category.key] && (
                <Bar
                  key={category.key}
                  dataKey={category.key}
                  stackId={isStacked ? 'a' : undefined}
                  fill={category.color}
                />
              ),
          )}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
