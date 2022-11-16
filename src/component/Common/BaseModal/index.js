import { Button, Modal, Row, Col, Input } from "antd";
import React from "react";
import { BaseModalTitleWrapper, BaseModalFooterWrapper } from "./styled";

export default function BaseModal({
  openModal,
  // setOpenModal,
  state,
  setState,
  handleOpenModal,
  width,
  titleModal,
  buttonFooter,
  arrowBack,
  content,
}) {
  const handleClose = () => {
    if (titleModal === "New course") {
      setState({ openNewCourseModal: false });
    } else if (titleModal === "Success") {
      setState({ openSuccessModal: false });
    }
  };

  return (
    <Modal
      width={width}
      className="modalWrapper"
      title={
        <BaseModalTitleWrapper>
          {arrowBack && (
            <span onClick={handleClose} className="arrow-back">
              <img src={require("../../../assets/arrow-to-left.png")} />
            </span>
          )}
          <span className="title-modal">{titleModal}</span>
          <span onClick={handleClose} className="x-button">
            <img src={require("../../../assets/x-button.png")} />
          </span>
        </BaseModalTitleWrapper>
      }
      open={openModal}
      onOk={handleClose}
      onCancel={handleClose}
      footer={
        <BaseModalFooterWrapper>
          <Button
            onClick={handleOpenModal ? handleOpenModal : handleClose}
            className={"button-footer"}
          >
            {buttonFooter}
          </Button>
        </BaseModalFooterWrapper>
      }
    >
      {content}
    </Modal>
  );
}
