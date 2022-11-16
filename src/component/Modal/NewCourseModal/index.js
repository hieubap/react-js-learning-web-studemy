import React from "react";
import { NewCoursesModalWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Input } from "antd";
export default function NewCourseModal({
  state,
  setState,
  handleOpenSuccessModal,
}) {
  return (
    <BaseModal
      handleOpenModal={handleOpenSuccessModal}
      state={state}
      setState={setState}
      width={500}
      openModal={state.openNewCourseModal}
      titleModal={"New course"}
      buttonFooter={"Add new course"}
      arrowBack={true}
      content={
        <NewCoursesModalWrapper>
          <div className="d-flex input-container">
            <div>Name :</div>
            <Input
              placeholder="Enter name course ..."
              style={{ width: "300px" }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Duration :</div>
            <Input
              placeholder="Enter duration course ..."
              style={{ width: "300px" }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Teacher :</div>
            <Input
              placeholder="Enter teacher's course name ..."
              style={{ width: "300px" }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Price :</div>
            <Input
              placeholder="Enter price course ..."
              style={{ width: "300px" }}
            />
          </div>
        </NewCoursesModalWrapper>
      }
    />
  );
}
