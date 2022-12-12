import { useRef } from "react";
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoListHead } from "./TodoListHead";
import { TodoList } from "./TodoList";
import { Container } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
// todos.jsでexportした関数を、todoDataオブジェクトとしてまとめてimport
import * as todoData from "../apis/todos";

function App() {
  // 変数定義

  // カスタムフックの戻り値を分割代入で変数に代入
  const {
    todoList,
    setTodoList,
    inCompletedList,
    setInCompletedList,
    completedList,
    setCompletedList,
    targetData,
    setTargetData,
    buttonText,
    setButtonText,
    makeInCompletedList,
    makeCompletedList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem
  } = useTodo();

  // useRefでRefオブジェクト作成
  // 参照したい要素のref属性にこのオブジェクトを指定する。そうすることでRefオブジェクトのcurrentプロパティでその要素にアクセスすることができるようになる
  const textarea = useRef(null);
  const inputDate = useRef(null);
  const select = useRef(null);
  const errorText = useRef(null);
  const toggleButton = useRef(null);

  // 関数定義
  // 追加ボタンのonCklickの際の関数
  const handleAddTodoListItem = () => {
    if (targetData === "") {
      // 新規追加の場合の処理
      if (textarea.current.value === "" || inputDate.current.value === "" || select.current.value === "") {
        errorText.current.textContent = "未入力項目があります。";
      } else {
        errorText.current.textContent = "";

        // 入力値を引数として渡し、addTodoListItem関数でデータ追加
        addTodoListItem(textarea.current.value, inputDate.current.value, select.current.value);

        // フォームを空にする
        textarea.current.value = "";
        inputDate.current.value = "";
        select.current.value = "";
      }
    } else {
      // 編集の場合の処理（targetData(State)に値が入っているため）
      // Stateのプロパティを入力値に上書き
      targetData.content = textarea.current.value;
      targetData.dead = inputDate.current.value;
      targetData.category = select.current.value;

      // モックサーバーのデータを更新
      todoData.updateTodoData(targetData.id, targetData).then((updateTodo) => {
        const newTodoList = todoList.map((item) =>
          // 三項演算子 
          item.id !== updateTodo.id ? item : updateTodo
        );
      });

      // フォームを空にする
      textarea.current.value = "";
      inputDate.current.value = "";
      select.current.value = "";

      // ボタンの表示の状態を扱うState変数を更新し、表示内容を変更
      setButtonText("Add");
    }

    // 編集対象のデータの状態を扱うState変数更新し、空にする
    setTargetData("");
  };

  return (
    // 不要な要素を作らないようにフラグメントを使用
    <Container centerContent px="6" py={{ base: "4", md: "8" }} maxWidth="3xl">
      <TodoTitle title="TODO" as="h1" fontSize={{ base: "2xl", md: "3xl" }} textAlign="center" />
      {/* 三項演算子を用いて、Stateの状態に応じて表示するアイコンを切り替え */}
      <TodoAdd targetData={targetData} toggleButton={toggleButton} textarea={textarea} inputDate={inputDate} select={select} errorText={errorText} handleAddTodoListItem={handleAddTodoListItem} buttonText={buttonText} placeholder="ADD TODO" selectPlaceholder="SELECT CATEGORY" leftIcon={targetData === "" ? <AddIcon /> : <EditIcon />} />
      <TodoListHead todoList={todoList} completedList={completedList} makeInCompletedList={makeInCompletedList} makeCompletedList={makeCompletedList} setTodoList={setTodoList} setInCompletedList={setInCompletedList} setCompletedList={setCompletedList} inCompletedList={inCompletedList} />
      <TodoList setButtonText={setButtonText} targetData={targetData} setTargetData={setTargetData} toggleButton={toggleButton} todoAll={todoList} textarea={textarea} inputDate={inputDate} select={select} todoList={inCompletedList} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} title="InCompleted" as="h2" fontSize={{ base: "xl", md: "2xl" }} />
      <TodoList setButtonText={setButtonText} targetData={targetData} setTargetData={setTargetData} toggleButton={toggleButton} todoAll={todoList} textarea={textarea} inputDate={inputDate} select={select} todoList={completedList} toggleTodoListItemStatus={toggleTodoListItemStatus} deleteTodoListItem={deleteTodoListItem} title="Completed" as="h2" fontSize={{ base: "xl", md: "2xl" }} />
    </Container>
  );
}

export default App;