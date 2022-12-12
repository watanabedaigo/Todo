import React, { memo } from "react";
import { List, Text, Box } from "@chakra-ui/react";
import { TodoCategoryItem } from "./TodoCategoryItem";

// sass読み込み
import classes from "./TodoCategoryItem.module.scss";

export const TodoCategoryList = memo(({ todoList, makeInCompletedList, makeCompletedList, setInCompletedList, setCompletedList, }) => {
  // 絞り込みで使用する配列定義
  const categoryAll = ["ALL", "WORK", "PRIVATE"];

  return (
    <Box w={{ base: "100%", md: "50%" }} pt={{ base: "0", md: "3" }} mt={{ base: "2", md: "0" }}>
      <Box w="100%" display={{ base: "block", md: "dlex" }}>
        <Text fontWeight="bold" mr={{ base: "0", md: "4" }} >FILTER </Text>
        <List display="flex">
          {/* 配列に対してmap()を使用し繰り返し処理を実行 */}
          {categoryAll.map((category) => (
            // Reactの繰り返し処理では、どの要素に変更があったかを把握させるためにkey属性を指定
            // 三項演算子を用いて、categoryがALLの場合はinitialClassというpropsにisActiveを格納、ALL以外の場合は空にして渡す
            < TodoCategoryItem initialClass={category === "ALL" ? classes.isActive : ""} key={category} makeInCompletedList={makeInCompletedList} makeCompletedList={makeCompletedList} todoList={todoList} setInCompletedList={setInCompletedList} setCompletedList={setCompletedList} category={category} ></TodoCategoryItem>
          ))}
        </List>
      </Box>
    </Box >
  );
});