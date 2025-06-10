import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiAward, FiCode, FiUsers, FiTrendingUp, FiArrowRight, FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const CertificationProgram = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: FiCode,
      title: 'Real Project Experience',
      description: 'Work on live client projects in development and staging environments',
      color: 'brand.primary',
      glow: 'cyan'
    },
    {
      icon: FiUsers,
      title: 'Mentorship & Collaboration',
      description: 'Learn directly from our core team in a hands-on, collaborative setting',
      color: 'accent.neon',
      glow: 'neon'
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Acceleration',
      description: 'Level up your coding skills with cutting-edge tech and best practices',
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      icon: FiAward,
      title: 'Burro Certification',
      description: 'Earn your official "Visiting Burro" certification and join our network',
      color: 'accent.purple',
      glow: 'purple'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Enhanced background gradients */}
      <Box
        position="absolute"
        top="30%"
        left="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="accent.neon"
        filter="blur(150px)"
        opacity={0.03}
      />
      <Box
        position="absolute"
        bottom="20%"
        right="15%"
        width="350px"
        height="350px"
        borderRadius="full"
        bg="accent.banana"
        filter="blur(130px)"
        opacity={0.03}
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack
                spacing={2}
                px={{ base: 3, md: 4 }}
                py={{ base: 1.5, md: 2 }}
                borderRadius="full"
                bg="accent.neonAlpha.20"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="accent.neonAlpha.30"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                letterSpacing="0.05em"
                boxShadow="0 0 20px var(--chakra-colors-accent-neon)22"
              >
                <FiZap size={14} color="var(--chakra-colors-accent-neon)" />
                <Text color="accent.neon">NOW ACCEPTING APPLICATIONS</Text>
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="white"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Become a
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, accent.neon, accent.banana)"
                  bgClip="text"
                  mt={1}
                >
                  Visiting Burro
                </Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="text.secondary"
                maxW="700px"
                lineHeight="relaxed"
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
            maxW="1000px"
            mx="auto"
          >
            {benefits.map((benefit, index) => (
              <MotionBox
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255,255,255,0.08)"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  role="group"
                  cursor="pointer"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: benefit.color,
                    bg: 'rgba(255,255,255,0.04)',
                    boxShadow: `0 20px 40px ${benefit.color}22`,
                    '& .benefit-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      bg: `${benefit.color}22`
                    },
                    '& .benefit-glow': {
                      opacity: 1
                    }
                  }}
                >
                  {/* Dynamic glow effect */}
                  <Box
                    className="benefit-glow"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="150%"
                    height="150%"
                    bg={`radial-gradient(circle, ${benefit.color}15 0%, transparent 70%)`}
                    opacity={0}
                    transition="opacity 0.5s"
                    pointerEvents="none"
                  />

                  <HStack spacing={4} align="start" position="relative">
                    <Box
                      className="benefit-icon"
                      p={3}
                      borderRadius="xl"
                      bg={`${benefit.color}11`}
                      color={benefit.color}
                      flexShrink={0}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      <benefit.icon size={24} />
                    </Box>
                    <VStack align="start" spacing={2}>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="semibold"
                      >
                        {benefit.title}
                      </Heading>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="relaxed"
                      >
                        {benefit.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <VStack spacing={6}>
              <Box
                px={{ base: 5, md: 6 }}
                py={{ base: 3, md: 4 }}
                borderRadius="xl"
                bg="rgba(255, 229, 0, 0.03)"
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor="rgba(255, 229, 0, 0.2)"
                transition="all 0.3s"
                _hover={{
                  borderColor: 'accent.banana',
                  boxShadow: '0 10px 30px rgba(255, 229, 0, 0.15)'
                }}
              >
                <Text 
                  color="text.primary" 
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                >
                  Ready to level up your skills in paradise?
                </Text>
              </Box>
              
              <Button
                size="lg"
                px={{ base: 8, md: 10 }}
                py={7}
                bg="accent.banana"
                color="dark.black"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
                borderRadius="full"
                rightIcon={<FiArrowRight />}
                onClick={() => navigate('/apply-to-burro/')}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  bg: 'accent.bananaLight',
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(255, 229, 0, 0.3)'
                }}
                _active={{
                  transform: 'translateY(0) scale(0.98)'
                }}
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