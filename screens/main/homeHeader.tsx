import { Feather } from "@expo/vector-icons";
import { Divider, Flex, Modal, Text } from "native-base";
import React, { FC, useState } from "react";
import { Pressable } from "react-native";
import { useRecoilState } from "recoil";
import SelectModal from "../../components/SelectModal";
import { Chain } from "../../recoil";
import { chainToName, providers } from "../../utils";
import { Chains } from "../../utils/types";

interface HomeHeaderProps {}

export const HomeHeader: FC<HomeHeaderProps> = ({}) => {
  const [chain, setChain] = useRecoilState(Chain);
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = () => {
    setModalOpen(false);
  };
  return (
    <Flex mt="4" align="center" h="10">
      <Text fontSize={"lg"} fontWeight="600">
        Wallet
      </Text>
      <Pressable
        onPress={() => {
          setModalOpen(true);
        }}
      >
        <Text>{chainToName(chain)} Network</Text>
      </Pressable>
      {/* <Modal isOpen={modalOpen} onClose={onClose}>
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
              Networks
            </Text>
          </Flex>
          <Divider bg={"gray.800"} />
          <ChainName check i={0}>
            {chainToName(chain)} Network
          </ChainName>
          {Object.keys(providers)
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
            })}
        </Flex>
      </Modal> */}
      <SelectModal
        isOpen={modalOpen}
        onClose={onClose}
        title="Network"
        checked={`${chainToName(chain)} Network`}
        onPressOptions={(item: any) => {
          onClose();
          setTimeout(() => {
            setChain(item as Chains);
          }, 100);
        }}
        options={Object.keys(providers).filter((item) => item !== chain)}
        convertChainName
      />
    </Flex>
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
