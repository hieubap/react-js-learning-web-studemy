import React, { useRef } from "react";
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
  const filePath = useRef();
  useEffect(() => {
    console.log(state?.record, "record");
    axios
      .get(storeFirebase.api + "/category", {
        params: { page: 0, size: 100 },
        headers: headers,
      })
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

    axios
      .get(storeFirebase.api + "/course", {
        params: { page: 0, size: 500 },
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.data, "res.data");
        let courses = [];
        res.data?.data?.map((item, index) => {
          let newData = {
            ...item,
          };
          courses.push(newData);
        });
        setState({ courses, courseId: 1 });
      })
      .catch((error) => console.log(error));
  }, [state.openEditCourseModal]);
  return (
    <BaseModal
      state={state}
      setState={setState}
      width={500}
      openModal={state.openEditCourseModal}
      titleModal={"Edit " + tab}
      arrowBack={false}
      footerCustom={
        <FooterCustomEditWrapper>
          {tab != "avatar" && (
            <>
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
                        .patch(
                          `http://14.225.205.222:8800/course/${state?.record?.id}`,
                          {
                            name: state?.newName,
                            duration: state?.newDuration,
                            author: state?.newAuthor,
                            price: state?.newPrice,
                            categoryId: state?.newCategory,
                            level: state?.newLevel,
                            imageUrl: state?.imageUrl,
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
                          `http://14.225.205.222:8800/chapter/${state?.record?.id}`,
                          {
                            name: state?.newName,
                            duration: state?.newDuration,
                            fileUrl: filePath.current,
                            courseId: state.courseId,
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
                    : tab === "category"
                    ? axios
                        .put(
                          `http://14.225.205.222:8800/category/${state?.record?.id}`,
                          {
                            name: state?.newName,
                            imageUrl: state?.imageUrl,
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
                    : tab === "notification"
                    ? axios
                        .put(
                          `http://14.225.205.222:8800/notification/${state?.record?.id}`,
                          {
                            title: state?.newTitleNotification,
                            body: state?.newBodyNotification,
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
                          `http://14.225.205.222:8800/banner/${state?.record?.id}`,
                          {
                            title: state?.newTitleBanner,
                            content: state?.newContentBanner,
                            imageUrl: state?.imageUrl,
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
            </>
          )}
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
              <div className="d-flex input-container">
                <div className="custom-title">Picture :</div>
                <Input
                  type="file"
                  placeholder="choose file"
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    var d = new FormData();
                    d.append("fileName", e.target.files[0].name);
                    d.append("file", e.target.files[0]);

                    axios
                      .post(storeFirebase.api + "/file/upload", d)
                      .then((res) => {
                        filePath.current = res.data.data.filePath;
                        setState({ imageUrl: res.data.data.filePath });
                      })
                      .catch((error) => console.log(error));
                    console.log(e);
                    // setState({ newName: e.target.value });
                  }}
                />
              </div>
            </>
          ) : tab === "chapter" ? (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">File :</div>
                <Input
                  type="file"
                  placeholder="choose file"
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    var d = new FormData();
                    d.append("fileName", e.target.files[0].name);
                    d.append("file", e.target.files[0]);

                    axios
                      .post(storeFirebase.api + "/file/upload", d)
                      .then((res) => {
                        filePath.current = res.data.data.filePath;
                      })
                      .catch((error) => console.log(error));
                    console.log(e);
                    // setState({ newName: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Course :</div>
                <Select
                  defaultValue={state.courseId}
                  style={{ width: 300 }}
                  onChange={(e) => {
                    console.log(e, "e.target.value");
                    setState({ courseId: e });
                  }}
                  options={state.courses?.map((item, index) => {
                    return { value: item.id, label: item.name };
                  })}
                />
              </div>
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
          ) : tab === "category" ? (
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
              <div className="d-flex input-container">
                <div className="custom-title">Picture :</div>
                <Input
                  type="file"
                  placeholder="choose file"
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    var d = new FormData();
                    d.append("fileName", e.target.files[0].name);
                    d.append("file", e.target.files[0]);

                    axios
                      .post(storeFirebase.api + "/file/upload", d)
                      .then((res) => {
                        filePath.current = res.data.data.filePath;
                        setState({ imageUrl: res.data.data.filePath });
                      })
                      .catch((error) => console.log(error));
                    console.log(e);
                    // setState({ newName: e.target.value });
                  }}
                />
              </div>
            </>
          ) : tab === "notification" ? (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Title notification :</div>
                <Input
                  placeholder={state?.record?.title}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newTitleNotification: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Body notification :</div>
                <Input
                  placeholder={state?.record?.body}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newBodyNotification: e.target.value });
                  }}
                />
              </div>
            </>
          ) : tab === "avatar" ? (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Upload avatar :</div>
                <Input
                  type="file"
                  placeholder="choose file"
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    var d = new FormData();
                    d.append("fileName", e.target.files[0].name);
                    d.append("file", e.target.files[0]);

                    axios
                      .post(storeFirebase.api + "/file/upload", d)
                      .then((res) => {
                        filePath.current = res.data.data.filePath;
                        setState({
                          record: {
                            ...state.record,
                            avatar: res.data.data.filePath,
                          },
                          openEditCourseModal: false,
                        });
                      })
                      .catch((error) => console.log(error));
                    console.log(e);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Title banner :</div>
                <Input
                  placeholder={state?.record?.title}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newTitleBanner: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Content banner :</div>
                <Input
                  placeholder={state?.record?.content}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newContentBanner: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Picture :</div>
                <Input
                  type="file"
                  placeholder="choose file"
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    var d = new FormData();
                    d.append("fileName", e.target.files[0].name);
                    d.append("file", e.target.files[0]);

                    axios
                      .post(storeFirebase.api + "/file/upload", d)
                      .then((res) => {
                        filePath.current = res.data.data.filePath;
                        setState({ imageUrl: res.data.data.filePath });
                      })
                      .catch((error) => console.log(error));
                    console.log(e);
                    // setState({ newName: e.target.value });
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
