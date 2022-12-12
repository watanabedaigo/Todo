import axios from "axios";

// モックサーバーURLを扱う変数定義
const todoDataUrl = "http://localhost:3100/todo";

// モックサーバーからデータを取得する関数を定義
export const getAllTodosData = async () => {
  // 取得したデータを扱う変数定義
  const response = await axios.get(todoDataUrl);

  // 通信後戻り値としてデータを返す
  return response.data;
};

// モックサーバーにデータを追加する関数を定義
export const addTodoData = async (todo) => {
  // postでは第2引数に追加したデータを指定
  const response = await axios.post(todoDataUrl, todo);

  return response.data
};

// モックサーバーのデータを削除する関数を定義
export const deleteTodoData = async (id) => {
  await axios.delete(`${todoDataUrl}/${id}`);

  return id;
};

// モックサーバーのデータを更新する関数を定義
export const updateTodoData = async (id, todo) => {
  // putでは第1引数に更新対象のデータ、第2引数に更新後の値を指定
  const response = await axios.put(`${todoDataUrl}/${id}`, todo);

  return response.data;
};