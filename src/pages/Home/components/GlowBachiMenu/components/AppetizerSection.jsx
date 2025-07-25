import { VStack, Heading, Grid, GridItem } from '@chakra-ui/react';
import MenuCard from './shared/MenuCard';

const AppetizerSection = ({ appetizers, onQuickAdd, colors }) => {
  const { primary } = colors;
  
  return (
    <VStack spacing={8} w="100%">
      <Heading size={{ base: "md", md: "lg" }} color={primary} textAlign="center">
        APPETIZERS
      </Heading>
      
      <Grid
        templateColumns={{ 
          base: "1fr", 
          lg: "repeat(2, 1fr)" 
        }}
        gap={{ base: 4, md: 6 }}
        w="100%"
        maxW={{ base: "100%", lg: "1000px" }}
        mx="auto"
      >
        {appetizers.map((item, index) => (
          <GridItem key={item.id}>
            <MenuCard 
              item={item}
              index={index}
              layout="horizontal"
              onQuickAdd={onQuickAdd}
              colors={colors}
            />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default AppetizerSection;
