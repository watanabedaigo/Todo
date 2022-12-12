import React, { memo } from "react";
import { ListItem } from "@chakra-ui/react";

// sass読み込み
import classes from "./TodoCategoryItem.module.scss";

export const TodoCategoryItem = memo(({ initialClass, makeInCompletedList, makeCompletedList, todoList, setInCompletedList, setCompletedList, category }) => {
  // 変数定義
  // 三項演算子
  let color;
  if (category === "WORK") {
    color = "#696969";
  } else if (category === "PRIVATE") {
    color = "#ffd700";
  } else if (category === "ALL") {
    color = "#4169e1";
  }

  // 関数定義
  // onClickの際に発火する関数
  const handleFilter = (e) => {
    // クラス付与、削除
    // 全ての要素を配列で取得
    const itemAll = Array.prototype.slice.call(e.currentTarget.closest("ul").children);
    // 配列に対して繰り返し処理を行いisActiveクラスを削除
    itemAll.forEach(function(item) {
      if(item.classList.contains(classes.isActive)) {
        item.classList.remove(classes.isActive);
      }
    });
    // クリックされた要素にisActiveクラスを付与
    e.currentTarget.classList.add(classes.isActive);

    // 変数定義
    // クリックされた要素の内容を取得
    const targetCategory = e.currentTarget.textContent;

    // State更新
    // 未完了
    // todolist（配列）をカテゴリーで絞り込む
    let inCompletedListFilter;
    if (targetCategory === "ALL") {
      inCompletedListFilter = todoList;
    } else {
      inCompletedListFilter = todoList.filter((item) => {
        return item.category === targetCategory;
      });
    }
    // 完了未完了でさらに絞り込み、State変数を更新
    makeInCompletedList(inCompletedListFilter);

    // 完了
    // todolist（配列）をカテゴリーで絞り込む
    let completedListFilter;
    if (targetCategory === "ALL") {
      completedListFilter = todoList;
    } else {
      completedListFilter = todoList.filter((item) => {
        return item.category === targetCategory;
      });
    }
    // 完了未完了でさらに絞り込み、State変数を更新
    makeCompletedList(completedListFilter);
  };

  return (
    <ListItem className={[classes.todoCategoryItem, initialClass].join(' ').trim()} onClick={handleFilter} w="87px" bg={color} color="white" mr={{ base: "1", md: "4" }} display="inline-block" textAlign="center" fontWeight="bold" borderRadius="10px">{category}</ListItem>
  );
});