import { WrapperStyled } from "./styled";
import { Button, Space, Modal } from "antd";
import React from "react";
import { CommonTable } from "../Common";
import dataCourses from "../FakeData/dataCourse";
import useCustomState from "../Common/useCustomState";
import NewCourseModal from "../Modal/NewCourseModal";
import SuccessModal from "../Modal/SuccessModal";

export default function CourseManagement() {
  const [state, setState] = useCustomState({
    openNewCourseModal: false,
    openSuccessModal: false,
  });
  const handleOpenSuccessModal = () => {
    setState({ openSuccessModal: true });
    setState({ openNewCourseModal: false });
  };
  console.log(state, "state");
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (value, item, index) => {
        return index;
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
        <Space size="middle">
          <div>123</div>
          <div>123</div>
        </Space>
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
      <CommonTable columns={columns} dataSource={dataCourses} />
      <NewCourseModal
        state={state}
        setState={setState}
        handleOpenSuccessModal={handleOpenSuccessModal}
      />
      <SuccessModal state={state} setState={setState} />
    </WrapperStyled>
  );
}
