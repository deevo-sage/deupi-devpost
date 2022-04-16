import {
  Actionsheet,
  Avatar,
  Divider,
  Flex,
  Pressable,
  Text,
  View,
} from "native-base";
import "@ethersproject/shims";
import { URL } from "react-native-url-polyfill";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { LogBox } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getProvider, shrinkAddress, walletFromPhrase } from "../../utils";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Linking, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { Chain } from "../../recoil";
import { ethers } from "ethers";
import QRCode from "react-native-qrcode-svg";
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const chain = useRecoilValue(Chain);
  const [mne, setmne] = useState("");
  const nav = useNavigation();
  const accountName = "Account 1";
  // nav.navigate('Pay', {
  //   toPay: '0x1Dd8D38e294D632Eab2d445beAc8340462db021d',
  //   receiverAccepts: 'CRYPTO',
  // });
  const init = async () => {
    AsyncStorage.getItem("phrase")
      .then(async (mnemonic) => {
        if (mnemonic) setmne(mnemonic || "");
        else {
          await AsyncStorage.removeItem("phrase");
          await AsyncStorage.removeItem("password");
          nav.navigate("Signup");
        }
      })
      .catch((err) => console.log({ err }));
  };

  const getBalance = async (wallet?: ethers.Wallet, address?: string) => {
    if (address) {
      await wallet
        ?.getBalance()
        .then((bal: ethers.BigNumber) => {
          let balance: any = bal;
          if (balance) {
            const divisor = ethers.BigNumber.from(1e15 + 0.0);
            balance = balance.div(divisor).toNumber();
            balance = balance / 1000;
          }
          const val =
            chain === "matic" || chain === "maticmum" ? "MATIC" : "ETH";
          setBalance((balance?.toString() || "0.000") + " " + val);
        })
        .catch((err) => {
          console.log(err);
          const val =
            chain === "matic" || chain === "maticmum" ? "MATIC" : "ETH";
          setBalance("0.000" + " " + val);
        });
    }
  };
  const onMnemonicChange = async () => {
    const provider = getProvider(chain);
    const wallet = walletFromPhrase(provider, mne);
    setAddress(wallet?.address || "");
    getBalance(wallet, wallet?.address);
    if (!wallet) {
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer"]);
    init();
  }, []);
  useEffect(() => {
    if (mne) {
      onMnemonicChange();
    }
  }, [mne, chain]);

  return (
    <Flex pt="4" height={"100%"}>
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
                ".png",
            }}
          />
        </View>
        <Text mb="2" fontSize={"xl"} fontWeight="semibold">
          {accountName}
        </Text>
        <Text h="8" fontSize={"sm"}>
          {balance}
        </Text>
        <Pressable>
          <View
            borderRadius={"full"}
            py="1"
            px="2"
            bgColor="rgba(56, 189, 248,0.1)"
          >
            <Text fontFamily="UbuntuMono">
              {address ? shrinkAddress(address) : ""}
            </Text>
          </View>
        </Pressable>
        <UtilButtons address={address} />
      </Flex>
      <Divider mt="4" />
      <Flex w="100%" flex="1">
        <Transactions address={address} />
      </Flex>
    </Flex>
  );
};

const QrScanner: FC<{ isOpen: boolean; onClose: () => any }> = ({
  isOpen,
  onClose,
}) => {
  const nav = useNavigation();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Flex backgroundColor={"gray.900"} py="4" w="100%" align={"center"}>
        <BarCodeScanner
          onBarCodeScanned={(item) => {
            if (item.data.includes("@")) {
              const x = new URL(item.data);
              nav.navigate("Pay", {
                toPay: x.searchParams.get("pa") || "",
                receiverAccepts: "UPI",
              });
            } else
              nav.navigate("Pay", {
                toPay: item.data,
                receiverAccepts: "CRYPTO",
              });
            onClose();
          }}
          style={{ width: 300, height: 300 }}
        />
      </Flex>
    </Actionsheet>
  );
};

