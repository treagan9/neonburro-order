import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Badge,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Divider
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Careers = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Full Time Experienced Meat Smoker / Pit Master",
      department: "Kitchen",
      type: "Full Time",
      salary: "$22-28/hour",
      color: "#FF6B35",
      summary: "Lead our smoking operations and bring authentic BBQ mastery to Ridgway",
      fullDescription: {
        overview: "We're searching for a passionate Pit Master who lives and breathes BBQ. You'll be the guardian of our smokers, crafting perfectly smoked meats that define our GlowBachi experience. This isn't just about following recipes – it's about bringing soul to every brisket, magic to every rib, and consistency that keeps folks coming back.",
        responsibilities: [
          "Manage daily smoking operations starting at 4 AM (yes, the smoke waits for no one)",
          "Select, prep, and smoke premium cuts including brisket, ribeye, chicken, and salmon",
          "Maintain consistent quality across all smoked proteins",
          "Monitor wood selection and smoke profiles for optimal flavor",
          "Train kitchen staff on proper smoking techniques and timing",
          "Collaborate with chef on menu development and special items",
          "Maintain smoker equipment and ensure food safety standards",
          "Track inventory and communicate needs to management"
        ],
        requirements: [
          "3+ years professional smoking/BBQ experience (backyard warriors welcome if you've got the chops)",
          "Deep knowledge of different wood types and their flavor profiles",
          "Understanding of various smoking techniques and temperatures",
          "Ability to work independently in early morning hours",
          "Physical stamina – this job is hot, heavy, and hands-on",
          "Food handler's certification (or willingness to obtain)",
          "Passion for the craft and willingness to share knowledge",
          "Valid driver's license and reliable transportation"
        ],
        perks: [
          "Competitive hourly rate with experience-based increases",
          "Free shift meals (you'll never go hungry)",
          "Tips shared among kitchen staff",
          "Creative input on menu items and specials",
          "Flexible scheduling after training period",
          "Employee discounts for friends and family",
          "Work in Colorado's most beautiful mountain town",
          "Be part of building something special from the ground up"
        ]
      }
    },
    {
      id: 2,
      title: "Breakfast Crew Cook / Multitask Line Cook",
      department: "Kitchen",
      type: "Full Time",
      salary: "$18-22/hour",
      color: "#FFE135",
      summary: "Join our sunrise squad and help Ridgway wake up right",
      fullDescription: {
        overview: "Are you a morning person who thrives in a fast-paced kitchen? We need cooks who can juggle multiple stations, crack eggs with precision, and keep their cool when the breakfast rush hits. You'll be part of our Biscuit Shooter crew, serving up mountain comfort food that starts everyone's day on the right foot.",
        responsibilities: [
          "Work multiple stations including grill, fryer, and prep",
          "Execute breakfast menu items with speed and consistency",
          "Prep ingredients for daily service (mis en place is life)",
          "Maintain clean and organized work stations",
          "Communicate effectively with team during rush periods",
          "Follow recipes and plating guides to standard",
          "Assist with inventory and stock rotation",
          "Support teammates across all kitchen positions as needed"
        ],
        requirements: [
          "1+ years line cook experience (breakfast experience a huge plus)",
          "Ability to work efficiently in high-volume periods",
          "Strong knife skills and basic cooking techniques",
          "Team player mentality – we sink or swim together",
          "Early bird schedule availability (shifts start at 4:30 AM)",
          "Ability to stand for extended periods and lift up to 50 lbs",
          "Food handler's certification (or willingness to obtain)",
          "Positive attitude and sense of humor (mandatory at 4:30 AM)"
        ],
        perks: [
          "Competitive wages with regular performance reviews",
          "Tips on top of hourly wage",
          "Free shift meals and unlimited coffee",
          "Afternoons free (off by 2 PM most days)",
          "Learn from experienced chefs in a supportive environment",
          "Opportunities for advancement and cross-training",
          "Work with a fun, tight-knit crew",
          "Be home for dinner with your family"
        ]
      }
    },
    {
      id: 3,
      title: "Guest Experience Coordinator & Operations Shadow",
      department: "Front of House",
      type: "Full Time",
      salary: "$16-20/hour + tips",
      color: "#00D9FF",
      summary: "Be the face of our operation and learn the business inside out",
      fullDescription: {
        overview: "This isn't your average cashier gig. We're looking for someone who wants to master every aspect of food truck operations while creating memorable experiences for our guests. You'll handle orders, payments, and customer interactions while shadowing management to learn inventory, scheduling, and the business side of mobile food service.",
        responsibilities: [
          "Greet guests with genuine mountain hospitality",
          "Take orders accurately and suggest menu pairings",
          "Handle POS system and process payments smoothly",
          "Manage order flow communication with kitchen",
          "Resolve customer concerns with grace and creativity",
          "Shadow management on inventory ordering and tracking",
          "Assist with social media posts and customer engagement",
          "Learn scheduling, food cost, and operational procedures",
          "Support catering coordination and special events",
          "Maintain clean and welcoming service areas"
        ],
        requirements: [
          "Customer service experience with a natural warmth",
          "Interest in food service operations and management",
          "Tech-savvy with ability to learn new systems quickly",
          "Excellent communication and problem-solving skills",
          "Ability to stay calm and friendly during rush periods",
          "Basic math skills for handling cash and making change",
          "Flexibility to work various shifts including weekends",
          "Genuine interest in learning the business side",
          "Valid driver's license (for potential catering assists)"
        ],
        perks: [
          "Hourly wage plus tips (typically $25-30/hour total)",
          "Hands-on business operations training",
          "Clear path to management positions",
          "Free meals and drinks during shifts",
          "Flexible scheduling for work-life balance",
          "Learn directly from owners and managers",
          "Be part of menu development and tasting sessions",
          "Network with local business community",
          "Potential for profit sharing as you grow with us"
        ]
      }
    }
  ];

  const handleJobClick = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  return (
    <Box bg="dark.black" minH="100vh" pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              color="gray.400"
              onClick={() => navigate('/')}
              alignSelf="start"
            >
              Back to Menu
            </Button>
            
            <Heading size="2xl" color="white">
              Join Our Crew
            </Heading>
            <Text fontSize="xl" color="gray.300" maxW="600px">
              We're building something special in Ridgway. Come grow with us.
            </Text>
          </VStack>

          {/* Job Listings */}
          <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6} w="100%">
            {jobs.map((job, index) => (
              <MotionBox
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  p={6}
                  bg="whiteAlpha.50"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  cursor="pointer"
                  onClick={() => handleJobClick(job)}
                  _hover={{
                    borderColor: job.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${job.color}33`
                  }}
                  transition="all 0.3s"
                  h="100%"
                >
                  <VStack align="stretch" spacing={4} h="100%">
                    <HStack justify="space-between">
                      <Badge colorScheme="green" variant="subtle">
                        Now Hiring
                      </Badge>
                      <Badge bg={`${job.color}22`} color={job.color}>
                        {job.type}
                      </Badge>
                    </HStack>
                    
                    <VStack align="start" spacing={2} flex={1}>
                      <Heading size="md" color={job.color}>
                        {job.title}
                      </Heading>
                      <Text color="gray.300" fontSize="sm">
                        {job.summary}
                      </Text>
                    </VStack>
                    
                    <VStack align="start" spacing={2} pt={4}>
                      <HStack fontSize="sm" color="gray.400">
                        <Icon as={FiDollarSign} />
                        <Text>{job.salary}</Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.400">
                        <Icon as={FiMapPin} />
                        <Text>Ridgway, CO</Text>
                      </HStack>
                    </VStack>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      color={job.color}
                      borderColor={job.color}
                      _hover={{
                        bg: `${job.color}22`
                      }}
                    >
                      View Details
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Culture Section */}
          <Box
            w="100%"
            p={8}
            bg="linear-gradient(135deg, #00D9FF22 0%, #FFE13522 100%)"
            borderRadius="xl"
          >
            <VStack spacing={4} textAlign="center">
              <Heading size="lg" color="white">
                Why Work With Us?
              </Heading>
              <Text color="gray.300" maxW="600px">
                We're not just another food truck. We're building a culture of quality, creativity, 
                and community in the heart of Colorado's most beautiful mountain town.
              </Text>
              <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} w="100%" pt={4}>
                <GridItem>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="#FFE135">Real</Text>
                    <Text fontSize="sm" color="gray.400">Food & People</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="#FF6B35">Growth</Text>
                    <Text fontSize="sm" color="gray.400">Opportunities</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="#00D9FF">Mountain</Text>
                    <Text fontSize="sm" color="gray.400">Lifestyle</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="#FF1744">Team</Text>
                    <Text fontSize="sm" color="gray.400">Culture</Text>
                  </VStack>
                </GridItem>
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/* Job Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="dark.gray" border="1px solid" borderColor="whiteAlpha.200">
          <ModalHeader color="white">
            {selectedJob?.title}
            <Badge ml={3} bg={`${selectedJob?.color}22`} color={selectedJob?.color}>
              {selectedJob?.type}
            </Badge>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {selectedJob && (
              <VStack align="stretch" spacing={6}>
                <Box>
                  <Heading size="sm" color={selectedJob.color} mb={3}>
                    Overview
                  </Heading>
                  <Text color="gray.300">
                    {selectedJob.fullDescription.overview}
                  </Text>
                </Box>

                <Divider borderColor="whiteAlpha.200" />

                <Box>
                  <Heading size="sm" color={selectedJob.color} mb={3}>
                    What You'll Do
                  </Heading>
                  <VStack align="start" spacing={2}>
                    {selectedJob.fullDescription.responsibilities.map((resp, i) => (
                      <HStack key={i} align="start">
                        <Text color={selectedJob.color}>•</Text>
                        <Text fontSize="sm" color="gray.300">{resp}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider borderColor="whiteAlpha.200" />

                <Box>
                  <Heading size="sm" color={selectedJob.color} mb={3}>
                    What We're Looking For
                  </Heading>
                  <VStack align="start" spacing={2}>
                    {selectedJob.fullDescription.requirements.map((req, i) => (
                      <HStack key={i} align="start">
                        <Text color={selectedJob.color}>•</Text>
                        <Text fontSize="sm" color="gray.300">{req}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider borderColor="whiteAlpha.200" />

                <Box>
                  <Heading size="sm" color={selectedJob.color} mb={3}>
                    The Perks
                  </Heading>
                  <VStack align="start" spacing={2}>
                    {selectedJob.fullDescription.perks.map((perk, i) => (
                      <HStack key={i} align="start">
                        <Text color={selectedJob.color}>•</Text>
                        <Text fontSize="sm" color="gray.300">{perk}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Box pt={4}>
                  <Button
                    w="100%"
                    size="lg"
                    bg={`linear-gradient(135deg, ${selectedJob.color} 0%, ${selectedJob.color}CC 100%)`}
                    color="white"
                    fontWeight="800"
                    onClick={() => navigate('/contact')}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                  >
                    Apply for This Position
                  </Button>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Careers;
