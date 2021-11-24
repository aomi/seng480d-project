import { Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { expenditures } from '../data';

const constituencies = Array.from(
  new Set(expenditures.map((d) => d.constituency_name)),
);

export const Constituencies = () => {
  return (
    <Box>
      <h1>Constituencies</h1>
      {constituencies.map((name) => {
        return (
          <Box>
            <Link to={`/constituency/${name}`}>{name}</Link>
          </Box>
        );
      })}
    </Box>
  );
};
