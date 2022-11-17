import styled from "styled-components";

export const EditModalWrapper = styled.div`
  .input-container {
    margin-bottom: 10px;
    div:first-child {
      padding-top: 5px;
      width: 100px;
    }
  }
`;

export const FooterCustomEditWrapper = styled.div`
  /* padding-right: 4%; */
  margin-bottom: 10px;
  .ant-btn[disabled],
  .ant-btn[disabled]:active,
  .ant-btn[disabled]:focus,
  .ant-btn[disabled]:hover {
    color: white;
    border: none;
    background: gray;
    text-shadow: none;
    box-shadow: none;
  }
  .button-footer {
    width: 100px;
    border-radius: 20px;
    color: white;
  }
  .cancel {
    background: #40c7a7;
  }
  .edit {
    background: blue;
  }
  .button-footer-disabled {
    border-radius: 20px;
    color: white;
    width: calc(50% - 20px);
    cursor: not-allowed;
    background-color: gray;
    color: white;
    opacity: 0.3;
  }
  .button-footer:hover {
    color: white;
    border: none;
    filter: brightness(1.2);
  }
`;
