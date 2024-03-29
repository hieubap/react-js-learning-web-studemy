import styled from "styled-components";

export const WrapperStyled = styled.div`
  .title-courses {
    font-size: 24px;
    font-weight: 500;
  }
  .add-new-button {
    margin-right: 0;
  }
  .add-new-button {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  .action-container {
    width: 80px;
    margin: auto;
    justify-content: space-between;
    .action {
      cursor: pointer;
      width: 20px;
      img.action-table {
        width: 20px;
        height: 20px;
      }
    }
  }
  .upload-picture-container {
    height: 200px;
    display: flex;
    justify-content: space-around;
    /* .upload {
      width: 50%;
    } */
    .picture {
      width: 50%;
      .picture-container {
        img {
          margin-top: 10px;
          border-radius: 20px;
          cursor: pointer;
          height: auto;
          width: 300px;
        }
      }
    }
  }
`;
