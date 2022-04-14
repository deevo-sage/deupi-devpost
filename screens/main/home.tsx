import {
  Actionsheet,
  Avatar,
  Button,
  Divider,
  Flex,
  Pressable,
  Text,
  View,
} from "native-base";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import { Feather } from "@expo/vector-icons";
import { shrinkAddress, walletFromPhrase } from "../../utils";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Linking } from "react-native";
import { ethers } from "ethers";
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const address = "0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806";
  const accountName = "Account 1";
  const Balance = "$11.8";
  return (
    <Flex pt="4">
      <Flex align={"center"}>
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
        <Pressable>
          <View
            borderRadius={"full"}
            py="1"
            px="2"
            bgColor="rgba(56, 189, 248,0.1)"
          >
            <Text>{shrinkAddress(address)}</Text>
          </View>
        </Pressable>
        <UtilButtons />
      </Flex>
      <Divider mt="4" />
      <Flex w="100%" h="500">
        <Transactions address={address} />
      </Flex>
    </Flex>
  );
};
const QrScanner = ({ isOpen, onClose }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Flex backgroundColor={"gray.900"} py="4" w="100%" align={"center"}>
        <BarCodeScanner
          onBarCodeScanned={(item) => {
            Linking.openURL(item.data);
          }}
          style={{ width: 300, height: 300 }}
        />
      </Flex>
    </Actionsheet>
  );
};
const Transactions = ({ address }) => {
  var data = {
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    transfers: ["external", "internal", "token"],
    params: [
      {
        fromBlock: "0x1837271",
        maxCount: "0x5",
        fromAddress: "0x1Dd8D38e294D632Eab2d445beAc8340462db021d",
        // toAddress: address,
        // toAddress: address,
        excludeZeroValue: false,
        category: ["token"],
      },
    ],
  };

  var config = {
    method: "post",
    url: "https://polygon-mumbai.g.alchemy.com/v2/shDMEU7o9LPri4A4dpwR7wDGAyTTOi1m",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  async function GetTransaction() {
    const provider = new ethers.providers.AlchemyProvider(
      "maticmum",
      "shDMEU7o9LPri4A4dpwR7wDGAyTTOi1m"
    );
    const wallet = walletFromPhrase(
      provider,
      "wolf better side problem train person turkey render canoe civil crazy gravity"
    );
    // provider.
    await axios
      .post(config.url, config.data)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log({ wallet });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    console.log(address);
    GetTransaction();
  }, []);

  const [x, setX] = useState("peepee ");
  return <Flex w="100%" h="100%"></Flex>;
};
const UtilButtons = () => {
  const [sheet, setSheet] = useState(false);

  return (
    <Flex mt="4" direction="row" justify={"space-between"}>
      <UtilButton text="Scan" Icon="maximize" onPress={() => setSheet(true)} />
      <UtilButton text="Recieve" Icon="arrow-down" />
      <UtilButton text="Send" Icon="arrow-up-right" />
      <QrScanner isOpen={sheet} onClose={() => setSheet(false)} />
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
