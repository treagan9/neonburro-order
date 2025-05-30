import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const Work = () => {
  return (
    <Box minH="100vh" bg="dark.black" pt={32}>
      <Container maxW="1200px">
        <VStack spacing={8}>
          <Heading color="white">Our Work</Heading>
          <Text color="gray.300">Portfolio coming soon...</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Work;
