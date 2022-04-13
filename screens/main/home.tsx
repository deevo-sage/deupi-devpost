import { Avatar, Flex, IconButton, Pressable, Text, View } from "native-base";
import React, { FC } from "react";
import Layout from "../../constants/Layout";
import Clipboard from "@react-native-clipboard/clipboard";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const address = "0x1Dd8D38e294D632Eab2d445beAc8340462db021d";
  const accountName = "Account 1";
  const Balance = "$11.8";
  const CopyToClipboard = () => {
    Clipboard.setString(address);
    Alert.alert("Successfully copied to clipboard");
  };

  return (
    <Flex pt="4">
      <Flex align={"center"} minH={Layout.window.height / 2}>
        <View
          borderWidth={2}
          borderColor="blue.500"
          borderRadius={"full"}
          p="0.5"
          mb="2"
        >
          <Avatar
            size={"md"}
            bgColor="white"
            source={{
              uri:
                "https://avatars.dicebear.com/api/identicon/" +
                address +
                ".svg",
            }}
          />
        </View>
        <Text mb="2" fontSize={"xl"} fontWeight="semibold">
          {accountName}
        </Text>
        <Text mb="4" fontSize={"sm"}>
          {Balance}
        </Text>
        <Pressable onPress={CopyToClipboard}>
          <View
            borderRadius={"full"}
            py="1"
            px="2"
            bgColor="rgba(56, 189, 248,0.1)"
          >
            <Text>
              {address.substring(0, 6) +
                "..." +
                address.slice(address.length - 4)}
            </Text>
          </View>
        </Pressable>
        <UtilButtons />
      </Flex>
    </Flex>
  );
};

const UtilButtons = () => {
  return (
    <Flex mt="4" direction="row" justify={"space-between"}>
      <UtilButton text="Recieve" Icon="arrow-down" />
      <UtilButton text="Send" Icon="arrow-up-right" />
      <UtilButton text="Swap" Icon="repeat" />
    </Flex>
  );
};
interface UtilButtonProps {
  Icon?: string;
  text?: string;
  onPress?: () => any;
}
const UtilButton: FC<UtilButtonProps> = ({
  onPress = () => {},
  text,
  Icon,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Flex align={"center"}>
        <Flex
          align={"center"}
          justify="center"
          bgColor={"blue.500"}
          variant="solid"
          borderRadius={"full"}
          mx="4"
          h="8"
          w="8"
          fontWeight={"bold"}
        >
          <Feather color={"white"} size={18} name={Icon} />
        </Flex>
        <Text color={"blue.500"} fontSize="xs" fontWeight="bold" mt="1">
          {text}
        </Text>
      </Flex>
    </Pressable>
  );
};
