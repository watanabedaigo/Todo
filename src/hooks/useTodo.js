import { useState, useEffect } from "react";
import { ulid } from "ulid";

// todos.jsでexportした関数を、todoDataオブジェクトとしてまとめてimport
import * as todoData from "../apis/todos";

// カスタムフック定義
export const useTodo = () => {
  // State
  // State変数の初期値は空の配列
  const [todoList, setTodoList] = useState([]);
  const [inCompletedList, setInCompletedList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [targetData, setTargetData] = useState("");
  const [buttonText, setButtonText] = useState("Add");


  // 副作用定義
  // 特定のStateが変化した際の処理を設定。今回が依存配列が空なので、初回レンダリング時に処理が実行される(loadイベントのようなイメージ)
  useEffect(() => {
    // モックサーバーからデータを取得
    // 関数をtodoDataオブジェクトとしてまとめてimportしているので、「オブジェクト.メソッド」という書き方で関数を実行
    // then()の引数で、データの取得に成功した際の処理を指定
    todoData.getAllTodosData().then((todoAll) => {
      // State関数でState変数を変更
      // 都度スプレット構文で配列を展開して新しい配列を作成
      setTodoList([...todoAll]);
      makeInCompletedList(todoAll);
      makeCompletedList(todoAll);
    });
  }, []);

  // 関数定義
  // 完了、未完了リストを作成、State更新する関数
  // 未完了
  const makeInCompletedList = (list) => {
    const inCompletedListAll = list.filter((todo) => {
      return !todo.done;
    });
    // 締め切り近い順で並び替え、新しい配列を作成
    const inCompletedListInitial = inCompletedListAll.sort((a, b) => {
      if (a.dead > b.dead) {
        return 1;
      } else {
        return -1;
      }
    });
    setInCompletedList([...inCompletedListInitial]);
  };

  // 完了
  const makeCompletedList = (list) => {
    const completedListAll = list.filter((todo) => {
      return todo.done;
    });
    // 締め切り近い順で並び替え、新しい配列を作成
    const completedListInitial = completedListAll.sort((a, b) => {
      if (a.dead > b.dead) {
        return 1;
      } else {
        return -1;
      }
    });
    setCompletedList([...completedListInitial]);
  };

  // 更新
  const toggleTodoListItemStatus = (id, done) => {
    // find()で配列から条件に合う要素を見つけ、初めにtrueになった要素を返す
    const todoItem = todoList.find((item) => item.id === id);

    // doneを反転
    const newTodoItem = { ...todoItem, done: !done };

    todoData.updateTodoData(id, newTodoItem).then((updateTodo) => {
      const newTodoList = todoList.map((item) =>
        // 三項演算子 
        item.id !== updateTodo.id ? item : updateTodo
      );

      // State関数でState変数を変更
      setTodoList(newTodoList);
      makeInCompletedList(newTodoList);
      makeCompletedList(newTodoList);
    });
  };

  // 追加
  const addTodoListItem = (todoContent, tododead, select) => {
    const newTodoItem = {
      content: todoContent,
      done: false,
      id: ulid(),
      dead: tododead,
      category: select
    };

    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      // State関数でState変数を変更
      setTodoList([addTodo, ...todoList]);
      makeInCompletedList([addTodo, ...todoList]);
      makeCompletedList([addTodo, ...todoList]);
    });
  };

  // 削除
  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      // filter()で条件を満たす要素のみ抽出し、新しい配列を作成
      const newTodoList = todoList.filter(
        (item) => item.id !== deleteListItemId
      );

      setTodoList(newTodoList);
      makeInCompletedList(newTodoList);
      makeCompletedList(newTodoList);
    });
  };

  // State変数、作成した関数を返す
  return {
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
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem
  };
};