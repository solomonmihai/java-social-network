import { useState } from "react";

import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function PasswordInput({ ...props }) {
  const [view, setView] = useState(false);

  return (
    <InputGroup>
      <Input type={view ? "text" : "password"} {...props} />;
      {props.value && (
        <InputRightElement>
          <IconButton
            size="xs"
            icon={view ? <ViewOffIcon /> : <ViewIcon />}
            onMouseDown={() => setView(true)}
            onMouseUp={() => setView(false)}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
