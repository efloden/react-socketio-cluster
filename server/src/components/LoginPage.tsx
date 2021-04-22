interface Props {
  submitUsername: Function;
  setUsername: Function;
}

function LoginPage({ submitUsername, setUsername }: Props) {
  return (
    <li className="login page">
      <div className="form">
        <h3 className="title">What's your nickname?</h3>
        <input
          className="usernameInput"
          type="text"
          maxLength={14}
          onKeyPress={({ key }) => key === "Enter" && submitUsername()}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </li>
  );
}

export default LoginPage;
