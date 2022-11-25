import styled from "styled-components";

export const WrapperStyled = styled.div`
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99999;
    width: 100%;
    height: 100%;
  }
  .login-container {
    position: absolute;
    top: 15vh;
    left: 15vh;
    width: 350px;
    height: 320px;
    background: white;
    border-radius: 2vw;
    .title {
      padding-top: 20px;
      text-align: center;
      margin: auto;
      width: 70%;
      font-size: 21px;
      color: #40c7a7;
      font-weight: 700;
      margin-bottom: 32px;
    }
    .input-container {
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
      justify-content: space-between;
      input.user {
        width: 70%;
      }
      span.ant-input-password {
        width: 70%;
      }
      .text {
        padding-top: 4.5px;
        text-align: end;
        width: 25%;
      }
    }
    .button-container {
      width: 50%;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: auto;
      margin-right: auto;
      button {
        color: white;
        width: 100%;
        border-radius: 10px;
        background: #40c7a7;
      }
      .ant-btn:hover,
      .ant-btn:focus {
        filter: brightness(1.2);
        color: white;
        border-color: #40c7a7;
        background: #40c7a7;
      }
    }
    .sign-in {
      text-align: center;
    }
  }
`;
