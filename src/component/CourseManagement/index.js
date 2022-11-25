import { WrapperStyled } from "./styled";
import { Button, Space, Modal } from "antd";
import React, { useEffect } from "react";
import { CommonTable } from "../Common";
import useCustomState from "../Common/useCustomState";
import NewCourseModal from "../Modal/NewCourseModal";
import SuccessModal from "../Modal/SuccessModal";
import axios from "axios";
import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import { headers } from "../Common/CommonModal";

export default function CourseManagement() {
  const [state, setState] = useCustomState({
    record: {},
    openNewCourseModal: false,
    openSuccessModal: false,
    openDeleteCourseModal: false,
    openEditCourseModal: false,
    page: 0,
    size: 10,
  });
  useEffect(() => {
    axios
      .get(`https://e069-113-190-20-79.ap.ngrok.io/course`, {
        params: {page:0,
        size:10},
        headers: headers,
      })
      .then((res) => {
        console.log(res, "res.data");
        // setState({ courses: res.data });
      })
      .catch((error) => console.log(error));
  }, [
    state.openSuccessModal,
    state.openDeleteCourseModal,
    state.openEditCourseModal,
  ]);
  const handleOpenSuccessModal = () => {
    setState({ openSuccessModal: true });
    setState({ openNewCourseModal: false });
  };
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (value, item, index) => {
        return state.page * state.size + index + 1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="d-flex action-container">
          <div className="action">
            <img
              alt=""
              className="action-table"
              src={require("../../assets/detail-icon.png")}
            />
          </div>
          <div
            className="action"
            onClick={() => {
              setState({ openEditCourseModal: true, record: record });
            }}
          >
            <img
              alt=""
              className="action-table"
              src={require("../../assets/edit-icon.png")}
            />
          </div>
          <div
            className="action"
            onClick={() => {
              setState({ openDeleteCourseModal: true, record: record });
            }}
          >
            <img
              alt=""
              className="action-table"
              src={require("../../assets/trash-icon.png")}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <WrapperStyled>
      <div className="title-courses">Course List</div>
      <div className="add-new-button">
        <Button
          onClick={() => {
            setState({ openNewCourseModal: true });
          }}
          type="primary"
        >
          New course +
        </Button>
      </div>
      <CommonTable
        pagination={{
          current: state.page + 1,
          defaultPageSize: 10,
          onChange: (page, pageSize) => {
            setState({
              page: page - 1,
              size: pageSize,
            });
          },
          showSizeChanger: true,
          pageSizeOptions: [3, 5, 10, 15, 20],
        }}
        columns={columns}
        dataSource={state.courses}
      />
      <NewCourseModal
        state={state}
        setState={setState}
        handleOpenSuccessModal={handleOpenSuccessModal}
      />
      <SuccessModal state={state} setState={setState} />
      <DeleteModal state={state} setState={setState} />
      <EditModal state={state} setState={setState} />
    </WrapperStyled>
  );
}
