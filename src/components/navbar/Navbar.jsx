import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box bg="brand.900">
      <Container maxW="container.xl">
        <Flex h="69px" justify="space-between" align="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Bawlio
            </Text>
          </Box>
          <Box>
            <Text
              cursor="pointer"
              color="white"
              _hover={{ color: "blue.200" }}
              onClick={() => navigate("login")}
            >
              Logout
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
