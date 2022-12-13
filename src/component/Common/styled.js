import styled from "styled-components";

export const CommonTableWrapper = styled.div`
  margin: 24px 0px;
  .ant-table-cell::before {
    display: none;
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }
  .ant-table {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .ant-table-thead .ant-table-cell {
    background: #40c7a7;
    color: white;
  }
  .ant-table-tbody .ant-table-cell {
    background: white;
    color: black;
  }
  .ant-table-thead > tr > th {
    border-bottom: none;
  }
  .ant-table-thead > tr > th:first-child {
    border-left: 3px solid #40c7a7;
  }
  .ant-table-thead > tr > th:last-child {
    border-right: 3px solid #40c7a7;
  }
  .ant-table-thead > tr > th {
    border-top: 3px solid #40c7a7;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: white;
  }
  /* .ant-table-tbody > tr:first-child > td {
    border-top: 1px solid black;
  } */
  .ant-table-tbody > tr:last-child > td {
    border-bottom: 3px solid #40c7a7;
  }
  .ant-table-tbody > tr > td:first-child {
    border-left: 3px solid #40c7a7;
  }
  .ant-table-tbody > tr > td:last-child {
    border-right: 3px solid #40c7a7;
  }
  /* .ant-table-tbody > tr > td:not(:last-child):not(:first-child) {
    border-right: 1px dotted white;
    border-left: 1px dotted white;
  }  */
  .ant-table-cell {
    padding: 8px 4px;
  }
  .ant-table-tbody .ant-table-cell {
    border-right: 2px dashed #40c7a7;
  }
`;
