import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PageTitle = ({ title }) => {
  let navigate = useNavigate();
  return (
    <Box py="8">
      <Flex align="center" justify="flex-start">
        <IconButton
          aria-label="lefticon"
          icon={<FiChevronLeft size="22" />}
          bg="none"
          size="xs"
          mr="2"
          ml="-2"
          onClick={() => navigate(-1)}
          _hover={{ bg: "none" }}
        />
        <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
          {title}
        </Text>
      </Flex>
    </Box>
  );
};

export default PageTitle;
