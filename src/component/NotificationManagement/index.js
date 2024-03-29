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

export default function NotificationManagement() {
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
      .get(storeFirebase.api + "/notification", {
        params: {
          page: 0,
          size: 10,
          title: name?.toLowerCase(),
          // body: name?.toLowerCase(),
        },
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.data, "res.data");
        let dataNotification = [];
        res.data?.data?.map((item, index) => {
          let newData = {
            ...item,
          };
          dataNotification.push(newData);
        });
        setState({ dataNotification: dataNotification });
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: "20%",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      align: "center",
      width: "50%",
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
              axios
                .post(
                  "https://fcm.googleapis.com/fcm/send",
                  {
                    to: "/topics/channel_learning_app",
                    notification: {
                      title: record.title,
                      body: record.body,
                    },
                  },
                  {
                    headers: {
                      Authorization:
                        "key=AAAAfv6RZso:APA91bFd6oosLMnNCO-ymXN7z2cT3vJJ7tim56RkEGbEyefORsDHJCS7eGa9dsKhXUCfRzc_MMRZWHrAWbrEewMrDI56rPP0eYsMjOpKGL9DDQg1r9jPZQJT_ZwEr7q7BxVj-DQgqI1Y",
                    },
                  }
                )
                .then((res) => {
                  setState({ openSuccessModal: true });
                })
                .catch((error) => console.log(error));
            }}
          >
            <img
              alt=""
              className="action-table"
              src={require("../../assets/send-icon.png")}
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
      <div className="title-courses">Notification List</div>
      <div className="add-new-button">
        <InputSearch onChange={onSearch}></InputSearch>
        <Button
          onClick={() => {
            setState({ openNewCourseModal: true });
          }}
          type="primary"
        >
          New Notification +
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
        dataSource={state.dataNotification}
      />
      <NewCourseModal
        state={state}
        setState={setState}
        handleOpenSuccessModal={handleOpenSuccessModal}
        tab="notification"
      />
      <SuccessModal state={state} setState={setState} tab="notification" />
      <DeleteModal state={state} setState={setState} tab="notification" />
      <EditModal state={state} setState={setState} tab="notification" />
    </WrapperStyled>
  );
}
