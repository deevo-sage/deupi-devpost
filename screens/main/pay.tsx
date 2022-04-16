import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ethers } from "ethers";
import {
  Avatar,
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
import React, { FC, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import SelectModal from "../../components/SelectModal";
import Layout from "../../constants/Layout";
import { phraseAtom } from "../../recoil";
import { ABI, getProvider, walletFromPhrase } from "../../utils";
import { RootStackParamList } from "../../utils/types";
import { chainToName, shrinkAddress } from "../../utils/utils";

export const Pay: FC<NativeStackScreenProps<RootStackParamList, "Pay">> = ({
  route,
}) => {
  const [amt, setAmt] = useState<number | undefined>();
  const toast = useToast();
  const [toPay, setToPay] = useState(route.params.toPay);
  const method = route.params.receiverAccepts;
  // let phrase, provider, wallet;
  const [loading, setLoading] = useState<boolean>(false);
  const phrase = useRecoilValue(phraseAtom);
  const provider = useMemo(() => getProvider("maticmum"), []);
  const wallet = useMemo(() => walletFromPhrase(provider, phrase || ""), []);

  // console.log(phrase, provider, wallet);

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpenPay, setIsOpenPay] = useState(false);

  const onClose = () => {
    setModalOpen(false);
  };

  const onClosePay = () => {
    setIsOpenPay(false);
  };

  const [options, setOptions] = useState({
    INR: false,
    MATIC: true,
    ETH: false,
  });

  const symbols = {
    INR: "₹",
    MATIC: "MATIC",
    ETH: "ETH",
  };

  const resolvePay = async () => {
    setLoading(true);
    const nav = useNavigation();
    setIsOpenPay(false);
    const balance = await wallet?.getBalance();
    const amount = ethers.utils.parseEther(`${amt || 0}`);

    if (!balance?.gte(amount)) {
      toast.show({
        title: "Insufficient Balance In Your Wallet",
      });
    }

    if (method === "UPI") {
      const contract = new ethers.Contract(
        "0x0CE46bf8d1f3C12FC16Cfa9aD0863Ef68f430213",
        ABI,
        wallet
      );
      const x = await contract.functions.pay(toPay, amount, {
        value: amount,
      });
    } else if (method === "CRYPTO") {
      sendTrasaction(toPay || "", `${amt || 0}`);
    }
    nav.navigate("Success", {
      payedTo: toPay,
      amount: amt || 0,
      crypto: "MATIC",
      receiverAccepted: method,
    });
  };
  const sendTrasaction = async (to_address: string, val: string) => {
    // const mne = phrase || "";
    const gas_limit = 100000;
    // const provider = getProvider("maticmum");
    // const wallet = walletFromPhrase(provider, mne);
    const tx = {
      from: wallet?.address,
      to: to_address,
      value: ethers.utils.parseEther(val),
      nonce: await provider.getTransactionCount(
        wallet?.address || "",
        "latest"
      ),
      // gasLimit: ethers.utils.hexlify(gas_limit), // 100000
      // gasPrice: ethers.utils.hexlify(gas_limit / 10),
    };
    // console.log(tx);
    if (wallet)
      wallet
        .sendTransaction(tx)
        .then(async (transaction) => {
          // console.log(transaction);
          await transaction.wait();

          // alert("Send finished!");
        })
        .catch((err) => console.log(err));
  };

  return (
    <Flex p={5} h="full" align="center" justify="space-between">
      <Flex align="center">
        <Flex
          align="center"
          h={Layout.window.height / 2}
          justify="space-between"
          // bg="red.200"
        >
          <Flex mt="5" direction="row" justify="center">
            <Flex
              // position="absolute"
              // border="1px solid red"
              borderWidth="1px"
              p={2}
              // float="left"
              rounded="full"
              borderStyle="solid"
              borderColor="gray.500"
              direction="row"
              // flex="1"
              align="center"
              justify="center"
            >
              <Text mx={2} fontSize="lg" color="gray.400" fontWeight="semibold">
                To
              </Text>

              {method === "CRYPTO" ? (
                <Icon mx={1} as={Feather} size="20px" name="box"></Icon>
              ) : (
                <Avatar
                  mx={1}
                  p="auto"
                  size="20px"
                  bg="red"
                  source={{
                    uri: "https://symbols.getvecta.com/stencil_99/27_upi-icon.5c435dac48.svg",
                  }}
                />
              )}
              <Text
                mr={2}
                fontSize="xl"
                fontWeight="semibold"
                fontFamily="UbuntuMono"
                onPress={() => {
                  toast.show({
                    title: "Copied address to clipboard",
                    placement: "bottom",
                    //   borderRadius: "0px",
                  });
                }}
              >
                {shrinkAddress(toPay || "")}
              </Text>
            </Flex>
            {/* <Tooltip label="Click here to read more" placement="bottom"> */}
            <Button
              variant="unstyled"
              bg="transparent"
              _focus={{ _hover: {} }}
              size="md"
              // mr="-250"
              // position="absolute"
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
            borderBottomWidth="1"
            borderBottomColor="gray.600"
            _hover={{ borderBottomColor: "gray.400" }}
            borderRadius="0px"
            // focusOutlineColor="black"
            style={{ fontFamily: "UbuntuMono" }}
            InputLeftElement={
              // options.INR ? (
              <Text m={3} fontSize="3xl" onPress={() => setModalOpen(true)}>
                {options.INR
                  ? (symbols as any)[
                      Object.keys(options).filter(
                        (e: any) => (options as any)[e]
                      )[0]
                    ]
                  : undefined}
              </Text>
              // ) : undefined
            }
            InputRightElement={
              !options.INR ? (
                <Text m={3} fontSize="3xl" onPress={() => setModalOpen(true)}>
                  {
                    (symbols as any)[
                      Object.keys(options).filter(
                        (e: any) => (options as any)[e]
                      )[0]
                    ]
                  }
                </Text>
              ) : undefined
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
            variant="unstyled"
            fontSize="3xl"
            fontFamily="mono"
          />
          <SelectModal
            isOpen={modalOpen}
            onClose={onClose}
            title="Choose a Payment Method"
            checked={
              Object.keys(options).filter((e: any) => (options as any)[e])[0]
            }
            onPressOptions={(item: any) => {
              setOptions((r: any) => {
                let e = JSON.parse(JSON.stringify(r));
                for (const k in e) {
                  if (e[k]) e[k] = false;

                  e[item] = true;
                }
                return e;
              });
              onClose();
            }}
            options={Object.keys(options).filter((e: any) => {
              if (!(options as any)[e]) return e;
            })}
            // convertChainName
          />
        </Flex>
      </Flex>
      <Button
        py="3"
        maxW={"500"}
        colorScheme="blue"
        isDisabled={amt === NaN || !amt}
        borderRadius={"full"}
        mt="4"
        w="50%"
        isLoading={loading}
        onPress={() => {
          setIsOpenPay(true);
        }}
      >
        <Text fontWeight={"bold"}>
          Pay{" "}
          {amt === NaN || !amt
            ? ""
            : options.INR
            ? "₹" + amt?.toLocaleString()
            : amt?.toLocaleString() +
              " " +
              (symbols as any)[
                Object.keys(options).filter((e: any) => (options as any)[e])[0]
              ]}
        </Text>
      </Button>
      <PayModal
        modalVisible={isOpenPay}
        setModalVisible={onClosePay}
        toPay={toPay}
        method={method}
        address={wallet?.address}
        amount={amt || 0}
        resolvePay={resolvePay}
        crypto={
          (symbols as any)[
            Object.keys(options).filter((e: any) => (options as any)[e])[0]
          ]
        }
      />
    </Flex>
  );
};

// @ts-nocheck
const InfoModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  method?: "CRYPTO" | "UPI";
}> = ({ modalVisible, setModalVisible, method = "CRYPTO" }) => {
  // const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="md">
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>
            <Text>What does this mean?</Text>
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>
                {method === "CRYPTO"
                  ? "This symbol means that the receiver accepts money directly into their crypto wallet. The money you send will directly be transferred to their crypto wallet"
                  : "This symbol means that the receiver accepts money in INR. The money you send will directly be converted to INR and sent to the receiver"}
              </Text>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

// @ts-nocheck
const PayModal: React.FC<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toPay: string | undefined;
  method: "UPI" | "CRYPTO" | undefined;
  address: string | undefined;
  amount: number;
  crypto: string;
  resolvePay?: any;
}> = ({
  modalVisible,
  setModalVisible,
  toPay,
  method,
  address,
  amount,
  crypto,
  resolvePay,
}) => {
  // const [modalVisible, setModalVisible] = React.useState(false);
  const nav = useNavigation();
  // console.log({ toPay });
  return (
    <>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="md">
        <Modal.Content maxH="512">
          <Modal.CloseButton />
          <Modal.Header>
            <Text>Review Payment</Text>
          </Modal.Header>
          <Modal.Body>
            {/* <ScrollView> */}
            <InfoRow
              text1="From"
              text2={shrinkAddress(address || "")}
              border={false}
            />
            <InfoRow
              text1="To"
              text2={method === "CRYPTO" ? shrinkAddress(toPay || "") : toPay}
              border={false}
            />
            <InfoRow
              text1="Amount"
              text2={`${amount} ${crypto}`}
              border={false}
            />
            {/* </ScrollView> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              colorScheme={"blue"}
              py="3"
              mt="4"
              mx="2"
              maxW={"500"}
              borderRadius={"full"}
              borderColor={"blue.500"}
              borderWidth="2"
              variant={"outline"}
              // w="80%"
              onPress={() => {
                nav.navigate("Home");
              }}
            >
              <Text color="blue.500" fontWeight={"bold"}>
                Cancel
              </Text>
            </Button>
            <Button
              py="3"
              maxW={"500"}
              colorScheme="blue"
              // isDisabled={amt === NaN || !amt}
              borderRadius={"full"}
              mt="4"
              w="50%"
              onPress={() => {
                resolvePay();
              }}
            >
              <Text fontWeight={"bold"}>Sign Transaction</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const InfoRow: React.FC<{
  text1?: string;
  text2?: string;
  border?: boolean;
}> = ({ text1, text2, border = true }) => {
  return (
    <Flex
      // position="absolute"
      // border="1px solid red"
      borderWidth="1px"
      p={2}
      // float="left"
      rounded="full"
      borderStyle={border ? "solid" : "none"}
      // borderColor={"gray.500"}
      direction="row"
      flex="1"
      align="center"
      justify="center"
    >
      <Text mx={2} fontSize="lg" color="gray.400" fontWeight="semibold">
        {text1}
      </Text>

      <Text mr={2} fontSize="xl" fontWeight="semibold" fontFamily="UbuntuMono">
        {text2}
      </Text>
    </Flex>
  );
};
