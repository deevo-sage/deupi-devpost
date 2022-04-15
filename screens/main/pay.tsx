import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
} from 'native-base';
import React, { FC, useState } from 'react';
import SelectModal from '../../components/SelectModal';
import Layout from '../../constants/Layout';
import { RootStackParamList } from '../../utils/types';
import { chainToName, shrinkAddress } from '../../utils/utils';

export const Pay: FC<NativeStackScreenProps<RootStackParamList, 'Pay'>> = ({
  route,
}) => {
  const [amt, setAmt] = useState<number | undefined>();
  const toast = useToast();
  const [toPay, setToPay] = useState(route.params.toPay);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = () => {
    setModalOpen(false);
  };

  const [options, setOptions] = useState({
    INR: false,
    MATIC: true,
    ETH: false,
  });

  const symbols = {
    INR: '₹',
    MATIC: 'MATIC',
    ETH: 'ETH',
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
                fontFamily="UbuntuMono"
                onPress={() => {
                  toast.show({
                    title: 'Copied address to clipboard',
                    placement: 'bottom',
                    //   borderRadius: "0px",
                  });
                }}
              >
                {shrinkAddress(toPay || '')}
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
            borderBottomWidth="1"
            borderBottomColor="gray.600"
            _hover={{ borderBottomColor: 'gray.400' }}
            borderRadius="0px"
            style={{ fontFamily: 'UbuntuMono', outline: 'none' }}
            InputLeftElement={
              // options.INR ? (
              <Text m={3} fontSize="3xl" onPress={() => setModalOpen(true)}>
                {options.INR
                  ? (symbols as any)[
                      Object.keys(options).filter(
                        (e: any) => (options as any)[e],
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
                        (e: any) => (options as any)[e],
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
        maxW={'500'}
        colorScheme="blue"
        borderRadius={'full'}
        mt="4"
        w="50%"
      >
        <Text fontWeight={'bold'}>
          Pay{' '}
          {amt === NaN || !amt
            ? ''
            : options.INR
            ? '₹' + amt?.toLocaleString()
            : amt?.toLocaleString() +
              ' ' +
              (symbols as any)[
                Object.keys(options).filter((e: any) => (options as any)[e])[0]
              ]}
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
          <Modal.Header>
            <Text>What does this mean?</Text>
          </Modal.Header>
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
