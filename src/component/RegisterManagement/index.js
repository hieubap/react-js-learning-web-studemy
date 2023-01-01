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

export default function RegisterManagement() {
  const [state, setState] = useCustomState({
    record: {},
    openNewCourseModal: false,
    openSuccessModal: false,
    openDeleteCourseModal: false,
    openEditCourseModal: false,
    page: 0,
    size: 10,
  });
  const getData = () => {
    axios
      .patch(
        storeFirebase.api + "/register/search",
        {},
        {
          params: {
            authorId: localStorage.getItem("userId"),
            page: 0,
            size: 500,
          },
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
  };
  useEffect(() => {
    getData();
  }, [
    state.openSuccessModal,
    state.openDeleteCourseModal,
    state.openEditCourseModal,
  ]);
  const handleOpenSuccessModal = () => {
    setState({ openSuccessModal: true });
    setState({ openNewCourseModal: false });
  };
  const onTick = (item) => () => {
    axios
      .patch(
        storeFirebase.api + "/register/" + item.id,
        { approve: !item.approve },
        {
          params: { page: 0, size: 10 },
          headers: headers,
        }
      )
      .then((res) => {
        getData();
      })
      .catch((error) => console.log(error));
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
      title: "Name Student",
      dataIndex: "studentName",
      key: "nameStudent",
      align: "center",
      width: "15%",
    },
    {
      title: "Name Course",
      dataIndex: "courseName",
      key: "nameCouse",
      align: "center",
      width: "25%",
    },
    {
      title: "Transaction",
      dataIndex: "imgUrl",
      key: "imgUrl",
      align: "center",
      width: "20%",
      render: (item) =>
        item ? (
          <img
            src={storeFirebase.api + "/files/" + item}
            style={{ height: 200, cursor: "pointer" }}
            onClick={() => {
              window.open(storeFirebase.api + "/files/" + item);
            }}
          />
        ) : (
          <div>Chưa upload</div>
        ),
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
        <div
          className="d-flex action-container"
          style={{ justifyContent: "center" }}
        >
          <div className="action" onClick={onTick(record)}>
            <img
              alt=""
              className="action-table"
              src={
                record.approve
                  ? require("../../assets/trash-icon.png")
                  : require("../../assets/checkbox_on_dark.png")
              }
            />
          </div>
        </div>
      ),
      width: "5%",
    },
  ];

  return (
    <WrapperStyled>
      <div className="title-courses">Register List</div>
      
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
        tab="category"
      />
      <SuccessModal state={state} setState={setState} tab="category" />
      <DeleteModal state={state} setState={setState} tab="category" />
      <EditModal state={state} setState={setState} tab="category" />
    </WrapperStyled>
  );
}
