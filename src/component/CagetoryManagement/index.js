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
import InputSearch from "../InputSearch";

export default function CategoryManagement() {
  const [state, setState] = useCustomState({
    record: {},
    openNewCourseModal: false,
    openSuccessModal: false,
    openDeleteCourseModal: false,
    openEditCourseModal: false,
    page: 0,
    size: 10,
  });
  const onSearch = (name) => {
    axios
      .get(storeFirebase.api + "/category", {
        params: { page: 0, size: 10, name: name?.toLowerCase() },
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.data, "res.data");
        let dataCategory = [];
        res.data?.data?.map((item, index) => {
          let newData = {
            ...item,
          };
          dataCategory.push(newData);
        });
        setState({ dataCategory: dataCategory });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    onSearch();
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
      title: "Name Category",
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
          {/* <div className="action">
            <img
              alt=""
              className="action-table"
              src={require("../../assets/detail-icon.png")}
            />
          </div> */}
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
      <div className="title-courses">Category List</div>
      <div className="add-new-button">
        <InputSearch onChange={onSearch}></InputSearch>
        <Button
          onClick={() => {
            setState({ openNewCourseModal: true });
          }}
          type="primary"
        >
          New Category +
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
        dataSource={state.dataCategory}
      />
      <NewCourseModal
        state={state}
        setState={setState}
        handleOpenSuccessModal={handleOpenSuccessModal}
        tab="category"
      />
      <SuccessModal state={state} setState={setState} tab="category" />
      <DeleteModal state={state} setState={setState} tab="category" />
      <EditModal state={state} setState={setState} tab="category" />
    </WrapperStyled>
  );
}
