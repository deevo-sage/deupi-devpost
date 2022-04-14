import { Button, Flex, Heading, Link, Text } from "native-base";
import React, { FC } from "react";
import { MetaMaskText } from "./signup";
import ConfettiCannon from "react-native-confetti-cannon"
import { useNavigation } from "@react-navigation/native";
interface CongoProps { }

export const Congo: FC<CongoProps> = ({ }) => {
  const nav = useNavigation()

  return (
    <Flex h="100%" overflow={"hidden"}>
      {/*  @ts-ignore:next-line */}
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut />
      <MetaMaskText />
      <Flex flex={1} pt="12" align={"center"}>
        <Text fontSize={"90"}>🎉</Text>
        <Heading fontSize={"2xl"} fontWeight="bold" letterSpacing={"lg"}>
          Congratulations
        </Heading>
        <Text
          mt="4"
          lineHeight={"sm"}
          fontSize={"lg"}
          maxW="290"
          textAlign={"center"}
        >
          You'be successfully protected your wallet. Remember to keep your
          Secret Recovery Phrase safe, it's your responsibility!
        </Text>
        <Link>
          <Text
            color={"blue.500"}
            fontWeight="semibold"
            letterSpacing={"lg"}
            mt="8"
          >
            Leave yourself a hint?
          </Text>
        </Link>
        <Text
          mt="4"
          lineHeight={"sm"}
          fontSize={"lg"}
          maxW="290"
          textAlign={"center"}
        >
         MetaMask cannot recover your wallet should you lose it. You can find your Secret Recovery Phrase in Settings > Security & Privacy.
        </Text>
        <Link>
          <Text
            color={"blue.500"}
            fontWeight="semibold"
            letterSpacing={"lg"}
            mt="8"
          >
            Learn more
          </Text>
        </Link>
      </Flex>
      <Flex align={"center"} pb="20">
        <Button py="3"
          colorScheme={"blue"} borderRadius="full" w="80%" maxW={"500"} onPress={() => { nav.navigate("Home") }}>Done</Button>
      </Flex>
    </Flex>
  );
};
