import React from "react";
import { useState, useEffect } from "react";
import NormalDialog from "../../components/Dialog/normalDialog";
import { useDialogContext } from "../../hooks/useDialogContext";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login, isLoading, error, status } = useLogin();
  const { loginMssg, dispatch: dialogDispatch } = useDialogContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    dialogDispatch({ type: "LOGIN_MSSG" });
  };

  // validation on email
  const emailOnKey = (e) => {
    if (
      [
        "Backspace",
        "Delete",
        "Home",
        "End",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(e.key)
    ) {
      return false;
    }
    var regex = new RegExp("^[a-zA-Z0-9.@ ]{1,1}$");
    if (regex.test(e.key)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div>
      <h5>LOGIN</h5>
      <form className="login" onSubmit={handleSubmit}>
        <input
          onKeyDown={(e) => emailOnKey(e)}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br></br>

        <div className="flex-pass">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span
            className="material-symbols-outlined"
            onClick={(e) => setShowPass(!showPass)}>
            {" "}
            visibility{" "}
          </span>
        </div>

        <br></br>
        <button disabled={isLoading}>Login</button>
        {loginMssg ? (
          <NormalDialog
            type="LOGIN_MSSG"
            dialogTitle={status}
            dialogMessage={error}
          />
        ) : null}
      </form>
    </div>
  );
};

export default Login;
