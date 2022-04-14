import { useNavigation } from '@react-navigation/native';
import { Button, Flex, Link, Text } from 'native-base';
import React, { FC } from 'react';
import { Linking, Pressable } from 'react-native';
interface SignupProps {}

export const Signup: FC<SignupProps> = ({}) => {
  const nav = useNavigation();
  const importRecoveryPhrase = () => {
    nav.navigate('Import');
  };
  return (
    <Flex w="100%" h="100%" px="2">
      <MetaMaskText />
      <Flex flex={1}>
        <Flex h="100" justify={'space-evenly'} align={'center'}>
          <Text fontSize={'xl'} fontWeight="bold">
            Wallet Setup
          </Text>
          <Text fontWeight="semibold">
            Import an existing wallet or create a new one
          </Text>
        </Flex>
      </Flex>
      <Flex flex={1}>
        <Flex flex={1} justify={'flex-end'} align="center">
          <Button
            colorScheme={'blue'}
            py="3"
            maxW={'500'}
            borderRadius={'full'}
            borderColor={'blue.500'}
            borderWidth="2"
            variant={'outline'}
            w="80%"
            onPress={importRecoveryPhrase}
          >
            <Text color="blue.500" fontWeight={'bold'}>
              Import using Secret Recovery Phrase
            </Text>
          </Button>
          <Button
            py="3"
            maxW={'500'}
            colorScheme="blue"
            borderRadius={'full'}
            mt="4"
            w="80%"
          >
            <Text fontWeight={'bold'}>Create a new wallet </Text>
          </Button>
        </Flex>
        <Flex flex={0.7} justify="flex-end" mb="4" align={'center'}></Flex>
      </Flex>
      <TermsFooter />
    </Flex>
  );
};
interface MetaMaskTextProps {}
export const TermsFooter = () => {
  return (
    <Flex h="16" w="100%" justify={'center'} align="center">
      <Text fontSize={'xs'}>
        By proceeding, you agree to these{' '}
        <Pressable
          onPress={() => Linking.openURL('https://youtu.be/dQw4w9WgXcQ')}
        >
          <Text color={'white'} underline={true} fontSize={'xs'}>
            Terms and Conditions
          </Text>
        </Pressable>
      </Text>
    </Flex>
  );
};
export const MetaMaskText: FC<MetaMaskTextProps> = ({ children }) => {
  return (
    <Flex mt="8" align={'center'} w="100%">
      <Text fontFamily="mono" letterSpacing={'2xl'} fontWeight="semibold">
        DeUPI
      </Text>
    </Flex>
  );
};
