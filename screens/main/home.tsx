import {
  Actionsheet,
  Avatar,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Pressable,
  Text,
  View,
} from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { Feather } from '@expo/vector-icons';
import { getProvider, shrinkAddress, walletFromPhrase } from '../../utils';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Linking, ScrollView } from 'react-native';
import { ethers } from 'ethers';
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const address = '0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806';
  const accountName = 'Account 1';
  const Balance = '$11.8';
  return (
    <Flex pt="4" height={'100%'}>
      <Flex align={'center'}>
        <View
          borderWidth={2}
          borderColor="blue.500"
          borderRadius={'full'}
          p="0.5"
          mb="2"
        >
          <Avatar
            size={'md'}
            bgColor="white"
            source={{
              uri:
                'https://avatars.dicebear.com/api/identicon/' +
                address +
                '.png',
            }}
          />
        </View>
        <Text mb="2" fontSize={'xl'} fontWeight="semibold">
          {accountName}
        </Text>
        <Text mb="4" fontSize={'sm'}>
          {Balance}
        </Text>
        <Pressable>
          <View
            borderRadius={'full'}
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
      <Flex w="100%" flex="1">
        <Transactions address={address} />
      </Flex>
    </Flex>
  );
};
const QrScanner = ({ isOpen, onClose }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Flex backgroundColor={'gray.900'} py="4" w="100%" align={'center'}>
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
const Transactions = ({ address }) => {
  var params = [
    {
      fromBlock: '0xd7424d',
      maxCount: '0x10',
      toAddress: address,
      // toAddress: address,
      // toAddress: address,
      excludeZeroValue: false,
      category: ['external'],
    },
    {
      fromBlock: '0xd7424d',
      maxCount: '0x10',
      fromAddress: address,
      // toAddress: address,
      // toAddress: address,
      excludeZeroValue: false,
      category: ['external'],
    },
  ];
  var data = {
    jsonrpc: '2.0',
    id: 0,
    method: 'alchemy_getAssetTransfers',
    transfers: ['external'],
    params: [],
  };

  var config = {
    url: 'https://eth-mainnet.alchemyapi.io/v2/GamugAUazA5YnYqAEYtXZji3lNU2rg3A',
    data: data,
  };
  const [transaction, setTransaction] = useState<ethTransaction[]>([
    {
      blockNum: '0xd9a115',
      hash: '0x71fd74e37a1652192f3ce09835a59c0e816949c5651e1a919c0a1519ee0a8d56',
      from: '0x56eddb7aa87536c09ccc2793473599fd21a8b17f',
      to: '0x1dd8d38e294d632eab2d445beac8340462db021d',
      value: 0.03877301,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: {
        value: '0x89bfd8dfec3400',
        address: null,
        decimal: '0x12',
      },
    },
    {
      blockNum: '0xd7424d',
      hash: '0x240033967ff85bd2772e52c30cccd9f0df689f3fa5216d20e795115de1d3d63b',
      from: '0x4976a4a02f38326660d17bf34b431dc6e2eb2327',
      to: '0x1dd8d38e294d632eab2d445beac8340462db021d',
      value: 0.10602939,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: {
        value: '0x178b12b1eb38c00',
        address: null,
        decimal: '0x12',
      },
    },
    {
      blockNum: '0xd9a906',
      hash: '0x08f94a494589c35d39d67d31c9410e068915fd15ee0ef8d56cf22df56a533a41',
      from: '0x1dd8d38e294d632eab2d445beac8340462db021d',
      to: '0x7f268357a8c2552623316e2562d90e642bb538e5',
      value: 0.109,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: {
        value: '0x1833eec28848000',
        address: null,
        decimal: '0x12',
      },
    },
    {
      blockNum: '0xdbf65d',
      hash: '0x0186205eef3767c017d7781a3a9353088964ecab955b49346d983921a93e9505',
      from: '0x1dd8d38e294d632eab2d445beac8340462db021d',
      to: '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
      value: 0,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: { value: '0x0', address: null, decimal: '0x12' },
    },
    {
      blockNum: '0xdbf662',
      hash: '0x1c2e29adf5e15df2513f21742b40d74b5f7f4dd7c2e487b40f930a697c421d93',
      from: '0x1dd8d38e294d632eab2d445beac8340462db021d',
      to: '0x9e8b85dbb082255bd81c5b25323b694bc799a616',
      value: 0,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: { value: '0x0', address: null, decimal: '0x12' },
    },
  ]);
  async function GetTransaction() {
    const provider = getProvider('maticmum');
    const wallet = walletFromPhrase(
      provider,
      'wolf better side problem train person turkey render canoe civil crazy gravity',
    );
    await axios.post(config.url, config.data);
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
    // GetTransaction();
  }, []);
  return (
    <ScrollView>
      <Flex w="100%" bgColor={'gray.900'} h="100%">
        {transaction
          .sort((a, b) => Number(b.blockNum) - Number(a.blockNum))
          .map((item, i) => {
            return (
              <Transaction
                key={i + 'transactions'}
                data={item}
                mine={item.from.toLowerCase() === address.toLowerCase()}
              />
            );
          })}
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
      flexDir={'row'}
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
        align={'center'}
        justify={'center'}
      >
        <IconButton
          borderRadius={'full'}
          variant={'outline'}
          colorScheme="blue"
          h="10"
          w="10"
          icon={
            <Feather
              name={mine ? 'arrow-up-right' : 'arrow-down'}
              size={16}
              color={'#3b82f6'}
            />
          }
        ></IconButton>
        <Text flex={'1'} pl="4" fontSize={'xl'} fontWeight="600">
          {mine ? 'Sent' : 'Recieved'}
        </Text>
      </Flex>
      <Flex justify={'center'} mx="2">
        <Text fontSize={'xl'}>
          {mine ? '-' : ''}
          {data.value.toString().substring(0, 5)} {data.asset}
        </Text>
      </Flex>
    </Flex>
  );
};
const UtilButtons = () => {
  const [sheet, setSheet] = useState(false);

  return (
    <Flex mt="4" direction="row" justify={'space-between'}>
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
      <Flex align={'center'}>
        <Flex
          align={'center'}
          justify="center"
          bgColor={'blue.500'}
          borderRadius={'full'}
          mx="4"
          h="8"
          w="8"
          fontWeight={'bold'}
        >
          <Feather color={'white'} size={18} name={Icon} />
        </Flex>
        <Text color={'blue.500'} fontSize="xs" fontWeight="bold" mt="1">
          {text}
        </Text>
      </Flex>
    </Pressable>
  );
};
