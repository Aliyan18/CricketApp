import { Box, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Loader = () => {
  return (
    <Center h="100vh" bg="#87CEEB">
      {/* Bat */}
      <MotionBox
        position="absolute"
        left="20%"
        bottom="40%"
        w="20px"
        h="100px"
        bg="brown"
        borderRadius="5px"
        animate={{
          rotate: [0, -30, 0], // Bat swings from 0° to -30° and back
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        }}
      />

      {/* Ball */}
      <MotionBox
        position="absolute"
        left="25%"
        bottom="45%"
        w="30px"
        h="30px"
        bg="white"
        borderRadius="50%"
        boxShadow="0px 0px 10px rgba(0,0,0,0.3)"
        animate={{
          x: [0, 300], // Ball moves from left to right
          y: [0, -50, 0], // Ball follows a slight curve
          scale: [1, 1.2, 1], // Ball scales up slightly on impact
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        }}
      />
    </Center>
  );
};

export default Loader;
