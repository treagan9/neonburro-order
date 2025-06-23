// src/pages/Invoice/components/ProjectDetailsForm.jsx
import { 
  Box, 
  VStack, 
  Input, 
  Button, 
  Text, 
  Heading, 
  HStack, 
  InputGroup, 
  InputLeftElement, 
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
  Fade,
  ScaleFade,
  Checkbox  // ADD THIS IMPORT
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  FiUser, 
  FiFolder, 
  FiZap, 
  FiTrendingUp, 
  FiAward, 
  FiStar,
  FiClock,
  FiArrowRight,
  FiCheck,
  FiLayers,
  FiPackage
} from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { RiSparklingLine, RiFireLine, RiStarLine } from 'react-icons/ri';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const ProjectDetailsForm = ({ onContinue }) => {
  const [firstName, setFirstName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [hours, setHours] = useState('');
  const [isCustomHours, setIsCustomHours] = useState(false);
  const [clientType, setClientType] = useState(''); // 'existing' or 'new'
  const [selectedPackage, setSelectedPackage] = useState('');
  const [wantsHostingDetails, setWantsHostingDetails] = useState(false);
  
  const hourlyRate = 33;
  const total = selectedPackage ? 
    (selectedPackage === 'spark' ? 499 : selectedPackage === 'ignite' ? 999 : 2499) :
    (hours ? parseInt(hours) * hourlyRate : 0);

  // Hour packages with professional icons
  const hourPackages = [
    { 
      value: '10', 
      label: '10 hours', 
      price: 330, 
      subtitle: 'Quick wins',
      icon: FiZap,
      description: 'Perfect for small updates and fixes'
    },
    { 
      value: '25', 
      label: '25 hours', 
      price: 825, 
      subtitle: 'Solid progress',
      icon: FiTrendingUp,
      description: 'Great for feature development'
    },
    { 
      value: '40', 
      label: '40 hours', 
      price: 1320, 
      subtitle: 'Major milestone',
      icon: FiAward,
      description: 'Complete module or section'
    },
    { 
      value: '80', 
      label: '80 hours', 
      price: 2640, 
      subtitle: 'Full transformation',
      icon: FiStar,
      description: 'Comprehensive project phase'
    }
  ];

  // Service packages
  const servicePackages = [
    {
      id: 'spark',
      name: 'Spark',
      tagline: 'STARTUPS & SMALL BUSINESSES',
      price: 499,
      description: 'Everything you need to shine online',
      icon: RiSparklingLine,
      color: '#00FFFF',
      gradient: 'linear(to-br, cyan.400, blue.500)',
      features: [
        'Blazing fast, fully hosted website',
        'Custom design that captures your vision',
        'AI-powered search built in',
        'SEO optimized from day one',
        'Mobile-first responsive design',
        'Lifetime support & updates'
      ],
      vibe: 'Perfect scope to get you launched'
    },
    {
      id: 'ignite',
      name: 'Ignite',
      tagline: 'GROWING BUSINESSES',
      price: 999,
      badge: 'MOST POPULAR',
      description: 'Your digital presence, supercharged',
      icon: RiFireLine,
      color: '#FF6B35',
      gradient: 'linear(to-br, orange.400, red.500)',
      features: [
        'Everything in Spark, plus:',
        'Advanced integrations & analytics',
        'Content management system',
        'Social media connections',
        'Performance optimization',
        'Priority support queue'
      ],
      vibe: 'Extra fuel for ambitious growth'
    },
    {
      id: 'burro',
      name: 'Burro',
      tagline: 'AMBITIOUS BRANDS',
      price: 2499,
      description: 'The complete digital transformation',
      icon: RiStarLine,
      color: '#FFD700',
      gradient: 'linear(to-br, yellow.400, orange.400)',
      features: [
        'Everything in Ignite, plus:',
        'Custom functionality & features',
        'E-commerce capabilities',
        'Multi-language support',
        'Advanced automation',
        'White-glove service'
      ],
      vibe: 'Unlimited possibilities, zero limits'
    }
  ];

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  const handleHourSelection = (pkg) => {
    setHours(pkg.value);
    setIsCustomHours(false);
    setSelectedPackage('');
  };

  const handleCustomHours = (value) => {
    setHours(value);
    setIsCustomHours(true);
    setSelectedPackage('');
  };

  const handlePackageSelection = (pkg) => {
    setSelectedPackage(pkg);
    setHours('');
    setIsCustomHours(false);
  };

  const handleSubmit = () => {
    if (!firstName || !projectName || (!hours && !selectedPackage)) return;
    
    const data = {
      firstName,
      projectName,
      total
    };

    if (selectedPackage) {
      const pkg = servicePackages.find(p => p.id === selectedPackage);
      data.packageType = pkg.name;
      data.packageName = pkg.name;
      data.isServicePackage = true;
      data.wantsHostingDetails = wantsHostingDetails;
    } else {
      data.hours = hours;
      data.isServicePackage = false;
    }

    onContinue(data);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={{ base: 6, md: 8 }}>
        {/* Header */}
        <VStack spacing={3} textAlign="center">
          <Heading 
            size={{ base: "xl", md: "2xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            Let's Get Started
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
            Tell us about your project
          </Text>
        </VStack>

        {/* Main Form Card */}
        <Box
          width="100%"
          maxW="800px"
          mx="auto"
          p={{ base: 6, md: 8 }}
          bg="rgba(10, 10, 10, 0.8)"
          backdropFilter="blur(20px)"
          border="1.5px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(0,0,0,0.4)"
          position="relative"
          overflow="hidden"
        >
          <MotionVStack
            spacing={6}
            position="relative"
            initial="hidden"
            animate="visible"
          >
            {/* First Name Input */}
            <MotionBox width="100%" custom={1} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                FIRST NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={firstName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiUser size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Project Name Input */}
            <MotionBox width="100%" custom={2} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                PROJECT NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={projectName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiFolder size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My Amazing Website"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Client Type Selection */}
            {firstName && projectName && !clientType && (
              <ScaleFade in={true} initialScale={0.9}>
                <MotionBox width="100%" custom={3} variants={inputVariants}>
                  <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={4} fontWeight="600" textAlign="center">
                    CHOOSE YOUR PATH
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box
                      p={6}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      bg="rgba(255, 255, 255, 0.03)"
                      cursor="pointer"
                      transition="all 0.3s"
                      onClick={() => setClientType('existing')}
                      _hover={{ 
                        borderColor: colors.brand.primary,
                        bg: 'rgba(0, 255, 255, 0.05)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 30px rgba(0,255,255,0.2)'
                      }}
                    >
                      <VStack spacing={3}>
                        <Box color={colors.brand.primary}>
                          <FiClock size={32} />
                        </Box>
                        <Text color="white" fontSize="lg" fontWeight="700">
                          I'm extending my project
                        </Text>
                        <Text color="gray.400" fontSize="sm" textAlign="center">
                          Add development hours to continue our momentum
                        </Text>
                      </VStack>
                    </Box>

                    <Box
                      p={6}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      bg="rgba(255, 255, 255, 0.03)"
                      cursor="pointer"
                      transition="all 0.3s"
                      onClick={() => setClientType('new')}
                      _hover={{ 
                        borderColor: colors.accent.green,
                        bg: 'rgba(57, 255, 20, 0.05)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 30px rgba(57,255,20,0.2)'
                      }}
                    >
                      <VStack spacing={3}>
                        <Box color={colors.accent.green}>
                          <IoRocketOutline size={32} />
                        </Box>
                        <Text color="white" fontSize="lg" fontWeight="700">
                          I'm ready to build
                        </Text>
                        <Text color="gray.400" fontSize="sm" textAlign="center">
                          Start fresh with a complete service package
                        </Text>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </MotionBox>
              </ScaleFade>
            )}

            {/* Hour Selection for Existing Clients */}
            <AnimatePresence>
              {clientType === 'existing' && (
                <Fade in={true}>
                  <MotionBox width="100%" custom={4} variants={inputVariants}>
                    <HStack justify="space-between" align="center" mb={4}>
                      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                        SELECT DEVELOPMENT HOURS
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="gray.500"
                        onClick={() => setClientType('')}
                        _hover={{ color: 'white' }}
                      >
                        Change
                      </Button>
                    </HStack>
                    
                    {/* Hour Packages */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
                      {hourPackages.map((pkg) => {
                        const Icon = pkg.icon;
                        return (
                          <Box
                            key={pkg.value}
                            p={5}
                            borderRadius="xl"
                            border="2px solid"
                            borderColor={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'whiteAlpha.200'}
                            bg={hours === pkg.value && !isCustomHours ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                            cursor="pointer"
                            transition="all 0.3s"
                            onClick={() => handleHourSelection(pkg)}
                            _hover={{ 
                              borderColor: colors.brand.primary,
                              bg: 'rgba(0, 255, 255, 0.03)',
                              transform: 'translateY(-2px)'
                            }}
                            position="relative"
                          >
                            <HStack spacing={4} align="start">
                              <Box 
                                color={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'gray.400'}
                                transition="color 0.2s"
                              >
                                <Icon size={24} />
                              </Box>
                              <VStack align="start" spacing={1} flex={1}>
                                <Text 
                                  color={hours === pkg.value && !isCustomHours ? 'white' : 'gray.300'}
                                  fontWeight="700"
                                  fontSize="lg"
                                >
                                  {pkg.label}
                                </Text>
                                <Text color="gray.500" fontSize="xs">
                                  {pkg.subtitle}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  {pkg.description}
                                </Text>
                                <Text 
                                  color={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'gray.400'}
                                  fontSize="2xl"
                                  fontWeight="800"
                                  mt={2}
                                >
                                  ${pkg.price.toLocaleString()}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        );
                      })}
                    </SimpleGrid>

                    {/* Custom Hours */}
                    <Box
                      p={5}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={isCustomHours ? colors.brand.primary : 'whiteAlpha.200'}
                      bg={isCustomHours ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    >
                      <VStack spacing={3} align="stretch">
                        <HStack>
                          <Box color={isCustomHours ? colors.brand.primary : 'gray.400'}>
                            <FiPackage size={20} />
                          </Box>
                          <Text color="gray.300" fontSize="sm" fontWeight="600">
                            CUSTOM HOURS PACKAGE
                          </Text>
                        </HStack>
                        <HStack spacing={3}>
                          <Input
                            type="number"
                            placeholder="Enter hours"
                            value={isCustomHours ? hours : ''}
                            onChange={(e) => handleCustomHours(e.target.value)}
                            bg="rgba(255, 255, 255, 0.03)"
                            border="1.5px solid"
                            borderColor="whiteAlpha.200"
                            color="white"
                            textAlign="center"
                            fontSize="lg"
                            fontWeight="600"
                            _placeholder={{ color: 'gray.600' }}
                            _hover={{ borderColor: 'whiteAlpha.300' }}
                            _focus={{ 
                              borderColor: colors.brand.primary, 
                              boxShadow: `0 0 0 1px ${colors.brand.primary}`
                            }}
                            borderRadius="lg"
                            min={1}
                            max={200}
                          />
                          <Text color="gray.400" fontSize="sm" whiteSpace="nowrap">
                            × ${hourlyRate}/hour
                          </Text>
                        </HStack>
                        {isCustomHours && hours && (
                          <Text color={colors.brand.primary} fontSize="xl" fontWeight="700" textAlign="center">
                            ${(parseInt(hours) * hourlyRate).toLocaleString()}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </MotionBox>
                </Fade>
              )}
            </AnimatePresence>

            {/* Service Packages for New Clients */}
            <AnimatePresence>
              {clientType === 'new' && (
                <Fade in={true}>
                  <MotionBox width="100%" custom={4} variants={inputVariants}>
                    <HStack justify="space-between" align="center" mb={4}>
                      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                        SELECT YOUR SERVICE PACKAGE
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="gray.500"
                        onClick={() => setClientType('')}
                        _hover={{ color: 'white' }}
                      >
                        Change
                      </Button>
                    </HStack>

                    <VStack spacing={6}>
                      {servicePackages.map((pkg) => {
                        const Icon = pkg.icon;
                        const isSelected = selectedPackage === pkg.id;
                        
                        return (
                          <Box
                            key={pkg.id}
                            p={6}
                            borderRadius="xl"
                            border="3px solid"
                            borderColor={isSelected ? pkg.color : 'whiteAlpha.200'}
                            bg={isSelected ? `${pkg.color}11` : 'rgba(255, 255, 255, 0.03)'}
                            cursor="pointer"
                            transition="all 0.3s"
                            onClick={() => handlePackageSelection(pkg.id)}
                            position="relative"
                            overflow="hidden"
                            _hover={{ 
                              borderColor: pkg.color,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 10px 30px ${pkg.color}44`
                            }}
                            width="100%"
                          >
                            {pkg.badge && (
                              <Badge
                                position="absolute"
                                top={4}
                                right={4}
                                bg={pkg.color}
                                color="black"
                                fontSize="xs"
                                fontWeight="800"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                {pkg.badge}
                              </Badge>
                            )}

                            <VStack align="stretch" spacing={4}>
                              <HStack>
                                <Box 
                                  p={3}
                                  borderRadius="lg"
                                  bgGradient={pkg.gradient}
                                  color="white"
                                >
                                  <Icon size={24} />
                                </Box>
                                <VStack align="start" spacing={0}>
                                  <Text color="white" fontSize="2xl" fontWeight="800">
                                    {pkg.name}
                                  </Text>
                                  <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider">
                                    {pkg.tagline}
                                  </Text>
                                </VStack>
                              </HStack>

                              <Text color="gray.300" fontSize="sm">
                                {pkg.description}
                              </Text>

                              <Box 
                                p={3} 
                                bg="rgba(255,255,255,0.05)" 
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                              >
                                <VStack spacing={2}>
                                  <HStack justify="space-between" width="100%">
                                    <Text color="gray.400" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                                      Investment
                                    </Text>
                                    <Text 
                                      color={isSelected ? pkg.color : 'white'}
                                      fontSize="3xl"
                                      fontWeight="800"
                                    >
                                      ${pkg.price.toLocaleString()}
                                    </Text>
                                  </HStack>
                                  <Text 
                                    color={pkg.color} 
                                    fontSize="sm" 
                                    fontStyle="italic"
                                    textAlign="center"
                                    width="100%"
                                  >
                                    {pkg.vibe}
                                  </Text>
                                </VStack>
                              </Box>

                              <Box>
                                <Text color="gray.400" fontSize="xs" mb={2} fontWeight="600">
                                  WHAT'S INCLUDED:
                                </Text>
                                <List spacing={2}>
                                  {pkg.features.slice(0, 4).map((feature, idx) => (
                                    <ListItem key={idx} fontSize="sm" color="gray.300">
                                      <ListIcon as={FiCheck} color={pkg.color} />
                                      {feature}
                                    </ListItem>
                                  ))}
                                  {pkg.features.length > 4 && (
                                    <Text fontSize="xs" color="gray.500" ml={6}>
                                      + {pkg.features.length - 4} more features
                                    </Text>
                                  )}
                                </List>
                              </Box>
                            </VStack>
                          </Box>
                        );
                      })}
                    </VStack>

                    {/* Hosting & Support Checkbox */}
                    {selectedPackage && (
                      <Box
                        mt={6}
                        p={5}
                        bg="rgba(57, 255, 20, 0.05)"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor={wantsHostingDetails ? colors.accent.green : 'whiteAlpha.200'}
                        transition="all 0.3s"
                      >
                        <VStack align="start" spacing={3}>
                          <Text color="gray.300" fontSize="xs" fontWeight="600" letterSpacing="wider">
                            INCLUDED WITH EVERY PACKAGE
                          </Text>
                          <List spacing={2}>
                            <ListItem fontSize="sm" color="gray.300">
                              <ListIcon as={FiCheck} color={colors.accent.green} />
                              Blazing-fast global CDN for instant page loads
                            </ListItem>
                            <ListItem fontSize="sm" color="gray.300">
                              <ListIcon as={FiCheck} color={colors.accent.green} />
                              Git-powered CI/CD: deploy on every push, zero ops
                            </ListItem>
                            <ListItem fontSize="sm" color="gray.300">
                              <ListIcon as={FiCheck} color={colors.accent.green} />
                              Lifetime, VIP-level expert support & updates
                            </ListItem>
                          </List>
                          <Checkbox
                            isChecked={wantsHostingDetails}
                            onChange={(e) => setWantsHostingDetails(e.target.checked)}
                            colorScheme="green"
                            size="md"
                            width="100%"
                            sx={{
                              '.chakra-checkbox__control': {
                                borderColor: 'rgba(57, 255, 20, 0.5)',
                                _checked: {
                                  bg: colors.accent.green,
                                  borderColor: colors.accent.green,
                                }
                              }
                            }}
                          >
                            <Text color={wantsHostingDetails ? 'white' : 'gray.400'} fontSize="sm" fontWeight="600">
                              Yes! Send me the details on hosting & lifetime support
                            </Text>
                          </Checkbox>
                        </VStack>
                      </Box>
                    )}
                  </MotionBox>
                </Fade>
              )}
            </AnimatePresence>

            {/* Total Display */}
            <AnimatePresence>
              {(hours || selectedPackage) && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  width="100%"
                >
                  <Box
                    p={5}
                    bg="rgba(0, 255, 255, 0.05)"
                    borderRadius="xl"
                    border="2px solid"
                    borderColor={colors.brand.primary + '44'}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        {selectedPackage ? (
                          <>
                            <Text color="gray.400" fontSize="sm">
                              {servicePackages.find(p => p.id === selectedPackage).name} Package
                            </Text>
                            <Text color="white" fontSize="lg" fontWeight="600">
                              Total Investment
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text color="gray.400" fontSize="sm">
                              {hours} hours × ${hourlyRate}/hour
                            </Text>
                            <Text color="white" fontSize="lg" fontWeight="600">
                              Total Investment
                            </Text>
                          </>
                        )}
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text 
                          color={colors.brand.primary}
                          fontSize="3xl"
                          fontWeight="800" 
                          filter={`drop-shadow(0 0 10px ${colors.brand.primary}66)`}
                        >
                          ${total.toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Continue Button */}
            <Button
              onClick={handleSubmit}
              size="lg"
              bg={colors.brand.primary}
              color="black"
              width="100%"
              fontWeight="700"
              fontSize="md"
              height="56px"
              isDisabled={!firstName || !projectName || (!hours && !selectedPackage)}
              borderRadius="full"
              rightIcon={<FiArrowRight />}
              _hover={{
                bg: colors.brand.primary,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.brand.primary}66`
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              _disabled={{
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }}
              transition="all 0.2s"
            >
              Continue to Payment
            </Button>

            {/* Note about project details */}
            {(hours || selectedPackage) && (
              <Text color="gray.500" fontSize="xs" textAlign="center" fontStyle="italic">
                After payment, you'll receive a detailed project roadmap and timeline
              </Text>
            )}
          </MotionVStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default ProjectDetailsForm;