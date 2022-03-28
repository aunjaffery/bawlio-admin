import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth_module/store/auth_store";
import "./authStyle.scss";
import { useEffect } from "react";
const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { loginAdmin, success, user } = useAuthStore((state) => state);

  useEffect(() => {
    if (success && user) {
      navigate("/");
    }
  });

  console.log("zus", success, user);

  const onLogin = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    if (!username || !password) {
      toast({
        title: "Fields cannot be empty",
        status: "warning",
        position: "top-right",
        isClosable: true,
      });
      return;
    }
    await loginAdmin(username, password);
  };
  const inputStyles = {
    variant: "outline",
    minW: "350px",
    maxW: "400px",
    bg: "white",
    size: "md",
    h: "52px",
    pr: "3.5rem",
    required: true,
  };
  return (
    <Box h="100vh">
      <Flex h="100%" w="100%">
        <Flex
          flex="2"
          justify="center"
          align="center"
          bg="linear-gradient(90deg,#122230 0,#091118)"
          display={{ base: "none", lg: "flex" }}
        >
          <Box px="8" maxW="800px">
            <Box>
              {/*
		  <Image src="/fh-logo-transparent.png" alt="logo" maxW="280px" />
		  */}
              <Text
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
                className="loginHeading"
                as="span"
              >
                Bawlio Admin
              </Text>
            </Box>
            <Box mt="2">
              <Text color="white" fontSize="md" fontWeight="bold">
                At Bawlio Admin, we have developed an E-commerce Marketplace
                with featured support of managing Sellers and Buyers specific to
                a business. The idea is to help people who are interested in
                launching dedicated online stores with full-featured control to
                digitize their routine business by utilizing e-commerce apps.
              </Text>
            </Box>
          </Box>
        </Flex>
        <Flex flex="1" justify="center" align="center" bg="bg.200">
          <Box px="12" mb="10">
            <Box>
              <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                Admin Login
              </Text>
            </Box>
            <form onSubmit={onLogin}>
              <FormControl position="relative" pt="8">
                <InputGroup>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    sx={inputStyles}
                  />
                  <InputRightElement width="3.5rem" h="52px" color="gray.600">
                    <AiOutlineUser size="20" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl position="relative" pt="6">
                <InputGroup>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    sx={inputStyles}
                  />
                  <InputRightElement width="3.5rem" h="52px" color="gray.600">
                    <AiOutlineLock size="20" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box mt="6">
                <Button w="full" colorScheme="blue" type="submit">
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LoginPage;
