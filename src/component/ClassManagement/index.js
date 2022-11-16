import { WrapperStyled } from "./styled";
import { Button, Space} from "antd";
import React from "react";
import { CommonTable } from "../Common";
export default function ClassManagement() {
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
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  return (
    <WrapperStyled>
      <div className="title-class">Class List</div>
      <Button type="primary">New class+</Button>
      <CommonTable columns={columns} dataSource={data} />
    </WrapperStyled>
  );
}
