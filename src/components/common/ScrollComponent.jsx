import { Box } from "@chakra-ui/react";
const ScrollComponent = ({ children, h, bg }) => {
  return (
    <Box
      maxH={h}
      overflowY="auto"
      bg={bg ? bg : null}
      sx={{
        "&::-webkit-scrollbar-track": {
          bg: "transparent",
        },
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "brand.900",
          borderRadius: "20px",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollComponent;
