import React, { FC, Suspense, useRef, useState } from "react";
import { Button, Flex, Link, Switch, Text, useToast, View } from "native-base";
// import { Canvas, useFrame } from "@react-three/fiber/native";
import Layout from "../../constants/Layout";
import { SafeInput } from "./import";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const [bio, setBio] = useState(true);
  const nav = useNavigation();
  const [pass, setPass] = useState<string | undefined>();

  const resolveLogin = (pass: string | undefined) => {
    AsyncStorage.getItem("password").then((e) => {
      if (e === pass) nav.navigate("Home");
      else
        toast.show({ title: "Incorrect Password", description: "Try Again" });
    });
  };

  const toast = useToast();

  return (
    <Flex align={"center"}>
      <View h={Layout.window.height / 4} pt="16">
        {/* <Suspense fallback="sad">
           <Canvas style={{ width: 400 }}>
             <ambientLight intensity={1} />
             <pointLight position={[10, 10, 10]} />
             <Sphere position={[0, 0, 0]} />
           </Canvas>
         </Suspense> */}
      </View>
      <Flex maxW={"650"} w="100%" align={"center"} pt="10">
        <Text fontSize={"4xl"} fontWeight="bold">
          Welcome Back!
        </Text>
        <SafeInput
          value={pass}
          showHide
          onChangeText={(e) => setPass(e)}
          placeholder="Password"
          heading="Password"
        />
        <Flex mt="6" direction="row" w="80%" justify={"space-between"}>
          <Text>Unlock with Biometric?</Text>
          <Switch
            value={bio}
            onValueChange={(val) => setBio(val)}
            colorScheme={"blue"}
          />
        </Flex>
        <Button
          mt="8"
          py="3"
          w="80%"
          maxW={"500"}
          borderRadius="full"
          colorScheme={"blue"}
          disabled={!pass}
          onPress={() => {
            resolveLogin(pass);
          }}
        >
          UNLOCK
        </Button>
        <Text mt="8" lineHeight={"sm"} maxW="290" textAlign={"center"}>
          Wallet won't unlock? You can ERASE your current wallet and setup a new
          one
        </Text>
        <Link>
          <Text
            color={"blue.500"}
            fontWeight="semibold"
            letterSpacing={"lg"}
            mt="4"
          >
            Leave yourself a hint?
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

// function Sphere(props: any) {
//   const mesh = useRef<any>(null);
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   useFrame((state, delta) => (mesh.current.rotation.y += 0.001));
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={3}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}
//     >
//       <sphereBufferGeometry />
//       <meshStandardMaterial color={"white"} wireframe />
//     </mesh>
//   );
// }
