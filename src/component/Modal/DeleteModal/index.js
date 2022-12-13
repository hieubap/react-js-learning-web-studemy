import React from "react";
import { DeleteModalWrapper, FooterCustomDeleteWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button } from "antd";
import axios from "axios";
import { headers } from "../../Common/CommonModal";
export default function DeleteModal({ state, setState, tab }) {
  return (
    <BaseModal
      state={state}
      setState={setState}
      width={450}
      openModal={state.openDeleteCourseModal}
      titleModal={
        tab === "course"
          ? "Delete course"
          : tab === "chapter"
          ? "Delete chapter"
          : "Delete category"
      }
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
              console.log(state?.record, "state?.record?");
              tab === "course"
                ? axios
                    .delete(
                      `https://40f8-14-177-40-231.ap.ngrok.io/course/${state?.record?.id}`,
                      {
                        headers: headers,
                      }
                    )
                    .then(function (response) {
                      console.log(response);
                      setState({ openDeleteCourseModal: false });
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                : tab === "chapter"
                ? axios
                    .delete(
                      `https://40f8-14-177-40-231.ap.ngrok.io/chapter/${state?.record?.id}`,
                      {
                        headers: headers,
                      }
                    )
                    .then(function (response) {
                      console.log(response);
                      setState({ openDeleteCourseModal: false });
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                : axios
                    .delete(
                      `https://40f8-14-177-40-231.ap.ngrok.io/category/${state?.record?.id}`,
                      {
                        headers: headers,
                      }
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
          {tab === "course" ? (
            <>
              <div>Name : {state?.record?.name}</div>
              <div>Duration : {state?.record?.duration}</div>
              <div>Author : {state?.record?.author}</div>
              <div>Price : {state?.record?.price}</div>
              <div>Category : {state?.record?.categoryName}</div>
              <div>Level : {state?.record?.levelName}</div>
              <div>Create time : {state?.record?.createdAt}</div>
              <div>Member : {state?.record?.numberStudent}</div>
            </>
          ) : tab === "chapter" ? (
            <>
              <div>Name : {state?.record?.name}</div>
              <div>Duration : {state?.record?.duration}</div>
              <div>Create time : {state?.record?.createdAt}</div>
              <div>Update time : {state?.record?.updatedAt}</div>
            </>
          ) : (
            <>
              <div>Name : {state?.record?.name}</div>
              <div>Create time : {state?.record?.createdAt}</div>
              <div>Update time : {state?.record?.updatedAt}</div>
            </>
          )}

          <br />
          <div>Are you sure to delete this ?</div>
        </DeleteModalWrapper>
      }
    />
  );
}
