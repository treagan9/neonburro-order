import { Box, Container, Heading, Text, VStack, Tag, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Most foundation websites launch in 4-6 weeks. Complex projects with custom features can take 8-12 weeks. We'll give you a detailed timeline during our initial consultation."
    },
    {
      question: "Do you work with clients outside of Colorado?",
      answer: "Absolutely! While we're based in Ridgway, we work with clients nationwide. We use video calls, collaborative tools, and clear communication to ensure distance is never an issue."
    },
    {
      question: "What's included in the monthly care packages?",
      answer: "Care packages include hosting, regular backups, security monitoring, plugin/software updates, and monthly support hours. Higher tiers add performance optimization, priority support, and more."
    },
    {
      question: "Can I update the website myself after launch?",
      answer: "Yes! We build sites with user-friendly content management systems. We'll train you on making updates, and our care packages include support if you need help."
    },
    {
      question: "What if I need features not in your packages?",
      answer: "No problem! Our packages cover common needs, but we love custom challenges. Let's discuss your specific requirements and we'll create a tailored solution."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options. Typically 50% upfront and 50% on launch, but we can discuss alternatives that work for your budget."
    }
  ];

  return (
    <Box py={20} bg="dark.900">
      <Container maxW="800px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              FAQ
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Questions? We've Got Answers
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Everything you need to know about working with Neon Burro.
            </Text>
          </VStack>

          <Accordion allowMultiple width="100%">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                border="none"
                mb={4}
              >
                <AccordionButton
                  p={6}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _hover={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'neon.cyan'
                  }}
                  _expanded={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'neon.cyan'
                  }}
                >
                  <Box flex="1" textAlign="left">
                    <Text fontSize="lg" fontWeight="600" color="white">
                      {faq.question}
                    </Text>
                  </Box>
                  <AccordionIcon color="neon.cyan" />
                </AccordionButton>
                <AccordionPanel
                  px={6}
                  pb={6}
                  pt={0}
                  color="gray.300"
                  lineHeight="1.8"
                >
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQSection;