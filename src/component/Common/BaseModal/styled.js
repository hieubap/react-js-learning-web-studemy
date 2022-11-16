import styled from "styled-components";

export const BaseModalTitleWrapper = styled.div`
  .title-modal {
    padding-top: 3px;
    display: inline-block;
    margin-left: 10px;
  }
  .arrow-back {
    cursor: pointer;
    img {
      margin-bottom: 3px;
    }
  }
  .x-button {
    cursor: pointer;
    float: right;
  }
`;

export const BaseModalFooterWrapper = styled.div`
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
    width: calc(50% - 20px);
    background: #40c7a7;
    border-radius: 20px;
    color: white;
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
