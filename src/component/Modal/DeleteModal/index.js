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
      titleModal={"Delete " + tab}
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
                      `http://14.225.205.222:8800/course/${state?.record?.id}`,
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
                      `http://14.225.205.222:8800/chapter/${state?.record?.id}`,
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
                : tab === "category"
                ? axios
                    .delete(
                      `http://14.225.205.222:8800/category/${state?.record?.id}`,
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
                      `http://14.225.205.222:8800/notification/${state?.record?.id}`,
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
          ) : tab === "category" ? (
            <>
              <div>Name : {state?.record?.name}</div>
              <div>Create time : {state?.record?.createdAt}</div>
              <div>Update time : {state?.record?.updatedAt}</div>
            </>
          ) : (
            <>
              <div>Title : {state?.record?.title}</div>
              <div>Body : {state?.record?.body}</div>
            </>
          )}

          <br />
          <div>Are you sure to delete this ?</div>
        </DeleteModalWrapper>
      }
    />
  );
}
