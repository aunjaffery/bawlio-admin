import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth_module/store/auth_store";

const Navbar = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuthStore((state) => state);
  return (
    <Box bg="blue.700">
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
              onClick={() => logoutUser()}
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
