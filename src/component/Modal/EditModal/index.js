import React from "react";
import { EditModalWrapper, FooterCustomEditWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button, Input } from "antd";
import axios from "axios";

export default function EditModal({ state, setState }) {
  return (
    <BaseModal
      state={state}
      setState={setState}
      width={500}
      openModal={state.openEditCourseModal}
      titleModal={"Edit course"}
      arrowBack={false}
      footerCustom={
        <FooterCustomEditWrapper>
          <Button
            onClick={() => {
              setState({ openEditCourseModal: false, record: {} });
            }}
            className={"button-footer cancel"}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              axios
                .put(
                  `https://61fe8c59a58a4e00173c98cc.mockapi.io/courses-info/${state?.record?.id}`,
                  {
                    name: state.newName,
                    duration: state.newDuration,
                    teacher: state.newTeacher,
                    price: state.newPrice,
                  }
                )
                .then(function (response) {
                  setState({ openEditCourseModal: false, record: {} });
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
            className={"button-footer edit"}
          >
            Update
          </Button>
        </FooterCustomEditWrapper>
      }
      content={
        <EditModalWrapper>
          <div className="d-flex input-container">
            <div>Name :</div>
            <Input
              placeholder={state?.record?.name}
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newName: e.target.value });
              }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Duration :</div>
            <Input
              placeholder={state?.record?.duration}
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newDuration: e.target.value });
              }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Teacher :</div>
            <Input
              placeholder={state?.record?.teacher}
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newTeacher: e.target.value });
              }}
            />
          </div>
          <div className="d-flex input-container">
            <div>Price :</div>
            <Input
              placeholder={state?.record?.price}
              style={{ width: "300px" }}
              onChange={(e) => {
                setState({ newPrice: e.target.value });
              }}
            />
          </div>
        </EditModalWrapper>
      }
    />
  );
}
