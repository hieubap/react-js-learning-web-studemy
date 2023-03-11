import React, { useState, useEffect, useRef } from "react";
import { WrapperStyled } from "./styled";
import { Button, Menu } from "antd";
import CourseManagement from "../CourseManagement";
import ClassManagement from "../ClassManagement";
import { useHistory } from "react-router-dom";
import useToken from "../Common/useToken";
import CategoryManagement from "../CagetoryManagement";
import RegisterManagement from "../RegisterManagement";
import ProfileManagement from "../ProfileManagement";
import NotificationManagement from "../NotificationManagement";
export default function Home() {
  const history = useHistory();
  const { token } = useToken();
  console.log(token, "token123");
  if (!token) {
    history.push({ pathname: "/" });
  }
  const rootSubmenuKeys = ["sub1", "sub2"];
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [openDetail, setOpenDetail] = useState("sub1");
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const previousOpenDetail = useRef(null);
  useEffect(() => {
    if (typeof openDetail === "undefined") {
      setOpenDetail(previousOpenDetail.current);
    }
    previousOpenDetail.current = openDetail;
  }, [openDetail]);
  const items = [
    getItem("Course Management", "sub1", null),
    getItem("Chapter Management", "sub2", null),
    getItem("Category Management", "sub3", null),
    getItem("Register Management", "sub4", null),
    getItem("Profile Management", "sub5", null),
    getItem("Notification Management", "sub6", null),
  ];
  const onClick = (e) => {
    setOpenDetail(e.keyPath[e.keyPath.length - 1]);
  };
  const onOpenChange = (keys) => {
    setOpenDetail(keys[keys.length - 1]);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <WrapperStyled>
      <div className="title">
        <span>Course Management System</span>
      </div>
      <div className="content">
        <div className="menu">
          <Menu
            onClick={onClick}
            style={{
              width: "100%",
            }}
            defaultOpenKeys={["sub1"]}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            mode="inline"
            items={items}
          />
        </div>
        <div className="detail">
          {openDetail === "sub1" ? (
            <CourseManagement />
          ) : openDetail === "sub2" ? (
            <ClassManagement />
          ) : openDetail === "sub3" ? (
            <CategoryManagement />
          ) : openDetail === "sub4" ? (
            <RegisterManagement />
          ) : openDetail === "sub5" ? (
            <ProfileManagement />
          ) : openDetail === "sub6" ? (
            <NotificationManagement />
          ) : (
            <>fail</>
          )}
        </div>
      </div>
    </WrapperStyled>
  );
}
