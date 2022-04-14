import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Pressable,
  Switch,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC, useEffect, useRef, useState } from 'react';
import { MetaMaskText, TermsFooter } from './signup';

interface ImportProps {}

export const Import: FC<ImportProps> = ({}) => {
  const [Phrase, setPhrase] = useState<string>('');
  const [Pass, setPass] = useState<string>('');
  const [CPass, setCPass] = useState<string>('');
  const [Biometric, setBiometric] = useState<boolean>(true);
  const nav = useNavigation();
  return (
    <Flex w="100%" h="100%" px="2">
      <MetaMaskText />
      <Flex h="12" justify={'flex-end'} align={'center'}>
        <Text fontSize={'xl'} fontWeight="bold">
          Import from seed
        </Text>
      </Flex>
      <Flex align={'center'} mt="4" flex={1}>
        <SafeInput
          value={Phrase}
          onChangeText={(val) => setPhrase(val)}
          showHide
          heading="Secret Recovery Phrase"
          placeholder="Enter your Secret Recovery Phrase"
        />
        <SafeInput
          value={Pass}
          onChangeText={(val) => setPass(val)}
          showHide
          mt="4"
          heading="New Password"
          placeholder="Enter your Secret Recovery Phrase"
        />
        <SafeInput
          value={CPass}
          onChangeText={(val) => setCPass(val)}
          mt="4"
          initVal
          heading="Confirm Password"
          placeholder="Enter your Secret Recovery Phrase"
          helper="Must be at least 8 characters"
        />
      </Flex>
      <Flex flex={1} align={'center'}>
        <Flex w="80%" mt="10">
          <Text color={'purple.200'} fontWeight="semibold">
            Unlock with Biometric?
          </Text>
          <Switch
            value={Biometric}
            colorScheme="blue"
            size={6}
            mt="2"
            onValueChange={(val) => setBiometric(val)}
          ></Switch>
        </Flex>
        <Button
          isDisabled={
            Pass === '' || CPass === '' || Phrase === '' || CPass !== Pass
          }
          borderRadius={'full'}
          py="3"
          w="80%"
          colorScheme={'blue'}
          mt="8"
          onPress={() => nav.navigate('Congo')}
        >
          <Text fontWeight={'semibold'}>Import</Text>
        </Button>
      </Flex>
      <TermsFooter />
    </Flex>
  );
};
interface SafeInputProps {
  value?: string;
  showHide?: boolean;
  onChangeText?: (val: string) => any;
  placeholder?: string;
  initVal?: boolean;
  heading?: string;
  mt?: string;
  helper?: string;
}
export const SafeInput: FC<SafeInputProps> = ({
  value,
  onChangeText = () => {},
  placeholder,
  showHide,
  initVal = false,
  heading,
  mt = 4,
  helper,
}) => {
  const [hide, setHide] = useState(initVal || showHide);

  return (
    <FormControl w="80%" mt={mt}>
      <FormControl.Label>
        <Flex w="100%" direction="row" justify="space-between">
          <Text fontWeight={'semibold'}>{heading}</Text>
          {showHide ? (
            <Pressable onPress={() => setHide((prev) => !prev)}>
              <Text fontWeight={'semibold'}>{hide ? 'Show' : 'Hide'}</Text>
            </Pressable>
          ) : (
            <></>
          )}
        </Flex>
      </FormControl.Label>
      <Input
        mt="2"
        focusOutlineColor={'blue.500'}
        _focus={{
          borderColor: 'blue.500',
          focusOutlineColor: 'blue.500',
          _hover: { borderColor: 'blue.500', focusOutlineColor: 'blue.500' },
        }}
        _hover={{ borderColor: 'blue.500', focusOutlineColor: 'blue.500' }}
        h="12"
        type={!hide ? 'text' : 'password'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
      <FormControl.HelperText>
        <Text color={'purple.200'} fontWeight="600" fontSize={'sm'}>
          {helper}
        </Text>
      </FormControl.HelperText>
    </FormControl>
  );
};
