import { 
  Box, 
  Grid, 
  GridItem, 
  VStack, 
  HStack,
  Heading, 
  Text, 
  Button, 
  useBreakpointValue,
  keyframes,
  Badge,
  Icon,
  Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { GiNoodles, GiBowlOfRice } from 'react-icons/gi';
import ActiveOrdersTracker from '../../../components/common/ActiveOrdersTracker';
import SauceShowcase from '../../../components/menu/SauceShowcase';
import { glowBachiMenu } from '../../../data/glowBachiMenu';

const MotionBox = motion(Box);

// Keyframe animations
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-10px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const BuildAndTrack = ({ menuType, onBuildClick, colors, menuData }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const isBreakfast = menuType === 'breakfast';
  
  // Use passed menuData prop for breakfast, or glowBachiMenu for dinner
  const currentMenu = isBreakfast ? menuData : glowBachiMenu;
  
  // Make sure we have menu data
  if (!currentMenu) {
    return null;
  }
  
  const buildYourOwnData = isBreakfast ? {
    title: 'BUILD YOUR BREAKFAST',
    subtitle: 'Stack it your way, partner',
    icon: GiBowlOfRice,
    bases: currentMenu.buildYourOwn?.bases || [],
    features: ['Add meats', 'Stack veggies', 'Pick your cheese', 'Top it off'],
    buttonText: 'Start Building',
    accentText: 'From scratch, made to order'
  } : {
    title: 'BUILD YOUR BOWL',
    subtitle: 'Fire it up your way',
    icon: GiNoodles,
    pricing: {
      small: { price: 11, size: 'Small Bowl', description: 'Perfect for lunch' },
      large: { price: 14, size: 'Large Bowl', description: 'Dinner sized' }
    },
    features: ['Choose your base', 'Pick your protein', 'Select sauces', 'Add toppings'],
    buttonText: 'Start Building',
    accentText: 'Customized hibachi perfection'
  };

  const BuildSection = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      h="100%"
    >
      <Box
        position="relative"
        bg="rgba(20,20,20,0.8)"
        backdropFilter="blur(20px)"
        p={{ base: 6, md: 8 }}
        borderRadius="2xl"
        border="2px solid"
        borderColor={`${colors.primary}33`}
        h="100%"
        overflow="hidden"
        cursor="pointer"
        onClick={onBuildClick}
        role="group"
        _hover={{
          borderColor: colors.primary,
          bg: "rgba(25,25,25,0.9)",
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 40px ${colors.primary}22`,
          '& .build-icon': {
            transform: 'rotate(10deg) scale(1.1)',
            color: colors.secondary
          },
          '& .arrow-icon': {
            transform: 'translateX(5px)'
          }
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        {/* Background gradient effect */}
        <Box
          position="absolute"
          top="-50%"
          right="-30%"
          width="300px"
          height="300px"
          bg={`radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`}
          filter="blur(60px)"
          animation={`${pulse} 4s ease-in-out infinite`}
        />
        
        <VStack spacing={6} align="stretch" position="relative">
          {/* Header with icon */}
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={3}>
              <Badge
                colorScheme={isBreakfast ? "yellow" : "orange"}
                fontSize="xs"
                px={3}
                py={1}
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="wider"
                bg={`${colors.primary}22`}
                color={colors.primary}
                border="1px solid"
                borderColor={`${colors.primary}44`}
              >
                {isBreakfast ? 'Breakfast Builder' : 'Bowl Builder'}
              </Badge>
              
              <Heading 
                size="lg" 
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontWeight="800"
              >
                {buildYourOwnData.title}
              </Heading>
              
              <Text 
                color="gray.300" 
                fontSize={{ base: "sm", md: "md" }}
                fontStyle="italic"
                fontWeight="400"
              >
                {buildYourOwnData.subtitle}
              </Text>
            </VStack>
            
            <Icon
              as={buildYourOwnData.icon}
              boxSize={{ base: 12, md: 16 }}
              color={colors.primary}
              opacity={0.2}
              className="build-icon"
              transition="all 0.3s"
            />
          </HStack>

          {/* Pricing or Base Options */}
          {isBreakfast ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              {buildYourOwnData.bases.map((base, idx) => (
                <MotionBox
                  key={base.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  p={3}
                  bg="rgba(255,255,255,0.03)"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.06)"
                  _groupHover={{ 
                    bg: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="600" color="white">
                      {base.name}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {base.description}
                    </Text>
                    <Text 
                      fontSize="lg" 
                      fontWeight="700" 
                      color={colors.primary}
                    >
                      ${base.price}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          ) : (
            <HStack spacing={4} justify="center">
              {Object.entries(buildYourOwnData.pricing).map(([key, value]) => (
                <MotionBox
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: key === 'small' ? 0 : 0.1 }}
                  p={4}
                  bg="rgba(255,255,255,0.03)"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={key === 'small' ? `${colors.primary}44` : `${colors.secondary}44`}
                  flex={1}
                  textAlign="center"
                  _groupHover={{ 
                    bg: 'rgba(255,255,255,0.05)',
                    transform: 'scale(1.05)',
                    borderColor: key === 'small' ? colors.primary : colors.secondary
                  }}
                >
                  <Text 
                    fontSize="3xl" 
                    fontWeight="800" 
                    color={key === 'small' ? colors.primary : colors.secondary}
                  >
                    ${value.price}
                  </Text>
                  <Text fontSize="sm" color="white" fontWeight="600">
                    {value.size}
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    {value.description}
                  </Text>
                </MotionBox>
              ))}
            </HStack>
          )}

          {/* Features list */}
          <VStack align="start" spacing={2}>
            <Text fontSize="xs" color="gray.400" textTransform="uppercase" letterSpacing="wider" fontWeight="600">
              What's included:
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={2} width="100%">
              {buildYourOwnData.features.map((feature, idx) => (
                <HStack 
                  key={idx} 
                  spacing={2}
                  animation={`${slideIn} 0.5s ease-out ${idx * 0.1}s`}
                >
                  <Icon as={FiPlus} color={colors.primary} boxSize={3} />
                  <Text fontSize="sm" color="gray.200">
                    {feature}
                  </Text>
                </HStack>
              ))}
            </Grid>
          </VStack>

          {/* Accent text */}
          <Text 
            fontSize="xs" 
            color={colors.primary} 
            textAlign="center"
            fontWeight="600"
            letterSpacing="wider"
            textTransform="uppercase"
            opacity={0.8}
          >
            {buildYourOwnData.accentText}
          </Text>

          {/* CTA Button */}
          <Button
            size="lg"
            bg={colors.primary}
            color="black"
            fontWeight="800"
            rightIcon={<Icon as={FiArrowRight} className="arrow-icon" transition="all 0.3s" />}
            _hover={{ 
              bg: colors.secondary,
              transform: 'scale(1.02)',
              boxShadow: `0 10px 30px ${colors.primary}44`
            }}
            _active={{ transform: 'scale(0.98)' }}
            transition="all 0.2s"
            width="100%"
            height="56px"
            fontSize="md"
            letterSpacing="wider"
            textTransform="uppercase"
            onClick={(e) => {
              e.stopPropagation();
              onBuildClick();
            }}
          >
            {buildYourOwnData.buttonText}
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );

  if (isMobile) {
    return (
      <>
        <Container maxW="container.lg" px={{ base: 4, md: 8 }}>
          <VStack spacing={8} w="100%">
            <BuildSection />
            <Box w="100%">
              <ActiveOrdersTracker />
            </Box>
          </VStack>
        </Container>
        {!isBreakfast && (
          <Box mt={8}>
            <SauceShowcase colors={colors} />
          </Box>
        )}
      </>
    );
  }

  return (
    <>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Grid templateColumns="1fr 350px" gap={8} w="100%">
          <GridItem>
            <BuildSection />
          </GridItem>
          <GridItem>
            <ActiveOrdersTracker />
          </GridItem>
        </Grid>
      </Container>
      {!isBreakfast && (
        <Box mt={12}>
          <SauceShowcase colors={colors} />
        </Box>
      )}
    </>
  );
};

export default BuildAndTrack;