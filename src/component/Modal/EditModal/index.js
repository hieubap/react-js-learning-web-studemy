import React from "react";
import { EditModalWrapper, FooterCustomEditWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { headers } from "../../Common/CommonModal";
import category from "../../FakeData/category";
import { useEffect } from "react";
import level from "../../FakeData/level";
import { storeFirebase } from "../../../firebase";

export default function EditModal({ state, setState, tab }) {
  useEffect(() => {
    console.log(state?.record, "record");
    axios
      .patch(
        storeFirebase.api + "/category/search",
        {},
        {
          params: { page: 0, size: 10 },
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data.data, "res.data");
        let category = [];
        res.data?.data?.map((item, index) => {
          let newData = {
            ...item,
          };
          category.push(newData);
        });
        setState({
          category: category,
          newCategory: state?.record?.categoryId,
          newLevel: state?.record?.level,
        });
      })
      .catch((error) => console.log(error));
  }, [state.openEditCourseModal]);
  return (
    <BaseModal
      state={state}
      setState={setState}
      width={500}
      openModal={state.openEditCourseModal}
      titleModal={
        tab === "course"
          ? "Edit course"
          : tab === "chapter"
          ? "Edit chapter"
          : "Edit category"
      }
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
              tab === "course"
                ? axios
                    .put(
                      `https://40f8-14-177-40-231.ap.ngrok.io/course/${state?.record?.id}`,
                      {
                        name: state?.newName,
                        duration: state?.newDuration,
                        author: state?.newAuthor,
                        price: state?.newPrice,
                        categoryId: state?.newCategory,
                        level: state?.newLevel,
                      },
                      {
                        headers: headers,
                      }
                    )
                    .then(function (response) {
                      setState({ openEditCourseModal: false, record: {} });
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                : tab === "chapter"
                ? axios
                    .put(
                      `https://40f8-14-177-40-231.ap.ngrok.io/chapter/${state?.record?.id}`,
                      {
                        name: state?.newName,
                        duration: state?.newDuration,
                      },
                      {
                        headers: headers,
                      }
                    )
                    .then(function (response) {
                      setState({ openEditCourseModal: false, record: {} });
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                : axios
                    .put(
                      `https://40f8-14-177-40-231.ap.ngrok.io/category/${state?.record?.id}`,
                      {
                        name: state?.newName,
                      },
                      {
                        headers: headers,
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
          {tab === "course" ? (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Name course:</div>
                <Input
                  placeholder={state?.record?.name}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newName: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Category :</div>
                <Select
                  defaultValue={state?.record?.categoryId}
                  style={{ width: 300 }}
                  onChange={(e) => {
                    setState({ newCategory: e });
                  }}
                  options={state?.category?.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Level :</div>
                <Select
                  defaultValue={state?.record?.level}
                  style={{ width: 300 }}
                  onChange={(e) => {
                    setState({ newLevel: e });
                  }}
                  options={level.map((item, index) => {
                    return { value: item.level, label: item.levelName };
                  })}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Duration :</div>
                <Input
                  placeholder={state?.record?.duration}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newDuration: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Author :</div>
                <Input
                  placeholder={state?.record?.author}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newAuthor: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Price :</div>
                <Input
                  placeholder={state?.record?.price}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newPrice: e.target.value });
                  }}
                />
              </div>
            </>
          ) : tab === "chapter" ? (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Name chapter :</div>
                <Input
                  placeholder={state?.record?.name}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newName: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Duration :</div>
                <Input
                  placeholder={state?.record?.duration}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newDuration: e.target.value });
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Name category :</div>
                <Input
                  placeholder={state?.record?.name}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newName: e.target.value });
                  }}
                />
              </div>
            </>
          )}
        </EditModalWrapper>
      }
    />
  );
}
