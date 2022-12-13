import React from "react";
import { FooterCustomWrapper, NewCoursesModalWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { headers } from "../../Common/CommonModal";
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
  useEffect(() => {
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
        setState({ category: category, newCategory: 1, newLevel: 1 });
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
      titleModal={
        tab === "course"
          ? "New course"
          : tab === "chapter"
          ? "New chapter"
          : "New category"
      }
      // buttonFooter={"Add new course"}
      footerCustom={
        <FooterCustomWrapper>
          <Button
            onClick={async () => {
              console.log(state, "state");
              tab === "course"
                ? await axios
                    .post(
                      `https://40f8-14-177-40-231.ap.ngrok.io/course`,
                      {
                        name: state?.newName,
                        duration: state?.newDuration,
                        author: state?.newAuthor,
                        price: state?.newPrice,
                        categoryId: state?.newCategory,
                        level: state?.newLevel,
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
                ? await axios
                    .post(
                      `https://40f8-14-177-40-231.ap.ngrok.io/chapter`,
                      {
                        name: state?.newName,
                        duration: state?.newDuration,
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
                      `https://40f8-14-177-40-231.ap.ngrok.io/category`,
                      {
                        name: state?.newName,
                      },
                      { headers: headers }
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
            </>
          ) : tab === "chapter" ? (
            <>
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
          ) : (
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
            </>
          )}
        </NewCoursesModalWrapper>
      }
    />
  );
}
