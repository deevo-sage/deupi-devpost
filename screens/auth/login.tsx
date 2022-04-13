import React, { FC, Suspense, useRef, useState } from "react";
import { Button, Flex, Link, Switch, Text } from "native-base";

import { Canvas, useFrame } from "@react-three/fiber";
import Layout from "../../constants/Layout";
import { SafeInput } from "./import";
interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  const [bio, setBio] = useState(true);
  return (
    <Flex>
      <Flex h={Layout.window.height / 3} pt="32">
        <Suspense fallback="sad">
          <Canvas>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} />
            <Sphere position={[0, 0, 0]} />
          </Canvas>
        </Suspense>
      </Flex>
      <Flex align={"center"} pt="10">
        <Text fontSize={"4xl"} fontWeight="bold">
          Welcome Back!
        </Text>
        <SafeInput placeholder="Password" heading="Password" />
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

function Sphere(props: any) {
  const mesh = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (mesh.current.rotation.y += 0.001));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={3}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <sphereBufferGeometry />
      <meshStandardMaterial color={"white"} wireframe />
    </mesh>
  );
}
