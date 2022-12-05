import "./signup.css";
import { useSignup } from "../../hooks/useSignup";
import { useState, useEffect } from "react";
import { useDialogContext } from "../../hooks/useDialogContext";
import NormalDialog from "../../components/Dialog/normalDialog";
import validator from "validator";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  //ui
  const toRotate = ["Traders!"];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);

  const dataperiod = 2000;
  const { signup, error, status, isLoading } = useSignup();
  const { signupMssg, dispatch: dialogDispatch } = useDialogContext();

  let password_requirement = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: true,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 12,
    pointsForContainingUpper: 12,
    pointsForContainingNumber: 12,
    pointsForContainingSymbol: 12,
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(dataperiod);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, username, password, confirmPass);
    dialogDispatch({ type: "SIGNUP_MSSG" });
  };

  let passwordRequirementMssg = `
    Password Requirements:
      1. Minimum 8 characters
      2. Minimum 1 number
      3. Minimum 1 symbol
      4. Minimum 1 Uppercase Letter
      5. Minimum 1 Lower Letter
  `;

  const onChangePassword = (password) => {
    setPassword(password);
    setPasswordStrength(
      validator.isStrongPassword(password, password_requirement)
    );
  };

  const passwordScore = (passwordStrength) => {
    if (passwordStrength < 50) {
      return (
        //Weak Password
        <span
          style={{
            display: "block",
            border: "0px",
            background: "red",
            width: "50px",
            height: "30px",
          }}
        />
      );
    } else if (passwordStrength >= 50 && passwordStrength <= 60) {
      return (
        //Medium Password
        <span
          style={{
            display: "block",
            border: "0px",
            background: "yellow",
            width: "100px",
            height: "30px",
          }}
        />
      );
    } else {
      return (
        //Strong Password
        <span
          style={{
            display: "block",
            border: "0px",
            background: "green",
            width: "150px",
            height: "30px",
          }}
        />
      );
    }
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

  // validation on username
  const usernameOnKey = (e) => {
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
    var regex = new RegExp("^[a-zA-Z0-9 ]{1,1}$");
    if (regex.test(e.key)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div>
      <h5>SIGNUP</h5>
      <form className="signup" onSubmit={handleSubmit}>
        <input
          type="email"
          onKeyDown={(e) => emailOnKey(e)}
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          minLength="1"
          maxLength="50"
          onKeyDown={(e) => usernameOnKey(e)}
          type="username"
          placeholder="Create Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <span id="error"></span>

        <div className="flex-pass">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Create Password"
            onChange={(e) => onChangePassword(e.target.value)}
            value={password}
          />
          <span
            className="material-symbols-outlined"
            onClick={(e) => setShowPass(!showPass)}
          >
            visibility
          </span>
        </div>

        <div style={{ textAlign: "left" }}>
          {password && passwordScore(passwordStrength)}
        </div>

        <div className="flex-pass">
          <input
            type={showPass2 ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setconfirmPass(e.target.value)}
            value={confirmPass}
          />
          <span
            className="material-symbols-outlined"
            onClick={(e) => setShowPass2(!showPass2)}
          >
            visibility
          </span>
        </div>
        <br></br>
        <button disabled={isLoading}>Sign up</button>
        {signupMssg ? (
          <NormalDialog
            type="SIGNUP_MSSG"
            dialogTitle={status}
            dialogMessage={
              error === "Password is too weak" ? (
                <div>
                  <b>{error}</b>
                  {passwordRequirementMssg}
                </div>
              ) : (
                error
              )
            }
          />
        ) : null}
      </form>
    </div>
  );
};

export default Signup;
