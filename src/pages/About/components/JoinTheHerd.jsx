import { Box, Container, Heading, Text, VStack, HStack, Button, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers, FiMapPin, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const JoinTheHerd = () => {
  const navigate = useNavigate();
  
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const opportunities = [
    {
      type: 'Full-Time Burro',
      description: 'Join our core team and help shape the future of digital experiences',
      icon: FiUsers,
      color: colors.brand.primary,
      cta: 'View Open Positions'
    },
    {
      type: 'Visiting Burro',
      description: 'Level up your skills with our certification program',
      icon: FiMapPin,
      color: colors.accent.neon,
      cta: 'Apply to Visit'
    },
    {
      type: 'Project Partner',
      description: 'Have a wild idea? Let\'s build something extraordinary together',
      icon: FiHeart,
      color: colors.accent.warm,
      cta: 'Start a Project'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative">
      <Container maxW="1200px" px={{ base: 6, md: 8 }}>
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color={colors.brand.primary}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Ready to Ride?
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Join the Herd
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                maxW="600px"
              >
                Whether you're looking to join our team, visit the ranch, or build something 
                amazing—there's a place for you in the collective.
              </Text>
            </MotionBox>
          </VStack>

          {/* Opportunities Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {opportunities.map((opp, index) => (
              <MotionBox
                key={opp.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  _hover={{
                    borderColor: opp.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${opp.color}22`
                  }}
                  transition="all 0.3s"
                >
                  <VStack spacing={6} align="center" textAlign="center" flex={1}>
                    <Box
                      p={4}
                      borderRadius="full"
                      bg={`${opp.color}22`}
                      color={opp.color}
                    >
                      <opp.icon size={32} />
                    </Box>
                    
                    <VStack spacing={3}>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="600"
                      >
                        {opp.type}
                      </Heading>
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        lineHeight="1.6"
                      >
                        {opp.description}
                      </Text>
                    </VStack>

                    <Button
                      size="md"
                      bg="transparent"
                      color={opp.color}
                      border="2px solid"
                      borderColor={opp.color}
                      borderRadius="full"
                      px={6}
                      fontWeight="600"
                      rightIcon={<FiArrowRight />}
                      onClick={() => navigate('/contact')}
                      _hover={{
                        bg: opp.color,
                        color: colors.dark.black,
                        transform: 'scale(1.05)'
                      }}
                      transition="all 0.3s"
                      mt="auto"
                    >
                      {opp.cta}
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Final CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
            pt={8}
          >
            <Text
              fontSize="2xl"
              color="white"
              fontWeight="600"
              mb={2}
            >
              Ready to saddle up?
            </Text>
            <Text
              color="gray.400"
              fontSize="lg"
            >
              The future of web development is being written at 7,200 feet.
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default JoinTheHerd;
