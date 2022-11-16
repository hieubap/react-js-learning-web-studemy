import React, { useState, useEffect, useRef } from "react";
import { WrapperStyled } from "./styled";
import { Menu } from "antd";
import CourseManagement from "../CourseManagement";
import ClassManagement from "../ClassManagement";
export default function Home() {
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
    // console.log(openDetail, "openDetail");
    if (typeof openDetail === "undefined") {
      console.log("under");
      setOpenDetail(previousOpenDetail.current);
    }
    console.log(openDetail, "openDetail");
    previousOpenDetail.current = openDetail;
  }, [openDetail]);
  const items = [
    getItem(<>Course Management</>, "sub1", null, [
      getItem(<p href="">Tab 1</p>, "1"),
      getItem(<p href="">Tab 2</p>, "2"),
    ]),
    getItem(<>Class Management</>, "sub2", null, [
      getItem(<p href="">Tab 3</p>, "3"),
      getItem(<p href="">Tab 4</p>, "4"),
    ]),
    getItem("Sub tab 3", "sub3", null),
    getItem("Sub tab 4", "sub4", null),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    setOpenDetail(e.keyPath[e.keyPath.length - 1]);
  };
  const onOpenChange = (keys) => {
    console.log(keys, "keys");
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
          {/* <div className="cha">
            <div className="con"></div>
          </div> */}

          <Menu
            onClick={onClick}
            style={{
              width: "100%",
            }}
            // defaultSelectedKeys={["1"]}
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
            <div>3</div>
          ) : openDetail === "sub4" ? (
            <div>4</div>
          ) : (
            <>fail</>
          )}
        </div>
      </div>
    </WrapperStyled>
  );
}
