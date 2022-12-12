import React, { memo } from "react";
import { Text, Flex } from "@chakra-ui/react";

export const TodoRate = memo(({ completedList, inCompletedList }) => {
  // 変数定義
  const completedListNum = completedList.length;
  const inCompletedListNum = inCompletedList.length;
  const doneRate = Math.floor(completedListNum / (completedListNum + inCompletedListNum) * 100);

  return (
    <Flex fontSize={{ base: "md", md: "xl" }} fontWeight="bold" align="baseline" w={{ base: "100%", md: "50%" }} justify={{ base: "left", md: "right" }} >
      達成率<Text fontSize={{ base: "3xl", md: "4xl" }} ml="2" lineHeight="1" >{`${doneRate}%`}</Text>
    </Flex>
  );
});