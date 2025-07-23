import { HStack, Icon } from '@chakra-ui/react';
import { HiFire } from 'react-icons/hi';

const SpicyLevel = ({ level }) => {
  const darkRed = '#FF1744';
  
  return (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          as={HiFire}
          boxSize={3}
          color={i < level ? darkRed : 'gray.700'}
        />
      ))}
    </HStack>
  );
};

export default SpicyLevel;
