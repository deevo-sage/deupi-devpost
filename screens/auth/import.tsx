// import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Pressable,
  Switch,
  Text,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import React, { FC, useEffect, useState } from "react";
import { MetaMaskText, TermsFooter } from "./signup";
import { ethers } from "ethers";
import { walletFromPhrase } from "../../utils";
import { ScrollView } from "react-native";

interface ImportProps {}

export const Import: FC<ImportProps> = ({}) => {
  const [Phrase, setPhrase] = useState<string>("");
  const [Pass, setPass] = useState<string>("");
  const [CPass, setCPass] = useState<string>("");
  const [Biometric, setBiometric] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigation();
  const toast = useToast();

  return (
    <Flex w="100%" h="100%" px="2">
      <MetaMaskText />
      <ScrollView>
        <Flex h="12" justify={"flex-end"} align={"center"}>
          <Text fontSize={"xl"} fontWeight="bold">
            Import from seed
          </Text>
        </Flex>
        <Flex align={"center"} mt="4" flex={1}>
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
            warning={
              Pass.length < 8 && Pass.length !== 0
                ? "Password too short"
                : !/\d/.test(Pass) && Pass.length !== 0
                ? "Password must contain atleast one number"
                : ""
            }
          />
          <SafeInput
            value={CPass}
            onChangeText={(val) => setCPass(val)}
            mt="4"
            initVal
            heading="Confirm Password"
            placeholder="Enter your Secret Recovery Phrase"
            helper="Must be at least 8 characters"
            warning={
              Pass !== CPass && CPass.length !== 0 && Pass.length !== 0
                ? "Passwords do not match"
                : ""
            }
          />
        </Flex>
        <Flex align={"center"}>
          <Flex w="80%" mt="10">
            <Text color={"purple.200"} fontWeight="semibold">
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
              Pass === "" || CPass === "" || Phrase === "" || CPass !== Pass
              // ethers.utils.isValidMnemonic(Phrase)
            }
            borderRadius={"full"}
            py="3"
            w="80%"
            isLoading={loading}
            colorScheme={"blue"}
            mt="8"
            onPress={async () => {
              // console.log(wallet)
              setLoading(true);
              // nav.navigate("Congo");
              const provider = new ethers.providers.AlchemyProvider(
                "maticmum",
                "shDMEU7o9LPri4A4dpwR7wDGAyTTOi1m"
              );
              // AsyncStorage.setItem
              if (ethers.utils.isValidMnemonic(Phrase)) {
                const { address } = walletFromPhrase(provider, Phrase);
                AsyncStorage.setItem("password", Pass);
                AsyncStorage.setItem("phrase", Phrase);

                nav.navigate("Congo");
              } else {
                toast.show({
                  title: "Invalid Secret Recovery Phrase",
                  description: "Check your recovery phrase and try again",
                });
                setLoading(false);
              }
            }}
          >
            <Text fontWeight={"semibold"}>Import</Text>
          </Button>
        </Flex>
        <TermsFooter />
      </ScrollView>
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
  warning?: string;
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
  warning,
}) => {
  const [hide, setHide] = useState(initVal || showHide);

  return (
    <FormControl isInvalid={Boolean(warning)} w="80%" mt={mt}>
      <FormControl.Label>
        <Flex w="100%" direction="row" justify="space-between">
          <Text fontWeight={"semibold"}>{heading}</Text>
          {showHide ? (
            <Pressable onPress={() => setHide((prev) => !prev)}>
              <Text fontWeight={"semibold"}>{hide ? "Show" : "Hide"}</Text>
            </Pressable>
          ) : (
            <></>
          )}
        </Flex>
      </FormControl.Label>
      <Input
        mt="2"
        focusOutlineColor={"blue.500"}
        _focus={{
          borderColor: "blue.500",
          focusOutlineColor: "blue.500",
          _hover: { borderColor: "blue.500", focusOutlineColor: "blue.500" },
        }}
        _hover={{ borderColor: "blue.500", focusOutlineColor: "blue.500" }}
        h="12"
        type={!hide ? "text" : "password"}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />

      <FormControl.HelperText>
        <Text color={"purple.200"} fontWeight="600" fontSize={"sm"}>
          {helper}
        </Text>
      </FormControl.HelperText>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {warning}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
