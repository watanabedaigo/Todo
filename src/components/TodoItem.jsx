import React, { memo } from "react";
import { ListItem, Text, Flex, Button, IconButton, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

// sass読み込み
import classes from "./TodoItem.module.scss";

export const TodoItem = memo(({ setButtonText, targetData, setTargetData, toggleButton, todoAll, textarea, inputDate, select, todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
  // 関数定義
  // 完了ボタンのonCklickの際の関数
  const handleToggleTodoListItemStatus = () => toggleTodoListItemStatus(todo.id, todo.done);

  // 編集ボタンのonClickの際の関数
  const handleEditTodoListItem = (e) => {
    // 該当要素で表示しているjsonデータのid取得
    const targetItem = e.currentTarget.closest("li");
    const targetItemId = targetItem.getAttribute("id");

    // id属性が一致するデータを抽出
    const targetData = todoAll.find((item) => {
      return item.id === targetItemId;
    });

    // State変数を変更
    setTargetData(targetData);

    // 抽出したデータの内容をフォームに表示
    textarea.current.value = targetData.content;
    inputDate.current.value = targetData.dead;
    select.current.value = targetData.category;

    // buttonText(State)を更新し、ボタンの表示変更
    setButtonText("Edit");
  };

  // 削除ボタンのonCLickの際の関数
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  // 三項演算子
  const label = todo.done ? "Not Yet" : "Done";
  const setColorScheme = todo.done ? "pink" : "blue";
  let color;
  if (todo.category === "WORK") {
    color = "#696969";
  } else if (todo.category === "PRIVATE") {
    color = "#ffd700";
  };

  // 日にち表示変換
  const date = todo.dead;
  const afterDate = date.replace(/-/g, "/");

  // 締め切りが今日の場合の表示切り替え
  // 今日の日付取得
  const newDate = new Date();
  const year = newDate.getFullYear();
  let month;
  if(newDate.getMonth() + 1 < 10) {
    month = `0${newDate.getMonth() + 1}`
  } else {
    month = newDate.getMonth() + 1
  }
  let day;
  if(newDate.getDate() < 10) {
    day = `0${newDate.getDate()}`
  } else {
    day = newDate.getDate()
  }
  const today = `${year}/${month}/${day}`

  return (
    // 三項演算子を用いて、今日がafterDateと一致する場合は特定のクラスを付与
    <ListItem className={today === afterDate ? classes.isDead : "".trim()} borderWidth="1px" py="2" px="4" mt={{ base: "2", md: "4" }} bg="white" borderRadius="md" borderColor="gray.300" id={todo.id}>
      <Box>
        <Text w="87px" bg={color} color="white" mr="2" display={{ base: "block", md: "inline-block" }} textAlign="center" fontWeight="bold" borderRadius="10px">{todo.category}</Text>
        <Text display="inline-block">{todo.content}</Text>
      </Box>
      <Flex alignItems="center" justify="flex-end">
        <Text fontSize="sm" mr="3" color="red" >締め切り：{today === afterDate ? "today!!!!!" : afterDate}</Text>
        <Button colorScheme="green" variant="outline" size="sm" mr="2" onClick={handleEditTodoListItem} >
          Edit
        </Button>
        <Button colorScheme={setColorScheme} variant="outline" size="sm" onClick={handleToggleTodoListItemStatus}>
          {label}
        </Button>
        <IconButton icon={<DeleteIcon />} variant="unstyled" area-label="delete" onClick={handleDeleteTodoListItem} />
      </Flex>
    </ListItem>
  );
});