const Transactions: FC<{ address: string }> = ({ address }) => {
  var params = [
    {
      fromBlock: "0xd7424d",
      maxCount: "0x10",
      toAddress: address,
      // toAddress: address,
      // toAddress: address,
      excludeZeroValue: false,
      category: ["external"],
    },
    {
      fromBlock: "0xd7424d",
      maxCount: "0x10",
      fromAddress: address,
      // toAddress: address,
      // toAddress: address,
      excludeZeroValue: false,
      category: ["external"],
    },
  ];
  var data = {
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    transfers: ["external"],
    params: [],
  };

  var config = {
    url: "https://eth-mainnet.alchemyapi.io/v2/GamugAUazA5YnYqAEYtXZji3lNU2rg3A",
    data: data,
  };
  const [transaction, setTransaction] = useState<ethTransaction[]>([]);
  const [chain, setChain] = useRecoilState(Chain);
  async function GetTransaction() {
    axios
      .post(config.url, { ...config.data, params: [params[0]] })
      .then(function (response) {
        setTransaction((prev) => [
          ...prev,
          ...(response.data?.result?.transfers || []),
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .post(config.url, { ...config.data, params: [params[1]] })
      .then(function (response) {
        setTransaction((prev) => [
          ...prev,
          ...(response.data?.result?.transfers || []),
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    if (address && chain === "homestead" && transaction.length === 0)
      GetTransaction();
    else {
    }
  }, [address, chain]);
  return (
    <ScrollView>
      <Flex w="100%" bgColor={"gray.900"} h="100%">
        {chain === "homestead" ? (
          transaction
            .sort((a, b) => Number(b.blockNum) - Number(a.blockNum))
            .map((item, i) => {
              return (
                <Transaction
                  key={i + "transactions"}
                  data={item}
                  mine={item.from.toLowerCase() === address.toLowerCase()}
                />
              );
            })
        ) : (
          <></>
        )}
      </Flex>
    </ScrollView>
  );
};
const Transaction: FC<{
  data: {
    blockNum: string;
    hash: string;
    from: string;
    to: string;
    value: number;
    erc721TokenId: string | null;
    erc1155Metadata: string | null;
    tokenId: string | null;
    asset: string;
    category: string;
    rawContract: { value: string; address: string | null; decimal: string };
  };
  mine?: boolean;
}> = ({ data, mine }) => {
  return (
    <Flex
      w="full"
      h="81"
      flexDir={"row"}
      align="center"
      style={{ elevation: 5 }}
      bg="black"
      mb="0.5"
    >
      <Flex
        flex="1"
        px="4"
        h="100%"
        direction="row"
        align={"center"}
        justify={"center"}
      >
        <Flex
          borderRadius={"full"}
          h="8"
          w="8"
          borderColor={"blue.500"}
          borderWidth={2}
          align="center"
          justify={"center"}
        >
          <Feather
            name={mine ? "arrow-up-right" : "arrow-down"}
            size={16}
            color={"#3b82f6"}
          />
        </Flex>
        <Text flex={"1"} pl="4" fontSize={"xl"} fontWeight="600">
          {mine ? "Sent" : "Recieved"}
        </Text>
      </Flex>
      <Flex justify={"center"} mx="2">
        <Text fontSize={"xl"}>
          {mine ? "-" : ""}
          {data.value.toString().substring(0, 5)} {data.asset}
        </Text>
      </Flex>
    </Flex>
  );
};
const UtilButtons: FC<{ address: string }> = ({ address }) => {
  const [sheet, setSheet] = useState(false);
  const [sheet2, setSheet2] = useState(false);

  return (
    <Flex mt="4" direction="row" justify={"space-between"}>
      <UtilButton text="Scan" Icon="maximize" onPress={() => setSheet(true)} />
      <UtilButton
        text="Recieve"
        Icon="arrow-down"
        onPress={() => setSheet2(true)}
      />
      <UtilButton text="Send" Icon="arrow-up-right" isDisabled />
      <QrScanner isOpen={sheet} onClose={() => setSheet(false)} />
      <QrCodeSheet
        address={address}
        isOpen={sheet2}
        onClose={() => setSheet2(false)}
      />
    </Flex>
  );
};
const QrCodeSheet: FC<{
  address: string;
  isOpen: boolean;
  onClose: () => any;
}> = ({ address, isOpen, onClose }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Flex backgroundColor={"gray.900"} py="4" w="100%" align={"center"}>
        <QRCode value={address || "asdasd"} size={150} />
      </Flex>
    </Actionsheet>
  );
};

const UtilButton: FC<UtilButtonProps> = ({
  onPress = () => {},
  text,
  Icon,
  isDisabled,
}) => {
  return (
    <Pressable onPress={onPress} isDisabled={isDisabled}>
      <Flex align={"center"} style={{ opacity: isDisabled ? 0.5 : 1 }}>
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
const dummyTransactions = [
  {
    blockNum: "0xd9a115",
    hash: "0x71fd74e37a1652192f3ce09835a59c0e816949c5651e1a919c0a1519ee0a8d56",
    from: "0x56eddb7aa87536c09ccc2793473599fd21a8b17f",
    to: "0x1dd8d38e294d632eab2d445beac8340462db021d",
    value: 0.03877301,
    erc721TokenId: null,
    erc1155Metadata: null,
    tokenId: null,
    asset: "ETH",
    category: "external",
    rawContract: {
      value: "0x89bfd8dfec3400",
      address: null,
      decimal: "0x12",
    },
  },
  {
    blockNum: "0xd7424d",
    hash: "0x240033967ff85bd2772e52c30cccd9f0df689f3fa5216d20e795115de1d3d63b",
    from: "0x4976a4a02f38326660d17bf34b431dc6e2eb2327",
    to: "0x1dd8d38e294d632eab2d445beac8340462db021d",
    value: 0.10602939,
    erc721TokenId: null,
    erc1155Metadata: null,
    tokenId: null,
    asset: "ETH",
    category: "external",
    rawContract: {
      value: "0x178b12b1eb38c00",
      address: null,
      decimal: "0x12",
    },
  },
  {
    blockNum: "0xd9a906",
    hash: "0x08f94a494589c35d39d67d31c9410e068915fd15ee0ef8d56cf22df56a533a41",
    from: "0x1dd8d38e294d632eab2d445beac8340462db021d",
    to: "0x7f268357a8c2552623316e2562d90e642bb538e5",
    value: 0.109,
    erc721TokenId: null,
    erc1155Metadata: null,
    tokenId: null,
    asset: "ETH",
    category: "external",
    rawContract: {
      value: "0x1833eec28848000",
      address: null,
      decimal: "0x12",
    },
  },
  {
    blockNum: "0xdbf65d",
    hash: "0x0186205eef3767c017d7781a3a9353088964ecab955b49346d983921a93e9505",
    from: "0x1dd8d38e294d632eab2d445beac8340462db021d",
    to: "0xa5409ec958c83c3f309868babaca7c86dcb077c1",
    value: 0,
    erc721TokenId: null,
    erc1155Metadata: null,
    tokenId: null,
    asset: "ETH",
    category: "external",
    rawContract: { value: "0x0", address: null, decimal: "0x12" },
  },
  {
    blockNum: "0xdbf662",
    hash: "0x1c2e29adf5e15df2513f21742b40d74b5f7f4dd7c2e487b40f930a697c421d93",
    from: "0x1dd8d38e294d632eab2d445beac8340462db021d",
    to: "0x9e8b85dbb082255bd81c5b25323b694bc799a616",
    value: 0,
    erc721TokenId: null,
    erc1155Metadata: null,
    tokenId: null,
    asset: "ETH",
    category: "external",
    rawContract: { value: "0x0", address: null, decimal: "0x12" },
  },
];
type ethTransaction = {
  blockNum: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  erc721TokenId: string | null;
  erc1155Metadata: string | null;
  tokenId: string | null;
  asset: string;
  category: string;
  rawContract: { value: string; address: string | null; decimal: string };
};
interface UtilButtonProps {
  Icon?: string;
  text?: string;
  onPress?: () => any;
  isDisabled?: boolean;
}
