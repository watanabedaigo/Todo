import React, { memo } from "react";
import { TodoCategoryList } from "./TodoCategoryList";
import { TodoRate } from "./TodoRate";
import { Box } from "@chakra-ui/react";

export const TodoListHead = memo(({ todoList, completedList, makeInCompletedList, makeCompletedList, setTodoList, setInCompletedList, setCompletedList, inCompletedList }) => {
  return (
    <Box w="100%" mt={{base: "4", md: "7"}} display={{base: "block", md:"flex"}} alignContent={{base: "auto", md:"baseline"}} flexDirection={{base: "auto", md:"row-reverse"}}>
      <TodoRate completedList={completedList}　inCompletedList={inCompletedList} />
      <TodoCategoryList makeInCompletedList={makeInCompletedList} makeCompletedList={makeCompletedList} todoList={todoList} setTodoList={setTodoList} setInCompletedList={setInCompletedList} setCompletedList={setCompletedList} inCompletedList={inCompletedList} completedList={completedList} />
    </Box>
  );
});