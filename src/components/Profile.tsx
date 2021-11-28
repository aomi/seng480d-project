import { Box } from '@chakra-ui/layout';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CurrencyFormatter } from '../data/currency';
import { expenditures } from '../data';

export const Profile = () => {
  const { name } = useParams();

  const d = expenditures.filter((d) => d.name === name);

  return (
    <Box>
      <Link to="/mp">Back</Link>
      {d.map((e) => (
        <Box>
          <p>{e.constituency_name}</p>
          <p>{e.constituency_size}</p>
          <p>{e.year}</p>
          <p>{CurrencyFormatter(e.total)}</p>
        </Box>
      ))}
    </Box>
  );
};
