import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Input, 
  Textarea, 
  Button, 
  FormControl, 
  FormLabel,
  Grid,
  GridItem,
  Select,
  Icon,
  useToast,
  Progress,
  Badge,
  Collapse,
  IconButton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiGithub, 
  FiLinkedin, 
  FiGlobe,
  FiUpload,
  FiSend,
  FiCode,
  FiHeart,
  FiCoffee,
  FiCalendar,
  FiZap,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiLayout,
  FiServer,
  FiDatabase,
  FiSmartphone,
  FiTool,
  FiTrendingUp
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const ApplyForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
    experience: '',
    skills: [],
    whyBurro: '',
    funFact: '',
    availability: '',
    fileUpload: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [otherSkills, setOtherSkills] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const skillCategories = {
    'Frontend Development': {
      icon: FiLayout,
      color: 'brand.primary',
      skills: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Next.js', 'Tailwind CSS', 'Sass/SCSS', 'Redux', 'Webpack', 'Responsive Design']
    },
    'Backend Development': {
      icon: FiServer,
      color: 'accent.neon',
      skills: ['Node.js', 'Python', 'Java', 'Ruby', 'PHP', 'Go', 'C#', 'Express.js', 'Django', 'Spring Boot', 'GraphQL', 'REST APIs']
    },
    'Database & Cloud': {
      icon: FiDatabase,
      color: 'accent.banana',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
    },
    'Mobile Development': {
      icon: FiSmartphone,
      color: 'accent.purple',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Expo', 'Ionic']
    },
    'Design & Tools': {
      icon: FiTool,
      color: 'accent.warm',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Git', 'VS Code', 'Jira', 'UI/UX Design', 'Wireframing', 'Prototyping']
    },
    'Marketing & SEO': {
      icon: FiTrendingUp,
      color: 'brand.primaryLight',
      skills: ['Google Analytics', 'SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Email Marketing', 'Copywriting', 'A/B Testing']
    }
  };

  const experienceLevels = [
    'Junior (0-2 years)',
    'Mid-level (2-5 years)',
    'Senior (5+ years)',
    'Principal/Staff (10+ years)'
  ];

  const availabilityOptions = [
    'Immediately',
    'Within 2 weeks',
    'Within a month',
    '2-3 months',
    'Just exploring'
  ];

  const calculateProgress = () => {
    const fields = [
      formData.name,
      formData.email,
      formData.phone,
      formData.github || formData.linkedin || formData.portfolio,
      formData.experience,
      formData.skills.length > 0,
      formData.whyBurro,
      formData.availability
    ];
    const filled = fields.filter(Boolean).length;
    return (filled / fields.length) * 100;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTimeout(() => setProgress(calculateProgress()), 100);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    setTimeout(() => setProgress(calculateProgress()), 100);
  };

  const handleOtherSkillsSubmit = () => {
    if (otherSkills.trim()) {
      const newSkills = otherSkills.split(',').map(s => s.trim()).filter(s => s);
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, ...newSkills]
      }));
      setOtherSkills('');
      setShowOtherInput(false);
      setTimeout(() => setProgress(calculateProgress()), 100);
    }
  };

  // Netlify Forms compatible submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Encode form data for Netlify
    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    // Prepare form data
    const submissionData = {
      "form-name": "burro-application",
      "name": formData.name,
      "email": formData.email,
      "phone": formData.phone,
      "github": formData.github || '',
      "linkedin": formData.linkedin || '',
      "portfolio": formData.portfolio || '',
      "experience": formData.experience,
      "skills": formData.skills.join(', '), // Convert array to string
      "whyBurro": formData.whyBurro,
      "funFact": formData.funFact || '',
      "availability": formData.availability
    };

    try {
      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(submissionData)
      });

      if (response.ok) {
        toast({
          title: "Application Received!",
          description: "We'll review your application and get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          github: '',
          linkedin: '',
          portfolio: '',
          experience: '',
          skills: [],
          whyBurro: '',
          funFact: '',
          availability: '',
          fileUpload: null
        });
        setProgress(0);
        
        // Navigate after delay
        setTimeout(() => navigate('/'), 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Background effects */}
      <Box
        position="absolute"
        top="10%"
        right="10%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="accent.purple"
        filter="blur(150px)"
        opacity={0.02}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="5%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="accent.banana"
        filter="blur(150px)"
        opacity={0.02}
      />

      <Container maxW="1000px" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 8, md: 12 }}>
          {/* Form Header */}
          <VStack spacing={4} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack spacing={3}>
                <FiZap size={20} color="var(--chakra-colors-accent-banana)" />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Application Form
                </Text>
                <FiZap size={20} color="var(--chakra-colors-accent-banana)" />
              </HStack>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="text.secondary"
                maxW="600px"
              >
                This is where your journey begins. Tell us your story.
              </Text>
            </MotionBox>

            {/* Progress Bar */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              width="100%"
              maxW="400px"
            >
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color="text.muted">Progress</Text>
                <Text fontSize="sm" color="accent.banana" fontWeight="bold">{Math.round(progress)}%</Text>
              </HStack>
              <Progress 
                value={progress} 
                size="sm" 
                borderRadius="full"
                bg="whiteAlpha.100"
                sx={{
                  '& > div': {
                    background: 'linear-gradient(to-r, var(--chakra-colors-accent-neon), var(--chakra-colors-accent-banana))',
                    transition: 'width 0.5s ease'
                  }
                }}
              />
            </MotionBox>
          </VStack>

          {/* Main Form */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            as="form"
            onSubmit={handleSubmit}
            width="100%"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            bg="rgba(255, 255, 255, 0.02)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor="rgba(255, 255, 255, 0.08)"
            position="relative"
            overflow="hidden"
          >
            {/* Hidden field for Netlify Forms */}
            <input type="hidden" name="form-name" value="burro-application" />
            
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="200px"
              bgGradient="linear(to-b, accent.bananaAlpha.10, transparent)"
              opacity={0.3}
              pointerEvents="none"
            />

            <VStack spacing={8} position="relative">
              {/* Personal Info Section */}
              <VStack spacing={4} width="100%" align="start">
                <HStack spacing={2}>
                  <FiUser size={18} color="var(--chakra-colors-brand-primary)" />
                  <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                    Personal Information
                  </Text>
                </HStack>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} width="100%">
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color="text.secondary" fontSize="sm">Full Name</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'brand.primary', bg: 'rgba(255, 255, 255, 0.05)' }}
                        _focus={{ 
                          borderColor: 'brand.primary', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
                          bg: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color="text.secondary" fontSize="sm">Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'brand.primary', bg: 'rgba(255, 255, 255, 0.05)' }}
                        _focus={{ 
                          borderColor: 'brand.primary', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
                          bg: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color="text.secondary" fontSize="sm">Phone</FormLabel>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'brand.primary', bg: 'rgba(255, 255, 255, 0.05)' }}
                        _focus={{ 
                          borderColor: 'brand.primary', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
                          bg: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel color="text.secondary" fontSize="sm">Experience Level</FormLabel>
                      <Select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Select your level"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'brand.primary', bg: 'rgba(255, 255, 255, 0.05)' }}
                        _focus={{ 
                          borderColor: 'brand.primary', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
                          bg: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {experienceLevels.map(level => (
                          <option key={level} value={level} style={{ background: '#0A0A0A' }}>
                            {level}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
              </VStack>

              {/* Online Presence */}
              <VStack spacing={4} width="100%" align="start">
                <HStack spacing={2}>
                  <FiGlobe size={18} color="var(--chakra-colors-accent-banana)" />
                  <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                    Online Presence
                  </Text>
                  <Badge colorScheme="yellow" fontSize="2xs">At least one required</Badge>
                </HStack>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} width="100%">
                  <GridItem>
                    <FormControl>
                      <FormLabel color="text.secondary" fontSize="sm">
                        <HStack spacing={1}>
                          <FiGithub size={14} />
                          <Text>GitHub</Text>
                        </HStack>
                      </FormLabel>
                      <Input
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="github.com/username"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'accent.banana', bg: 'rgba(255, 229, 0, 0.05)' }}
                        _focus={{ 
                          borderColor: 'accent.banana', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                          bg: 'rgba(255, 229, 0, 0.05)'
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl>
                      <FormLabel color="text.secondary" fontSize="sm">
                        <HStack spacing={1}>
                          <FiLinkedin size={14} />
                          <Text>LinkedIn</Text>
                        </HStack>
                      </FormLabel>
                      <Input
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="linkedin.com/in/username"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'accent.banana', bg: 'rgba(255, 229, 0, 0.05)' }}
                        _focus={{ 
                          borderColor: 'accent.banana', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                          bg: 'rgba(255, 229, 0, 0.05)'
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  
                  <GridItem>
                    <FormControl>
                      <FormLabel color="text.secondary" fontSize="sm">
                        <HStack spacing={1}>
                          <FiGlobe size={14} />
                          <Text>Portfolio</Text>
                        </HStack>
                      </FormLabel>
                      <Input
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="yourwebsite.com"
                        bg="rgba(255, 255, 255, 0.03)"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ borderColor: 'accent.banana', bg: 'rgba(255, 229, 0, 0.05)' }}
                        _focus={{ 
                          borderColor: 'accent.banana', 
                          boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                          bg: 'rgba(255, 229, 0, 0.05)'
                        }}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </VStack>

              {/* Skills Section */}
              <VStack spacing={4} width="100%" align="start">
                <HStack spacing={2}>
                  <FiCode size={18} color="var(--chakra-colors-accent-neon)" />
                  <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                    Your Skills
                  </Text>
                  <Text color="text.muted" fontSize="xs">Click categories to expand</Text>
                </HStack>
                
                {/* Selected Skills Display */}
                {formData.skills.length > 0 && (
                  <Box width="100%" mb={2}>
                    <HStack spacing={2} flexWrap="wrap">
                      {formData.skills.map(skill => (
                        <Badge
                          key={skill}
                          px={3}
                          py={1}
                          borderRadius="full"
                          bg="accent.neonAlpha.20"
                          color="accent.neon"
                          fontSize="xs"
                          cursor="pointer"
                          onClick={() => handleSkillToggle(skill)}
                          position="relative"
                          pr={8}
                          _hover={{ bg: 'accent.neonAlpha.30' }}
                        >
                          {skill}
                          <Text
                            as="span"
                            position="absolute"
                            right={2}
                            top="50%"
                            transform="translateY(-50%)"
                            fontSize="md"
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                          >
                            ×
                          </Text>
                        </Badge>
                      ))}
                    </HStack>
                    <Text fontSize="xs" color="text.muted" mt={2}>
                      {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''} selected (click to remove)
                    </Text>
                  </Box>
                )}
                
                {/* Skill Categories */}
                <VStack width="100%" spacing={3}>
                  {Object.entries(skillCategories).map(([category, { icon: IconComponent, color, skills }]) => (
                    <Box
                      key={category}
                      width="100%"
                      borderRadius="xl"
                      bg="rgba(255, 255, 255, 0.02)"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      overflow="hidden"
                      transition="all 0.3s"
                      _hover={{ borderColor: color }}
                    >
                      <HStack
                        p={4}
                        cursor="pointer"
                        onClick={() => toggleCategory(category)}
                        justify="space-between"
                        _hover={{ bg: 'rgba(255, 255, 255, 0.03)' }}
                      >
                        <HStack spacing={3}>
                          <Icon as={IconComponent} boxSize={5} color={color} />
                          <Box>
                            <Text color="text.primary" fontWeight="medium">{category}</Text>
                            <Text color="text.muted" fontSize="xs">
                              {skills.filter(s => formData.skills.includes(s)).length} of {skills.length} selected
                            </Text>
                          </Box>
                        </HStack>
                        <IconButton
                          icon={expandedCategories.includes(category) ? <FiChevronUp /> : <FiChevronDown />}
                          variant="ghost"
                          size="sm"
                          color={color}
                          aria-label="Toggle category"
                        />
                      </HStack>
                      
                      <Collapse in={expandedCategories.includes(category)} animateOpacity>
                        <Box p={4} pt={0}>
                          <Grid templateColumns="repeat(auto-fill, minmax(140px, 1fr))" gap={2}>
                            {skills.map(skill => (
                              <Box
                                key={skill}
                                as="button"
                                type="button"
                                px={3}
                                py={2}
                                borderRadius="lg"
                                bg={formData.skills.includes(skill) ? `${color}22` : 'rgba(255, 255, 255, 0.03)'}
                                border="1px solid"
                                borderColor={formData.skills.includes(skill) ? color : 'whiteAlpha.200'}
                                color={formData.skills.includes(skill) ? color : 'text.secondary'}
                                fontSize="sm"
                                fontWeight="medium"
                                onClick={() => handleSkillToggle(skill)}
                                transition="all 0.2s"
                                _hover={{
                                  borderColor: color,
                                  transform: 'translateY(-1px)',
                                  bg: formData.skills.includes(skill) ? `${color}33` : 'rgba(255, 255, 255, 0.05)'
                                }}
                              >
                                {skill}
                              </Box>
                            ))}
                          </Grid>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                  
                  {/* Other Skills Option */}
                  <Box
                    width="100%"
                    borderRadius="xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    overflow="hidden"
                    transition="all 0.3s"
                    _hover={{ borderColor: 'accent.purple' }}
                  >
                    <HStack
                      p={4}
                      cursor="pointer"
                      onClick={() => setShowOtherInput(!showOtherInput)}
                      justify="space-between"
                      _hover={{ bg: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <HStack spacing={3}>
                        <Icon as={FiPlus} boxSize={5} color="accent.purple" />
                        <Box>
                          <Text color="text.primary" fontWeight="medium">Other Skills</Text>
                          <Text color="text.muted" fontSize="xs">
                            Add skills not listed above
                          </Text>
                        </Box>
                      </HStack>
                      <IconButton
                        icon={showOtherInput ? <FiChevronUp /> : <FiPlus />}
                        variant="ghost"
                        size="sm"
                        color="accent.purple"
                        aria-label="Add other skills"
                      />
                    </HStack>
                    
                    <Collapse in={showOtherInput} animateOpacity>
                      <Box p={4} pt={0}>
                        <VStack spacing={3} align="stretch">
                          <Input
                            value={otherSkills}
                            onChange={(e) => setOtherSkills(e.target.value)}
                            placeholder="Type your skills separated by commas (e.g., Rust, Elixir, WebAssembly)"
                            bg="rgba(255, 255, 255, 0.03)"
                            border="1px solid"
                            borderColor="whiteAlpha.200"
                            borderRadius="lg"
                            _hover={{ borderColor: 'accent.purple', bg: 'rgba(139, 92, 246, 0.02)' }}
                            _focus={{ 
                              borderColor: 'accent.purple', 
                              boxShadow: '0 0 0 1px var(--chakra-colors-accent-purple)',
                              bg: 'rgba(139, 92, 246, 0.02)'
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleOtherSkillsSubmit();
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            borderColor="accent.purple"
                            color="accent.purple"
                            onClick={handleOtherSkillsSubmit}
                            _hover={{
                              bg: 'accent.purpleAlpha.20',
                              borderColor: 'accent.purple'
                            }}
                          >
                            Add Skills
                          </Button>
                        </VStack>
                      </Box>
                    </Collapse>
                  </Box>
                </VStack>
              </VStack>

              {/* Story Section */}
              <VStack spacing={4} width="100%" align="start">
                <HStack spacing={2}>
                  <FiHeart size={18} color="var(--chakra-colors-accent-warm)" />
                  <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                    Your Story
                  </Text>
                </HStack>
                
                <FormControl isRequired>
                  <FormLabel color="text.secondary" fontSize="sm">
                    Why do you want to become a Visiting Burro?
                  </FormLabel>
                  <Textarea
                    name="whyBurro"
                    value={formData.whyBurro}
                    onChange={handleInputChange}
                    placeholder="Tell us what excites you about this opportunity..."
                    rows={4}
                    resize="vertical"
                    bg="rgba(255, 255, 255, 0.03)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="lg"
                    _hover={{ borderColor: 'accent.warm', bg: 'rgba(255, 107, 0, 0.02)' }}
                    _focus={{ 
                      borderColor: 'accent.warm', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-warm)',
                      bg: 'rgba(255, 107, 0, 0.02)'
                    }}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color="text.secondary" fontSize="sm">
                    <HStack spacing={2}>
                      <FiCoffee size={14} />
                      <Text>Share something fun about yourself!</Text>
                      <Badge 
                        bg="accent.purpleAlpha.20" 
                        color="accent.purple"
                        fontSize="2xs"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                      >
                        Optional but encouraged
                      </Badge>
                    </HStack>
                  </FormLabel>
                  <Textarea
                    name="funFact"
                    value={formData.funFact}
                    onChange={handleInputChange}
                    placeholder="Hobbies, fun facts, or your favorite coding snack..."
                    rows={3}
                    resize="vertical"
                    bg="rgba(255, 255, 255, 0.03)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="lg"
                    _hover={{ borderColor: 'accent.purple', bg: 'rgba(139, 92, 246, 0.02)' }}
                    _focus={{ 
                      borderColor: 'accent.purple', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-purple)',
                      bg: 'rgba(139, 92, 246, 0.02)'
                    }}
                  />
                </FormControl>
              </VStack>

              {/* Availability */}
              <VStack spacing={4} width="100%" align="start">
                <HStack spacing={2}>
                  <FiCalendar size={18} color="var(--chakra-colors-brand-primary)" />
                  <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                    Availability
                  </Text>
                </HStack>
                
                <FormControl isRequired>
                  <FormLabel color="text.secondary" fontSize="sm">When could you start?</FormLabel>
                  <Select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    placeholder="Select availability"
                    bg="rgba(255, 255, 255, 0.03)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="lg"
                    _hover={{ borderColor: 'brand.primary', bg: 'rgba(255, 255, 255, 0.05)' }}
                    _focus={{ 
                      borderColor: 'brand.primary', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
                      bg: 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {availabilityOptions.map(option => (
                      <option key={option} value={option} style={{ background: '#0A0A0A' }}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>

              {/* Submit Button */}
              <VStack width="100%" align="center" spacing={4}>
                <Button
                  type="submit"
                  size="lg"
                  width={{ base: "100%", md: "auto" }}
                  px={12}
                  py={7}
                  bg="accent.banana"
                  color="dark.black"
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="full"
                  rightIcon={<FiSend />}
                  isLoading={isSubmitting}
                  loadingText="Sending your application..."
                  isDisabled={progress < 100}
                  opacity={progress < 100 ? 0.7 : 1}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    bg: 'accent.bananaLight',
                    transform: progress === 100 ? 'translateY(-2px) scale(1.02)' : 'none',
                    boxShadow: progress === 100 ? '0 20px 40px rgba(255, 229, 0, 0.3)' : 'none'
                  }}
                  _active={{
                    transform: 'translateY(0) scale(0.98)'
                  }}
                >
                  Submit Application
                </Button>
                
                {progress < 100 && (
                  <Text color="text.muted" fontSize="sm">
                    Complete all required fields to submit
                  </Text>
                )}
              </VStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ApplyForm;