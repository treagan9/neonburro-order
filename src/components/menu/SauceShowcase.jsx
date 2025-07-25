import { 
  Box, 
  VStack, 
  HStack,
  Heading, 
  Text, 
  Badge,
  Image,
  Icon,
  Button,
  useBreakpointValue,
  keyframes
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';
import { GiChiliPepper } from 'react-icons/gi';
import { glowBachiMenu } from '../../data/glowBachiMenu';
import { useRef } from 'react';

const MotionBox = motion(Box);

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const SauceShowcase = ({ colors }) => {
  const scrollRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box 
      py={16} 
      bg="rgba(0,0,0,0.4)"
      borderY="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="100%"
        opacity={0.03}
        bg={`repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          ${colors.primary} 10px,
          ${colors.primary} 20px
        )`}
      />
      
      <VStack spacing={8} align="stretch" maxW="container.xl" mx="auto" px={{ base: 4, md: 8 }}>
        {/* Header */}
        <VStack spacing={3} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorScheme="orange"
              fontSize="sm"
              px={4}
              py={2}
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="wider"
              border="1px solid"
              borderColor={`${colors.primary}44`}
              bg={`${colors.primary}11`}
              color={colors.primary}
            >
              9 Signature GlowDrip Sauces
            </Badge>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Heading 
              size="xl" 
              color="white"
              fontWeight="800"
              letterSpacing="-0.02em"
            >
              Pick Your Flavor Adventure
            </Heading>
          </MotionBox>
          
          <Text color="gray.400" fontSize="md" maxW="600px" mx="auto">
            Every bowl comes with your choice of sauce. From mild to wild, find your perfect match.
          </Text>
        </VStack>

        {/* Sauce Carousel Container */}
        <Box position="relative">
          {/* Navigation Buttons - Desktop Only */}
          {!isMobile && (
            <>
              <Button
                position="absolute"
                left={{ base: "-10px", lg: "-50px" }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                borderRadius="full"
                bg="rgba(0,0,0,0.9)"
                border="2px solid"
                borderColor="whiteAlpha.200"
                color="white"
                size="lg"
                p={0}
                w="50px"
                h="50px"
                _hover={{ 
                  bg: "rgba(0,0,0,1)", 
                  borderColor: colors.primary,
                  color: colors.primary,
                  transform: "translateY(-50%) scale(1.1)"
                }}
                onClick={() => scroll('left')}
                transition="all 0.2s"
              >
                <Icon as={FiChevronLeft} boxSize={6} />
              </Button>
              
              <Button
                position="absolute"
                right={{ base: "-10px", lg: "-50px" }}
                top="50%"
                transform="translateY(-50%)"
                zIndex={2}
                borderRadius="full"
                bg="rgba(0,0,0,0.9)"
                border="2px solid"
                borderColor="whiteAlpha.200"
                color="white"
                size="lg"
                p={0}
                w="50px"
                h="50px"
                _hover={{ 
                  bg: "rgba(0,0,0,1)", 
                  borderColor: colors.primary,
                  color: colors.primary,
                  transform: "translateY(-50%) scale(1.1)"
                }}
                onClick={() => scroll('right')}
                transition="all 0.2s"
              >
                <Icon as={FiChevronRight} boxSize={6} />
              </Button>
            </>
          )}

          {/* Scrollable Sauce Container */}
          <Box
            ref={scrollRef}
            overflowX="auto"
            overflowY="hidden"
            pb={4}
            mx={{ base: -4, md: 0 }}
            px={{ base: 4, md: 0 }}
            css={{
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                borderRadius: '4px',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: `${colors.primary} rgba(255,255,255,0.05)`
            }}
          >
            <HStack spacing={4} align="stretch" py={2}>
              {glowBachiMenu.sauces.map((sauce, idx) => (
                <MotionBox
                  key={sauce.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whiteSpace="normal"
                  display="inline-block"
                  verticalAlign="top"
                  width="320px"
                  flexShrink={0}
                >
                  <Box
                    bg="rgba(20,20,20,0.8)"
                    backdropFilter="blur(20px)"
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="whiteAlpha.100"
                    p={6}
                    h="100%"
                    position="relative"
                    overflow="hidden"
                    role="group"
                    cursor="pointer"
                    _hover={{
                      borderColor: colors.primary,
                      transform: 'translateY(-8px) scale(1.02)',
                      bg: "rgba(25,25,25,0.9)",
                      boxShadow: `0 20px 40px ${colors.primary}22`,
                      '& .sauce-bottle': {
                        transform: 'rotate(-10deg) scale(1.1)',
                      },
                      '& .personality-text': {
                        color: colors.secondary,
                        transform: 'translateX(5px)'
                      }
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    {/* Shimmer effect on hover */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)"
                      backgroundSize="1000px 100%"
                      animation={`${shimmer} 2s linear infinite`}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                      pointerEvents="none"
                    />

                    {/* Sauce Bottle Image */}
                    <Box
                      position="absolute"
                      top="-30px"
                      right="-30px"
                      width="140px"
                      height="140px"
                      className="sauce-bottle"
                      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                      animation={`${float} 4s ease-in-out infinite ${idx * 0.2}s`}
                    >
                      <Image
                        src={sauce.image}
                        alt={sauce.name}
                        width="100%"
                        height="100%"
                        objectFit="contain"
                        opacity={0.15}
                        _groupHover={{ opacity: 0.25 }}
                        transition="opacity 0.3s"
                      />
                    </Box>

                    <VStack align="start" spacing={4} position="relative">
                      {/* Header with spice level */}
                      <HStack justify="space-between" width="100%">
                        <Heading 
                          size="lg" 
                          color={colors.primary} 
                          fontWeight="700"
                          letterSpacing="-0.02em"
                        >
                          {sauce.name}
                        </Heading>
                        {sauce.spicyLevel && (
                          <HStack spacing={1}>
                            {[...Array(sauce.spicyLevel)].map((_, i) => (
                              <Icon 
                                key={i} 
                                as={HiFire} 
                                color="#FF1744" 
                                boxSize={5}
                                animation={`${pulse} 1s ease-in-out infinite ${i * 0.1}s`}
                              />
                            ))}
                          </HStack>
                        )}
                      </HStack>
                      
                      {/* Description */}
                      <Text fontSize="md" color="white" fontWeight="500">
                        {sauce.description}
                      </Text>
                      
                      {/* Ingredients */}
                      <Text fontSize="sm" color="gray.400" fontStyle="italic">
                        {sauce.details}
                      </Text>
                      
                      {/* Personality */}
                      <Box 
                        pt={2} 
                        borderTop="1px solid" 
                        borderColor="whiteAlpha.100" 
                        width="100%"
                      >
                        <Text 
                          fontSize="sm" 
                          color={colors.secondary} 
                          fontWeight="600"
                          className="personality-text"
                          transition="all 0.3s"
                        >
                          {sauce.personality.split('–')[0]}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {sauce.personality.split('–')[1]}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </HStack>
          </Box>
        </Box>

        {/* Mobile scroll indicator */}
        {isMobile && (
          <Text 
            fontSize="xs" 
            color="gray.500" 
            textAlign="center"
            fontStyle="italic"
          >
            Swipe to explore all sauces →
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default SauceShowcase;
