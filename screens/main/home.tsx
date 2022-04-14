import {
  Avatar,
  Divider,
  Flex,
  IconButton,
  Pressable,
  Text,
  View,
} from 'native-base';
import React, { FC, useEffect } from 'react';

import axios from 'axios';

import { Feather } from '@expo/vector-icons';
interface HomeProps {}

export const Home: FC<HomeProps> = ({}) => {
  const address = '0x1dd8d38e294d632eab2d445beac8340462db021d';
  const accountName = 'Account 1';
  const Balance = '$11.8';
  const CopyToClipboard = () => {
    // Clipboard.setString(address);
  };

  return (
    <Flex pt="4">
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
                '.svg',
            }}
          />
        </View>
        <Text mb="2" fontSize={'xl'} fontWeight="semibold">
          {accountName}
        </Text>
        <Text mb="4" fontSize={'sm'}>
          {Balance}
        </Text>
        <Pressable onPress={CopyToClipboard}>
          <View
            borderRadius={'full'}
            py="1"
            px="2"
            bgColor="rgba(56, 189, 248,0.1)"
          >
            <Text>
              {address.substring(0, 6) +
                '...' +
                address.slice(address.length - 4)}
            </Text>
          </View>
        </Pressable>
        <UtilButtons />
      </Flex>
      <Divider mt="4" />
      <Flex>
        <Transactions address={address} />
      </Flex>
    </Flex>
  );
};
const Transactions = ({ address }) => {
  var data = {
    jsonrpc: '2.0',
    id: 0,
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromAddress: address,
        contract: '0x0000000000000000000000000000000000001010',
        category: ['erc20', 'token'],
      },
    ],
  };

  var config = {
    method: 'post',
    url: 'https://polygon-mumbai.g.alchemy.com/v2/shDMEU7o9LPri4A4dpwR7wDGAyTTOi1m',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  async function GetTransaction() {
    await axios
      .post(config.url, config.data)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    console.log(address);
    GetTransaction();
  }, []);
  return <Flex></Flex>;
};
const UtilButtons = () => {
  return (
    <Flex mt="4" direction="row" justify={'space-between'}>
      <UtilButton text="Scan" Icon="maximize" />
      <UtilButton text="Recieve" Icon="arrow-down" />
      <UtilButton text="Send" Icon="arrow-up-right" />
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
