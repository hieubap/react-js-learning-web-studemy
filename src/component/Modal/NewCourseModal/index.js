import React, { useRef } from "react";
import { FooterCustomWrapper, NewCoursesModalWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { ModalError, headers } from "../../Common/CommonModal";
import level from "../../FakeData/level";
// import category from "../../FakeData/category";
import { useEffect } from "react";
import { storeFirebase } from "../../../firebase";
export default function NewCourseModal({
  state,
  setState,
  handleOpenSuccessModal,
  tab,
}) {
  const filePath = useRef();
  useEffect(() => {
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
        setState({ category: category, newCategory: 1, newLevel: 1 });
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
  }, [state.openNewCourseModal]);
  return (
    <BaseModal
      handleOpenModal={handleOpenSuccessModal}
      state={state}
      setState={setState}
      width={500}
      openModal={state.openNewCourseModal}
      titleModal={"New " + tab}
      // buttonFooter={"Add new course"}
      footerCustom={
        <FooterCustomWrapper>
          <Button
            onClick={async () => {
              console.log(state, "state");
              tab === "course"
                ? await axios
                    .post(
                      `http://14.225.205.222:8800/course`,
                      {
                        name: state?.newName,
                        duration: state?.newDuration,
                        author: state?.newAuthor,
                        price: state?.newPrice,
                        categoryId: state?.newCategory,
                        level: state?.newLevel,
                        imageUrl: state?.imageUrl,
                      },
                      { headers: headers }
                    )
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                : tab === "chapter"
                ? filePath.current
                  ? await axios
                      .post(
                        `http://14.225.205.222:8800/chapter`,
                        {
                          name: state?.newName,
                          duration: state?.newDuration,
                          fileUrl: filePath.current,
                          courseId: state.courseId,
                        },
                        { headers: headers }
                      )
                      .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  : (() => {
                      ModalError("Vui lòng upload file");
                    })()
                : tab === "category"
                ? await axios
                    .post(
                      `http://14.225.205.222:8800/category`,
                      {
                        name: state?.newName,
                        imageUrl: state?.imageUrl,
                      },
                      { headers: headers }
                    )
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                : await axios
                    .post(
                      `http://14.225.205.222:8800/notification`,
                      {
                        title: state?.newTitleNotification,
                        body: state?.newBodyNotification,
                      },
                      { headers: headers }
                    )
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
              if (!(tab === "chapter" && !filePath.current))
                handleOpenSuccessModal();
            }}
            className={"button-footer"}
          >
            {tab === "course"
              ? "Add new course"
              : tab === "chapter"
              ? "Add new chapter"
              : "Add new category"}
          </Button>
        </FooterCustomWrapper>
      }
      arrowBack={true}
      content={
        <NewCoursesModalWrapper>
          {tab === "course" ? (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Name course :</div>
                <Input
                  placeholder="Enter name course ..."
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newName: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Category :</div>
                <Select
                  defaultValue="Mobile design"
                  style={{ width: 300 }}
                  onChange={(e) => {
                    console.log(e, "e.target.value");
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
                  defaultValue="Beginner"
                  style={{ width: 300 }}
                  onChange={(e) => {
                    console.log(e, "e.target.value");
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
                  placeholder="Enter duration course ..."
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newDuration: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Author :</div>
                <Input
                  placeholder="Enter teacher's course name ..."
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newAuthor: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Price :</div>
                <Input
                  placeholder="Enter price course ..."
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
                  placeholder="Enter name chapter ..."
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newName: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Duration :</div>
                <Input
                  placeholder="Enter duration chapter ..."
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
                  placeholder="Enter name category ..."
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
          ) : (
            <>
              <div className="d-flex input-container">
                <div className="custom-title">Title notification :</div>
                <Input
                  placeholder="Enter title notification ..."
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newTitleNotification: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex input-container">
                <div className="custom-title">Body notification :</div>
                <Input
                  placeholder="Enter body notification ..."
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setState({ newBodyNotification: e.target.value });
                  }}
                />
              </div>
            </>
          )}
        </NewCoursesModalWrapper>
      }
    />
  );
}
