import { WrapperStyled } from "./styled";
import { Button, Space, Modal, Input, Col, Row } from "antd";
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
import { EditModalWrapper } from "../Modal/EditModal/styled";
import TextArea from "antd/lib/input/TextArea";

export default function ProfileManagement() {
  const [state, setState] = useCustomState({
    record: {},
  });
  const getData = () => {
    axios
      .get(storeFirebase.api + "/account/" + localStorage.getItem("userId"), {
        params: {
          authorId: localStorage.getItem("userId"),
          page: 0,
          size: 500,
        },
        headers: headers,
      })
      .then((res) => {
        setState({ record: res.data.data });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);

  const fields = [
    {
      name: "Email",
      field: "email",
    },
    {
      name: "Fullname",
      field: "fullName",
    },
    {
      name: "Phone",
      field: "phone",
    },
    {
      name: "Description",
      field: "description",
    },
    {
      name: "Facebook",
      field: "facebook",
    },
    {
      name: "Github",
      field: "github",
    },
    {
      name: "LinkedIn",
      field: "linkedIn",
    },
    {
      name: "Twitter",
      field: "twitter",
    },
    {
      name: "About me",
      field: "aboutMe",
    },
    {
      name: "Account Number (Bank)",
      field: "stk",
    },
    {
      name: "Bank Name",
      field: "nganHang",
    },
    {
      name: "Account name (Bank)",
      field: "chuTaiKhoan",
    },
  ];

  console.log(state.record, "state");

  const onSave = () => {
    axios
      .patch(
        storeFirebase.api + "/account/" + localStorage.getItem("userId"),
        state.record,
        {
          headers: headers,
        }
      )
      .then((res) => {
        Modal.success({ content: "Cập nhật thành công" });
      })
      .catch((error) => console.log(error));
  };

  return (
    <WrapperStyled>
      <div className="title-courses">Profile</div>
      <EditModalWrapper>
        <Row>
          {fields.map((item, idx) => (
            <Col key={idx} span={12} className="d-flex input-container">
              <div className="custom-">{item.name}:</div>
              <TextArea
                value={state?.record[item.field]}
                style={{ width: "300px" }}
                onChange={(e) => {
                  setState({
                    record: { ...state.record, [item.field]: e.target.value },
                  });
                }}
              />
            </Col>
          ))}
        </Row>
      </EditModalWrapper>
      <Button type="primary" onClick={onSave}>
        Save
      </Button>
    </WrapperStyled>
  );
}
