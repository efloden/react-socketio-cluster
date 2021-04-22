import React, { useRef, useEffect } from "react";

interface Props {
  submitUsername: Function;
}

function LoginPage({ submitUsername }: Props) {
  const inputRef: any = useRef(null);

  const focusInput = () => inputRef?.current?.focus();

  // focus username input on mount
  useEffect(() => focusInput(), []);

  // Detect when the client submits a username using the ENTER key
  const onKeyPress = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef!.current!.value === "") return;
    if (key === "Enter") {
      submitUsername(inputRef.current.value);
    }
  };

  return (
    <li className="login page" onClick={focusInput}>
      <div className="form">
        <h3 className="title">What's your nickname?</h3>
        <input
          ref={inputRef}
          className="usernameInput"
          type="text"
          maxLength={14}
          onKeyPress={onKeyPress}
        />
      </div>
    </li>
  );
}

export default LoginPage;
