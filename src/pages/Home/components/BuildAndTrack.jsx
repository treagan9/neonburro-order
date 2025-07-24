import { Box, Grid, GridItem, VStack, Heading, Text, Button, HStack, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ActiveOrdersTracker from '../../../components/common/ActiveOrdersTracker';

const MotionBox = motion(Box);

const BuildAndTrack = ({ menuType, onBuildClick, colors }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const isBreakfast = menuType === 'breakfast';
  
  const buildYourOwnData = isBreakfast ? {
    title: 'BUILD YOUR BREAKFAST',
    subtitle: 'Start with a base, then stack it your way',
    bases: [
      { name: 'Biscuit', price: 4 },
      { name: 'Omelette', price: 6 },
      { name: 'Scramble Bowl', price: 6 },
      { name: 'Kouign-Amann', price: 5 }
    ],
    buttonText: 'Start Building'
  } : {
    title: 'BUILD YOUR OWN BOWL',
    subtitle: 'Choose your base, protein, and sauces',
    pricing: {
      small: 11,
      large: 14
    },
    buttonText: 'Start Building'
  };

  const BuildSection = () => (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      h="100%"
    >
      <Box
        bg={`linear-gradient(135deg, ${colors.primary}11 0%, ${colors.secondary}11 100%)`}
        p={{ base: 6, md: 8 }}
        borderRadius="2xl"
        border="2px solid"
        borderColor={colors.primary}
        textAlign="center"
        cursor="pointer"
        onClick={onBuildClick}
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        _hover={{
          borderColor: colors.secondary,
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 40px ${colors.primary}33`
        }}
        transition="all 0.3s"
      >
        <VStack spacing={4}>
          <Heading size="lg" color="white">
            {buildYourOwnData.title}
          </Heading>
          <Text color="gray.300" fontSize={{ base: "sm", md: "md" }}>
            {buildYourOwnData.subtitle}
          </Text>
          
          {isBreakfast ? (
            <HStack spacing={6} flexWrap="wrap" justify="center">
              {buildYourOwnData.bases.map(base => (
                <VStack key={base.name}>
                  <Text fontSize="sm" color="gray.400">
                    {base.name}
                  </Text>
                  <Text fontSize="lg" fontWeight="700" color={colors.primary}>
                    ${base.price}
                  </Text>
                </VStack>
              ))}
            </HStack>
          ) : (
            <HStack spacing={8}>
              <VStack>
                <Text fontSize="2xl" fontWeight="800" color={colors.primary}>
                  ${buildYourOwnData.pricing.small}
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Small
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="800" color={colors.secondary}>
                  ${buildYourOwnData.pricing.large}
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Large
                </Text>
              </VStack>
            </HStack>
          )}
          
          <Button
            size="lg"
            bg={colors.primary}
            color="black"
            fontWeight="800"
            _hover={{ bg: colors.secondary }}
            transition="all 0.2s"
          >
            {buildYourOwnData.buttonText}
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );

  if (isMobile) {
    return (
      <VStack spacing={8} w="100%">
        <BuildSection />
        <Box w="100%">
          <ActiveOrdersTracker />
        </Box>
      </VStack>
    );
  }

  return (
    <Grid templateColumns="1fr 1fr" gap={8} w="100%">
      <GridItem>
        <BuildSection />
      </GridItem>
      <GridItem>
        <ActiveOrdersTracker />
      </GridItem>
    </Grid>
  );
};

export default BuildAndTrack;
