import React from "react";
import { FooterCustomWrapper, NewCoursesModalWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button, Input } from "antd";
import axios from "axios";

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
      // buttonFooter={"Add new course"}
      footerCustom={
        <FooterCustomWrapper>
          <Button
            onClick={async () => {
              await axios
                .post(
                  `https://61fe8c59a58a4e00173c98cc.mockapi.io/courses-info`,
                  {
                    name: state.newName,
                    duration: state.newDuration,
                    teacher: state.newTeacher,
                    price: state.newPrice,
                    // id: parseInt(state.courses.length) + 1,
                  }
                )
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
              handleOpenSuccessModal();
            }}
            className={"button-footer"}
          >
            Add new course
          </Button>
        </FooterCustomWrapper>
      }
      arrowBack={true}
      content={
        <NewCoursesModalWrapper>
          <div className="d-flex input-container">
            <div>Name :</div>
            <Input
              placeholder="Enter name course ..."
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newName: e.target.value });
              }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Duration :</div>
            <Input
              placeholder="Enter duration course ..."
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newDuration: e.target.value });
              }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Teacher :</div>
            <Input
              placeholder="Enter teacher's course name ..."
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newTeacher: e.target.value });
              }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Price :</div>
            <Input
              placeholder="Enter price course ..."
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newPrice: e.target.value });
              }}
            />
          </div>
        </NewCoursesModalWrapper>
      }
    />
  );
}
