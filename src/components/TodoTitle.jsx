import { Heading } from "@chakra-ui/react";
import React, { memo } from "react";

export const TodoTitle = memo(({ title, as, fontSize, mt, textAlign }) => {
  return (
    <Heading mt={mt} as={as} fontSize={fontSize} w="full" textAlign={textAlign}>
      {title}
    </Heading>
  );
});