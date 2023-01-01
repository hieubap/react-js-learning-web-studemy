import React from "react";
import { WrapperStyled } from "./styled";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import useCustomState from "../Common/useCustomState";
import axios from "axios";
import { headers, ModalError } from "../Common/CommonModal";
import { useHistory } from "react-router-dom";
import useToken from "../Common/useToken";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { storeFirebase } from "../../firebase";

export default function Welcome() {
  const [state, setState] = useCustomState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { setToken } = useToken();
  const LogIn = async () => {
    await axios
      .post(
        storeFirebase.api + "/account/login",
        {
          username: state.username,
          password: state.password,
        }
        // headers: headers,
      )
      .then(function (res) {
        console.log(res, "res");
        if (res.data.code === 0) {
          console.log(res.data.data.token, "helo");

          setToken(res.data.data.token);
          localStorage.setItem("userId", res.data.data.userId);
          history.push({ pathname: "/home" });
        } else {
          ModalError(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error, "err");
        ModalError("Đã xảy ra lỗi !!!");
      });
  };

  return (
    <WrapperStyled>
      <div>
        <img
          className="background"
          src={require("../../assets/background.jpg")}
        />
      </div>
      <div className="login-container">
        <div className="title">Welcome to course management system</div>
        <div className="d-flex input-container">
          <div className="text">Username : </div>
          <Input
            className="user"
            onChange={(e) => {
              setState({ username: e.target.value });
            }}
            placeholder="User..."
          />
        </div>
        <div className="d-flex input-container">
          <div className="text">Password : </div>
          <Input.Password
            className="password"
            onChange={(e) => {
              setState({ password: e.target.value });
            }}
            placeholder="Password..."
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="button-container">
          <Button onClick={LogIn}>Log In</Button>
        </div>
        <div className="sign-in">
          Don't Have an Account? <Link to="/register">Sign in here</Link>
        </div>
      </div>
    </WrapperStyled>
  );
}
