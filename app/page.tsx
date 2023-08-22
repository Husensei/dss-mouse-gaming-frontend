"use client";

import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import { Button, Card, Flex, Text, Title } from "@tremor/react";
import Link from "next/link";

export default function Home() {
  return (
    <Card className="w-screen h-screen bg-[#0F1729]">
      <Flex flexDirection="row" justifyContent="center" alignItems="center" className="h-full">
        <Flex flexDirection="col" justifyContent="center" alignItems="center">
          <Title className="w-full font-bold text-[#C8CAD0] text-8xl text-center">AIMZ</Title>
          <Text className="font-bold text-[#C8CAD0] text-xl text-center">
            {"> "}
            <Typewriter words={["Level up your game with precision choice!", "Choose wisely, conquer effortlessly!"]} loop={0} cursor cursorStyle="_" cursorBlinking typeSpeed={50} deleteSpeed={50} delaySpeed={1500} />
          </Text>
          <Link href={"/alternative"}>
            <Button size="xs" className="w-[120px] px-3 py-3 bg-[#1D283A] text-lg text-[#C8CAD0] border border-none rounded-lg mt-5">
              Try it now!
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}
