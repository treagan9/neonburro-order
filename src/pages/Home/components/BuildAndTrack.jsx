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
 Flex,
 Container
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlus, FiShoppingBag, FiClock } from 'react-icons/fi';
import { GiNoodles, GiChickenOven, GiSaucepan, GiBowlOfRice } from 'react-icons/gi';
import { HiFire } from 'react-icons/hi';
import ActiveOrdersTracker from '../../../components/common/ActiveOrdersTracker';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Keyframe animations
const pulse = keyframes`
 0%, 100% { transform: scale(1); opacity: 0.8; }
 50% { transform: scale(1.05); opacity: 1; }
`;

const glow = keyframes`
 0% { box-shadow: 0 0 5px rgba(255, 225, 53, 0.5); }
 50% { box-shadow: 0 0 20px rgba(255, 225, 53, 0.8), 0 0 30px rgba(255, 225, 53, 0.6); }
 100% { box-shadow: 0 0 5px rgba(255, 225, 53, 0.5); }
`;

const slideIn = keyframes`
 from { transform: translateX(-10px); opacity: 0; }
 to { transform: translateX(0); opacity: 1; }
`;

const BuildAndTrack = ({ menuType, onBuildClick, colors }) => {
 const isMobile = useBreakpointValue({ base: true, lg: false });
 const isBreakfast = menuType === 'breakfast';
 
 const buildYourOwnData = isBreakfast ? {
   title: 'BUILD YOUR BREAKFAST',
   subtitle: 'Stack it your way, partner',
   icon: GiBowlOfRice,
   bases: [
     { name: 'Buttermilk Biscuit', price: 4, icon: '🥐', description: 'Fluffy, buttery, perfect' },
     { name: 'Country Omelette', price: 6, icon: '🍳', description: '3 eggs, your way' },
     { name: 'Scramble Bowl', price: 6, icon: '🥘', description: 'Hearty & loaded' },
     { name: 'Kouign-Amann', price: 5, icon: '🥮', description: 'Sweet & flaky' }
   ],
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
       bg="rgba(0,0,0,0.5)"
       backdropFilter="blur(10px)"
       p={{ base: 6, md: 8 }}
       borderRadius="2xl"
       border="2px solid"
       borderColor={`${colors.primary}44`}
       h="100%"
       overflow="hidden"
       cursor="pointer"
       onClick={onBuildClick}
       role="group"
       _hover={{
         borderColor: colors.primary,
         bg: "rgba(0,0,0,0.7)",
         transform: 'translateY(-4px)',
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
         bg={`radial-gradient(circle, ${colors.primary}22 0%, transparent 70%)`}
         filter="blur(40px)"
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
             >
               {isBreakfast ? 'Breakfast Builder' : 'Bowl Builder'}
             </Badge>
             
             <Heading 
               size="lg" 
               color="white"
               lineHeight="1.1"
               letterSpacing="-0.02em"
             >
               {buildYourOwnData.title}
             </Heading>
             
             <Text 
               color="gray.400" 
               fontSize={{ base: "sm", md: "md" }}
               fontStyle="italic"
             >
               {buildYourOwnData.subtitle}
             </Text>
           </VStack>
           
           <Icon
             as={buildYourOwnData.icon}
             boxSize={{ base: 12, md: 16 }}
             color={colors.primary}
             opacity={0.3}
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
                 bg="whiteAlpha.50"
                 borderRadius="lg"
                 border="1px solid"
                 borderColor="whiteAlpha.100"
                 _groupHover={{ bg: 'whiteAlpha.100' }}
                 transition="all 0.3s"
               >
                 <HStack spacing={2}>
                   <Text fontSize="2xl">{base.icon}</Text>
                   <VStack align="start" spacing={0}>
                     <Text fontSize="sm" fontWeight="600" color="white">
                       {base.name}
                     </Text>
                     <Text fontSize="xs" color="gray.500">
                       {base.description}
                     </Text>
                   </VStack>
                 </HStack>
                 <Text 
                   fontSize="lg" 
                   fontWeight="700" 
                   color={colors.primary}
                   mt={2}
                 >
                   ${base.price}
                 </Text>
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
                 bg="whiteAlpha.50"
                 borderRadius="xl"
                 border="2px solid"
                 borderColor={key === 'small' ? colors.primary : colors.secondary}
                 flex={1}
                 textAlign="center"
                 _groupHover={{ 
                   bg: 'whiteAlpha.100',
                   transform: 'scale(1.05)'
                 }}
                 transition="all 0.3s"
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
                 <Text fontSize="xs" color="gray.500" mt={1}>
                   {value.description}
                 </Text>
               </MotionBox>
             ))}
           </HStack>
         )}

         {/* Features list */}
         <VStack align="start" spacing={2}>
           <Text fontSize="xs" color="gray.400" textTransform="uppercase" letterSpacing="wider">
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
                 <Text fontSize="sm" color="gray.300">
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
           bg={`linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`}
           color="black"
           fontWeight="800"
           rightIcon={<Icon as={FiArrowRight} className="arrow-icon" transition="all 0.3s" />}
           _hover={{ 
             transform: 'scale(1.05)',
             boxShadow: `0 10px 30px ${colors.primary}55`
           }}
           _active={{ transform: 'scale(0.98)' }}
           transition="all 0.2s"
           width="100%"
           height="56px"
           fontSize="md"
           letterSpacing="wider"
           textTransform="uppercase"
           animation={`${glow} 3s ease-in-out infinite`}
         >
           {buildYourOwnData.buttonText}
         </Button>
       </VStack>
     </Box>
   </MotionBox>
 );

 if (isMobile) {
   return (
     <Container maxW="container.lg" px={{ base: 4, md: 8 }}>
       <VStack spacing={8} w="100%">
         <BuildSection />
         <Box w="100%">
           <ActiveOrdersTracker />
         </Box>
       </VStack>
     </Container>
   );
 }

 return (
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
 );
};

export default BuildAndTrack;
