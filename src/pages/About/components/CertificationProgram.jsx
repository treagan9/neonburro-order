import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiAward, FiCode, FiUsers, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const CertificationProgram = () => {
  const navigate = useNavigate();
  
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const benefits = [
    {
      icon: FiCode,
      title: 'Real Project Experience',
      description: 'Work on live client projects in development and staging environments',
      color: colors.brand.primary
    },
    {
      icon: FiUsers,
      title: 'Mentorship & Collaboration',
      description: 'Learn directly from our core team in a hands-on, collaborative setting',
      color: colors.accent.neon
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Acceleration',
      description: 'Level up your coding skills with cutting-edge tech and best practices',
      color: colors.accent.warm
    },
    {
      icon: FiAward,
      title: 'Burro Certification',
      description: 'Earn your official "Visiting Burro" certification and join our network',
      color: colors.brand.primary
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative" overflow="hidden">
      {/* Background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="150%"
        height="150%"
        opacity={0.03}
        bgGradient={`radial(circle at center, ${colors.accent.neon} 0%, transparent 60%)`}
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge
                bg={colors.accent.neon}
                color={colors.dark.black}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
              >
                Now Accepting Applications
              </Badge>
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
                Become a Visiting Burro
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
                maxW="700px"
              >
                Join our adventure retreat for talented developers. Work on real projects, 
                learn from the best, and experience the perfect blend of coding and Colorado living.
              </Text>
            </MotionBox>
          </VStack>

          {/* Benefits Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {benefits.map((benefit, index) => (
              <MotionBox
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
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
                  _hover={{
                    borderColor: benefit.color,
                    boxShadow: `0 20px 40px ${benefit.color}22`
                  }}
                  transition="all 0.3s"
                >
                  <HStack spacing={4} align="start">
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`${benefit.color}22`}
                      color={benefit.color}
                      flexShrink={0}
                    >
                      <benefit.icon size={24} />
                    </Box>
                    <VStack align="start" spacing={2}>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="600"
                      >
                        {benefit.title}
                      </Heading>
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        lineHeight="1.6"
                      >
                        {benefit.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Text color="gray.300" fontSize="lg">
                Ready to level up your skills in paradise?
              </Text>
              <Button
                size="lg"
                px={10}
                py={7}
                bg={colors.accent.neon}
                color={colors.dark.black}
                fontSize="md"
                fontWeight="600"
                borderRadius="full"
                rightIcon={<FiArrowRight />}
                onClick={() => navigate('/contact')}
                _hover={{
                  bg: colors.accent.neon,
                  transform: 'scale(1.05)',
                  boxShadow: `0 20px 40px ${colors.accent.neon}44`
                }}
                transition="all 0.3s"
              >
                Apply to Visit
              </Button>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default CertificationProgram;
