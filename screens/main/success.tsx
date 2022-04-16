import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { RootStackParamList } from "../../utils/types";
import { StyleSheet } from "react-native";
import { Avatar, Flex, Text, Button } from "native-base";
import { shrinkAddress } from "../../utils";
import { useNavigation } from "@react-navigation/native";

export const Success: FC<
  NativeStackScreenProps<RootStackParamList, "Success">
> = ({ route }) => {
  const amt = route.params.amount;
  const crypto = route.params.crypto;
  const payedTo = route.params.payedTo;
  const method = route.params.receiverAccepted;
  const nav = useNavigation();

  return (
    <Flex justify="center" align="center">
      <Flex align="center" mt="300" w="80%" h="80%">
        <Avatar
          bg="black"
          source={{
            uri: "https://www.vhv.rs/dpng/d/356-3568543_check-icon-green-tick-hd-png-download.png",
          }}
        />
        <Text fontSize="2xl" mt="5">
          Payment Successful!
        </Text>
        <Text mt="100" fontSize="lg">
          Successfully payed
        </Text>
        <Text>
          {amt} {crypto} to{" "}
          <Text fontFamily="UbuntuMono">
            {method === "CRYPTO" ? shrinkAddress(payedTo || "") : payedTo}
          </Text>
        </Text>
        <Button
          colorScheme={"blue"}
          py="3"
          mt="200"
          mx="2"
          maxW={"500"}
          borderRadius={"full"}
          borderColor={"blue.500"}
          borderWidth="2"
          variant={"outline"}
          // w="80%"
          onPress={() => {
            nav.navigate("Home");
          }}
        >
          <Text color="blue.500" fontWeight={"bold"}>
            Back to Home
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};
