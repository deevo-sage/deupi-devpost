import { Feather } from "@expo/vector-icons";
import { Avatar, Button, Flex, Icon, Input, Text, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import Clipboard from "@react-native-clipboard/clipboard";
import { Alert } from "react-native";

export const Pay: React.FC = () => {
  const [amt, setAmt] = useState<number | undefined>();
  const CopyToClipboard = (address: string) => {
    Clipboard.setString(address);
    Alert.alert("Successfully copied to clipboard");
  };

  const shrinkAddress = (s: string) =>
    s.substring(0, 6) + "..." + s.substring(s.length - 4);
  const toast = useToast();

  const address = "0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806";

  useEffect(() => {
    console.log(amt);
  }, [amt]);

  return (
    <Flex p={5} h="full" align="center" justify="space-between">
      <Flex align="center">
        <Flex
          // border="1px solid red"
          borderWidth="1px"
          p={2}
          rounded="full"
          borderStyle="solid"
          borderColor="gray.500"
          w="fit-content"
          direction="row"
          align="center"
          justify="center"
        >
          <Text mx={2} fontSize="lg" color="gray.400" fontWeight="semibold">
            To
          </Text>

          <Icon mx={1} as={Feather} bg="red" size="md" name="box"></Icon>
          <Text
            mr={2}
            fontSize="xl"
            fontWeight="semibold"
            onPress={() => {
              CopyToClipboard(address);
              toast.show({
                title: "Copied address to clipboard",
                placement: "bottom",
                //   borderRadius: "0px",
              });
            }}
          >
            {shrinkAddress(address)}
          </Text>
        </Flex>
        <Input
          // px={2}
          InputLeftElement={
            <Text m={3} fontSize="3xl">
              ₹
            </Text>
          }
          //   value={amt}
          onChangeText={(e) => {
            if (parseFloat(e) === NaN) setAmt(0);
            else setAmt(parseFloat(e));
          }}
          type="number"
          mt="150"
          h="70"
          w="300"
          textAlign="center"
          variant="underlined"
          // size="xl"
          fontSize="3xl"
          fontFamily="mono"
        />
      </Flex>
      <Button
        py="3"
        maxW={"500"}
        colorScheme="blue"
        borderRadius={"full"}
        mt="4"
        w="50%"
      >
        <Text fontWeight={"bold"}>Pay </Text>
      </Button>
    </Flex>
  );
};
