import { Feather } from "@expo/vector-icons";
import { Flex, Divider, Text, Modal } from "native-base";
import React, { FC } from "react";
import { Pressable } from "react-native";
import { chainToName } from "../utils";

const SelectModal: React.FC<{
  isOpen: any;
  onClose: () => void;
  title: string;
  checked: string;
  options: any;
  onPressOptions: any;
  convertChainName?: boolean;
}> = ({
  isOpen,
  onClose,
  title,
  checked,
  options,
  onPressOptions,
  convertChainName = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Flex
        w="70%"
        maxW="400"
        borderColor={"gray.800"}
        borderWidth="1"
        borderRadius={"lg"}
        bg="black"
      >
        <Flex align={"center"} justify="center" h="12">
          <Text fontSize={"xl"} fontWeight="bold" color={"purple.200"}>
            {title}
          </Text>
        </Flex>
        <Divider bg={"gray.800"} />
        <ChainName check i={0}>
          {checked}
        </ChainName>
        {/* {Object.keys(providers)
          .filter((item) => item !== chain)
          .map((item, i) => {
            return (
              <ChainName
                key={i + "chains"}
                i={i + 1}
                onPress={() => {
                  onClose();
                  setTimeout(() => {
                    setChain(item as Chains);
                  }, 100);
                }}
              >
                {chainToName(item)} Network
              </ChainName>
            );
          })} */}
        {options.map((item: any, i: any) => (
          <ChainName
            key={i + "chains"}
            i={i + 1}
            onPress={() => {
              onPressOptions(item);
            }}
          >
            {convertChainName ? `${chainToName(item)} Network` : item}
          </ChainName>
        ))}
      </Flex>
    </Modal>
  );
};

const ChainName: FC<{ check?: boolean; i?: number; onPress?: () => any }> = ({
  children,
  check,
  i,
  onPress = () => {},
}) => {
  const colors = ["green.400", "red.400", "blue.400"];
  return (
    <Pressable onPress={onPress}>
      <Flex direction="row" w="100%" h="12" align={"center"}>
        <Flex w="10" align={"center"}>
          {check ? <Feather name="check" size={16} color="white" /> : <></>}
        </Flex>
        <Flex
          w="4"
          h="4"
          mr="4"
          borderRadius={"full"}
          bg={colors[i || 0]}
        ></Flex>
        <Flex flex={1}>
          <Text fontSize={"lg"} fontWeight="600">
            {children}
          </Text>
        </Flex>
      </Flex>
      <Divider bg={"gray.800"} />
    </Pressable>
  );
};

export default SelectModal;
