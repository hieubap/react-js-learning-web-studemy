import { Button, Input } from "antd";
import React from "react";
import useCustomState from "../Common/useCustomState";
import { WrapperStyled } from "./styled";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { ModalError } from "../Common/CommonModal";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
import { storeFirebase } from "../../firebase";

export default function Register() {
  const history = useHistory();
  const [state, setState] = useCustomState({
    username: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    email: "",
    error: false,
  });
  const handleRegister = async () => {
    if (state.password === state.passwordConfirm) {
      setState({ error: false });
      await axios
        .post(storeFirebase.api + `/account/register`, {
          username: state.username,
          password: state.password,
          phone: state.phone,
          email: state.email,
          role: 2,
        })
        .then(function (res) {
          console.log(res, "res");
          if (res.data.code === 0) {
            Modal.success({
              content: <b>Register successfully !!!</b>,
              onOk() {
                history.push({ pathname: "/" });
              },
            });
          } else {
            ModalError(res.data.message);
          }
        })
        .catch(function (error) {
          console.log(error, "err");
        });
    } else {
      setState({ error: true });
    }
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
        <div className="title">Register</div>
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
        <div className="d-flex input-container">
          <div className="text">Confirm password : </div>
          <Input.Password
            className="password"
            onChange={(e) => {
              setState({ passwordConfirm: e.target.value });
            }}
            placeholder="Password..."
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        {state.error && (
          <div className="warning">Entered password does not match</div>
        )}
        <div className="d-flex input-container">
          <div className="text">Email : </div>
          <Input
            className="user"
            onChange={(e) => {
              setState({ email: e.target.value });
            }}
            placeholder="User..."
          />
        </div>
        <div className="d-flex input-container">
          <div className="text">Phone : </div>
          <Input
            className="user"
            onChange={(e) => {
              setState({ phone: e.target.value });
            }}
            placeholder="User..."
          />
        </div>
        <div className="button-container">
          <Button onClick={handleRegister}>Log In</Button>
        </div>
      </div>
    </WrapperStyled>
  );
}
