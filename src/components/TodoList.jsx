import { List, Box } from "@chakra-ui/react";
import React, { memo } from "react";
import { TodoTitle } from "./TodoTitle";
import { TodoItem } from "./TodoItem";

export const TodoList = memo(({ setButtonText, targetData, setTargetData, toggleButton, todoAll, textarea, inputDate, select, todoList, toggleTodoListItemStatus, deleteTodoListItem, title, as, fontSize }) => {
  return (
    <>
      {todoList.length !== 0 && (
        <Box w="100%">
          <TodoTitle title={title} as={as} fontSize={fontSize} mt={{base:"2", md:"4"}} />
          <List w="full">
            {/* 配列に対してmap()を使用し繰り返し処理を実行 */}
            {todoList.map((todo) => (
              // Reactの繰り返し処理では、どの要素に変更があったかを把握させるためにkey属性を指定
              <TodoItem setButtonText={setButtonText} targetData={targetData} setTargetData={setTargetData} toggleButton={toggleButton} todoAll={todoAll} textarea={textarea} inputDate={inputDate} select={select}  todo={todo} key={todo.id} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} />
            ))}
          </List>
        </Box>
      )}
    </>
  );
});