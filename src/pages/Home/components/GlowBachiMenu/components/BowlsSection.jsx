import { VStack, Heading, Text, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import MenuCard from './shared/MenuCard';

const MotionGrid = motion(Grid);

const BowlsSection = ({ bowls, onItemClick, colors }) => {
  const { primary } = colors;
  
  return (
    <VStack spacing={8} w="100%">
      <VStack spacing={4}>
        <Heading size={{ base: "md", md: "lg" }} color={primary} textAlign="center">
          SIGNATURE GLOW BOWLS
        </Heading>
        <Text 
          color="gray.400" 
          textAlign="center" 
          maxW="700px" 
          fontSize={{ base: "xs", md: "sm" }}
          px={4}
        >
          All bowls include your choice of base, grilled vegetables, and any GlowDrip sauce
        </Text>
      </VStack>
      
      <MotionGrid
        templateColumns={{ 
          base: "1fr", 
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)" 
        }}
        gap={{ base: 4, md: 6, lg: 8 }}
        w="100%"
      >
        {bowls.map((bowl, index) => (
          <GridItem key={bowl.id}>
            <MenuCard 
              item={bowl}
              index={index}
              layout="vertical"
              onItemClick={onItemClick}
              colors={colors}
            />
          </GridItem>
        ))}
      </MotionGrid>
    </VStack>
  );
};

export default BowlsSection;
