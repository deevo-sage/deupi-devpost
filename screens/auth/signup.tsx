import { Button, Flex, Link, Text } from "native-base";
import React, { FC } from "react";
interface SignupProps {}

export const Signup: FC<SignupProps> = ({}) => {
  return (
    <Flex w="100%" h="100%" px="2">
      <Flex flex={1}>
        <Flex h="50" justify={"end"} align={"center"}>
          <Text fontFamily="mono" letterSpacing={"2xl"} fontWeight="semibold">
            METAMASK
          </Text>
        </Flex>
        <Flex h="100" justify={"space-evenly"} align={"center"}>
          <Text fontSize={"xl"} fontWeight="bold">
            Wallet Setup
          </Text>
          <Text fontWeight="semibold">
            Import an existing wallet or create a new one
          </Text>
        </Flex>
      </Flex>
      <Flex flex={1}>
        <Flex flex={1} justify={"end"} align="center">
          <Button
            colorScheme={"blue"}
            py="3"
            maxW={"500"}
            borderRadius={"full"}
            borderColor={"blue.500"}
            borderWidth="2"
            variant={"outline"}
            w="80%"
          >
            <Text color="blue.500" fontWeight={"bold"}>
              Import using Secret Recovery Phrase
            </Text>
          </Button>
          <Button
            py="3"
            maxW={"500"}
            colorScheme="blue"
            borderRadius={"full"}
            mt="4"
            w="80%"
          >
            <Text fontWeight={"bold"}>Create a new wallet </Text>
          </Button>
        </Flex>
        <Flex flex={0.7} justify="end" mb="4" align={"center"}>
          <Text fontSize={"xs"}>
            By proceeding, you agree to these{" "}
            <Link href="https://youtu.be/dQw4w9WgXcQ" isExternal>
              Terms and Conditions
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
