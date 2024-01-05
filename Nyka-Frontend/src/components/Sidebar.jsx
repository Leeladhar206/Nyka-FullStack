import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import analytics from "../assets/clipboard-tick.svg";
import dashboard from "../assets/element-3.svg";
import loginSetting from "../assets/setting-2.svg";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Box w="16%" bg="#FFF">
      <Flex flexDirection={"column"} gap={5} mt={"4rem"} position={"fixed"}>
        <Heading
          fontSize={"24px"}
          color={"#013CC6"}
          fontWeight={"500"}
          textAlign={"center"}
          ml={6}
          mb={10}
        >
          Nyka Dashboard
        </Heading>
        <Flex flexDirection={"column"} w={"70%"} m={"auto"} gap={"41px"}>
          <Flex gap={3}>
            <Image src={dashboard} />
            <Link to="/">
              <Text fontSize={"16px"}>Dashboard</Text>
            </Link>
          </Flex>
          <Flex gap={3}>
            <Image src={analytics} />
            <Link to="/analytics">
              <Text fontSize={"16px"}>Analytics</Text>
            </Link>
          </Flex>
          <Flex gap={3}>
            <Image src={loginSetting} />
            <Link to="/login">
              <Text fontSize={"16px"}>Logout</Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
