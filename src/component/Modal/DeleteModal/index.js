import React from "react";
import { DeleteModalWrapper, FooterCustomDeleteWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button } from "antd";
import axios from "axios";
export default function DeleteModal({ state, setState }) {
  return (
    <BaseModal
      state={state}
      setState={setState}
      width={450}
      openModal={state.openDeleteCourseModal}
      titleModal={"Delete course"}
      arrowBack={false}
      footerCustom={
        <FooterCustomDeleteWrapper>
          <Button
            onClick={() => {
              setState({ openDeleteCourseModal: false, record: {} });
            }}
            className={"button-footer cancel"}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              axios
                .delete(
                  `https://61fe8c59a58a4e00173c98cc.mockapi.io/courses-info/${state?.record?.id}`
                )
                .then(function (response) {
                  console.log(response);
                  setState({ openDeleteCourseModal: false });
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
            className={"button-footer delete"}
          >
            Delete
          </Button>
        </FooterCustomDeleteWrapper>
      }
      content={
        <DeleteModalWrapper>
          <div>Name : {state?.record?.name}</div>
          <div>Duration : {state?.record?.duration}</div>
          <div>Teacher : {state?.record?.teacher}</div>
          <div>Price : {state?.record?.price}</div>
          <br />
          <div>Are you sure to delete this course ?</div>
        </DeleteModalWrapper>
      }
    />
  );
}
