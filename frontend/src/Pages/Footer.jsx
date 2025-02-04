import { Box, Text, Flex, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="#87CEEB" color="white" py={4}>
      {/* Social Media Icons */}
      <Flex justify="center" gap={4}>
        <Link href="https://facebook.com" isExternal>
          <Icon as={FaFacebook} boxSize={6} color="white" />
        </Link>
        <Link href="https://twitter.com" isExternal>
          <Icon as={FaTwitter} boxSize={6} color="white" />
        </Link>
        <Link href="https://instagram.com" isExternal>
          <Icon as={FaInstagram} boxSize={6} color="white" />
        </Link>
      </Flex>

      {/* Footer Text */}
      <Text textAlign="center" mt={2} fontSize="sm" color="white">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
