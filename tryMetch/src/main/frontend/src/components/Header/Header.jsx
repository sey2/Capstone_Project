import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = () => {
  return (
	<Flex w="100%">
  	<Avatar size="lg" name="Dan Abrahmov" src="https://github.com/psm4171/CapstoneDesign/assets/94738749/6a1d571d-5cf4-435f-85a6-9b48355d8aba">
    	<AvatarBadge boxSize="1.25em" bg="green.500" />
  	</Avatar>
  	<Flex flexDirection="column" mx="5" justify="center">
    	<Text fontSize="lg" fontWeight="bold">
      	박승민
    	</Text>
    	<Text color="green.500">Online</Text>
  	</Flex>
	</Flex>
  );
};

export default Header;
