import { Table } from "antd";
import React from "react";
import { CommonTableWrapper } from "./styled";

export const CommonTable = ({ data, columns, ...props }) => {
  return (
    <CommonTableWrapper>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        {...props}
      />
    </CommonTableWrapper>
  );
};
