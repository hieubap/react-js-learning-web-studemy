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
import { storeFirebase } from "../../firebase";

export default function ClassManagement() {
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
      .patch(
        storeFirebase.api + "/chapter/search",
        {},
        {
          params: { page: 0, size: 10 },
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data.data, "res.data");
        let dataCourse = [];
        res.data?.data?.map((item, index) => {
          let newData = {
            ...item,
          };
          dataCourse.push(newData);
        });
        setState({ dataCourse: dataCourse });
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
      width: "5%",
    },
    {
      title: "Name Chapter",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "25%",
    },
    {
      title: "Create time",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: "10%",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      width: "10%",
    },
    {
      title: "Update time",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      width: "10%",
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
      width: "15%",
    },
  ];

  return (
    <WrapperStyled>
      <div className="title-courses">Chapter List</div>
      <div className="add-new-button">
        <Button
          onClick={() => {
            setState({ openNewCourseModal: true });
          }}
          type="primary"
        >
          New Chapter +
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
        dataSource={state.dataCourse}
      />
      <NewCourseModal
        state={state}
        setState={setState}
        handleOpenSuccessModal={handleOpenSuccessModal}
        tab="chapter"
      />
      <SuccessModal state={state} setState={setState} tab="chapter" />
      <DeleteModal state={state} setState={setState} tab="chapter" />
      <EditModal state={state} setState={setState} tab="chapter" />
    </WrapperStyled>
  );
}
