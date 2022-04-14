import { Feather } from "@expo/vector-icons";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Modal,
  ScrollView,
  Text,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import Layout from "../../constants/Layout";
import { shrinkAddress } from "../../utils/utils";

export const Pay: React.FC = () => {
  const [amt, setAmt] = useState<number | undefined>();

  const toast = useToast();

  const address = "0xb91CC1FBCA90301807DF4B98f5A04f7Ce62a3806";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex p={5} h="full" align="center" justify="space-between">
      <Flex align="center">
        <Flex
          align="center"
          h={Layout.window.height / 2}
          justify="space-between"
          // bg="red.200"
        >
          <Flex direction="row" justify="center">
            <Flex
              position="absolute"
              // border="1px solid red"
              borderWidth="1px"
              p={2}
              // float="left"
              rounded="full"
              borderStyle="solid"
              borderColor="gray.500"
              w="fit-content"
              direction="row"
              flex="1"
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
            {/* <Tooltip label="Click here to read more" placement="bottom"> */}
            <Button
              variant="unstyled"
              bg="transparent"
              _focus={{ _hover: {} }}
              size="md"
              mr="-250"
              mt="1"
              onPress={() => setIsOpen(true)}
            >
              <Icon size="md" color="white" as={Feather} name="info" />
            </Button>
            {/* </Tooltip> */}
            <InfoModal modalVisible={isOpen} setModalVisible={setIsOpen} />
          </Flex>
          <Heading fontSize="4xl" w="full" textAlign="center">
            Send Money
          </Heading>
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
            h="70"
            w="80%"
            textAlign="center"
            variant="underlined"
            fontSize="3xl"
            fontFamily="mono"
          />
        </Flex>
      </Flex>
      <Button
        py="3"
        maxW={"500"}
        colorScheme="blue"
        borderRadius={"full"}
        mt="4"
        w="50%"
      >
        <Text fontWeight={"bold"}>
          Pay {amt === NaN || !amt ? "" : "₹" + amt?.toLocaleString()}
        </Text>
      </Button>
    </Flex>
  );
};

// @ts-nocheck
const InfoModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modalVisible, setModalVisible }) => {
  // const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="md">
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>What does this mean?</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>
                This symbol means that the receiver accepts money directly into
                their crypto wallet. The money you send will directly be
                transferred to their crypto wallet
              </Text>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
