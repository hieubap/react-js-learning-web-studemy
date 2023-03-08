import { Button, Modal, Row, Col, Input } from "antd";
import React from "react";
import { BaseModalTitleWrapper, BaseModalFooterWrapper } from "./styled";

export default function BaseModal({
  openModal,
  state,
  setState,
  handleOpenModal,
  width,
  titleModal,
  buttonFooter,
  footerCustom,
  arrowBack,
  content,
}) {
  const handleClose = () => {
    if (
      titleModal === "New course" ||
      titleModal === "New chapter" ||
      titleModal === "New category" ||
      titleModal === "New notification"
    ) {
      setState({ openNewCourseModal: false });
    } else if (titleModal === "Success") {
      setState({ openSuccessModal: false });
    } else if (
      titleModal === "Delete course" ||
      titleModal === "Delete chapter" ||
      titleModal === "Delete notification" ||
      titleModal === "Delete category"
    ) {
      setState({ openDeleteCourseModal: false });
    } else if (
      titleModal === "Edit course" ||
      titleModal === "Edit chapter" ||
      titleModal === "Edit notification" ||
      titleModal === "Edit avatar" ||
      titleModal === "Edit category"
    ) {
      setState({ openEditCourseModal: false });
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
        <>
          {footerCustom ? (
            <>{footerCustom}</>
          ) : (
            <BaseModalFooterWrapper>
              <Button
                onClick={handleOpenModal ? handleOpenModal : handleClose}
                className={"button-footer"}
              >
                {buttonFooter}
              </Button>
            </BaseModalFooterWrapper>
          )}
        </>
      }
    >
      {content}
    </Modal>
  );
}
