import React, { memo } from "react";
import { Textarea, Button, Input, Select, Flex, Text } from "@chakra-ui/react";

export const TodoAdd = memo(
  ({
    targetData,
    toggleButton,
    textarea,
    inputDate,
    select,
    errorText,
    handleAddTodoListItem,
    buttonText,
    placeholder,
    selectPlaceholder,
    leftIcon,
  }) => {
    return (
      <>
        <Flex
          align="center"
          justify={{ base: "space-between", md: "left" }}
          mt={{ base: "4", md: "8" }}
          w="100%"
        >
          <Input
            ref={inputDate}
            type="date"
            bgColor="white"
            borderColor="gray.400"
            w={{ base: "49%", md: "auto" }}
            mr={{ base: "0", md: "2" }}
          />
          <Select
            ref={select}
            placeholder={selectPlaceholder}
            bgColor="white"
            borderColor="gray.400"
            w={{ base: "49%", md: "auto" }}
          >
            <option value="WORK">WORK</option>
            <option value="PRIVATE">PRIVATE</option>
          </Select>
        </Flex>
        {/* useRef()で作成したrefオブジェクト(textarea)を、ref属性に指定することでこのDOMを参照させる */}
        <Textarea
          ref={textarea}
          placeholder={placeholder}
          bgColor="white"
          mt="2"
          borderColor="gray.400"
        />
        <Button
          ref={toggleButton}
          onClick={handleAddTodoListItem}
          colorScheme={targetData === "" ? "blue" : "green"}
          leftIcon={leftIcon}
          mt="2"
        >
          {buttonText}
        </Button>
        <Text ref={errorText} fontSize="sm" color="red" mt="2"></Text>
      </>
    );
  }
);
