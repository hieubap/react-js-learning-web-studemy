import styled from "styled-components";

export const WrapperStyled = styled.div`
  padding: 50px 5% 400px 5%;
  /* background: linear-gradient(116.2deg, #3a1c66 -18.51%, #230537 41.78%); */
  background: white;
  color: black;
  .block-id-head {
    margin-top: -105px;
    padding-top: 85px;
  }
  .title {
    border-radius: 100px;
    height: 80px;
    text-align: center;
    padding: 22px 0;
    background-color: #40c7a7;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 30px;
    letter-spacing: -0.02em;
    color: white;
    width: 1250px;
  }
  .content {
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    display: flex;

    .menu {
      border-radius: 20px;
      background-color: #40c7a7;
      width: 25%;
      height: 100%;
      p {
        padding-top: 12px;
        text-decoration: none;
        color: white;
      }

      span.ant-menu-title-content {
        /* margin-left: -24px; */
      }
      ul.ant-menu-sub > li > span.ant-menu-title-content {
        /* margin-left: -48px; */
      }
      ul.ant-menu-root > li.ant-menu-submenu,
      /* ul.ant-menu-root > li.ant-menu-item {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      } */
      /* .cha {
        height: 1000px;
        width: 150px;
        background: blue;
        position: relative;
        .con {
          position: -webkit-sticky;
          position: sticky;
          top: 100;
          height: 500px;
          width: 100px;
          background: red;
        }
      } */

      .ant-menu {
        border: none;
        /* background-color: rgba(255, 255, 255, 0.05); */
        color: white;
      }
      .ant-menu-submenu-arrow {
        color: white;
      }
      .ant-menu-item,
      .ant-menu-inline .ant-menu-item::after {
        border: none;
        /* font-size: 13px; */
      }
      li.ant-menu-submenu-open
        ul.ant-menu-inline
        span.ant-menu-title-content
        p {
        font-size: 13px;
        color: white;
      }
      .ant-menu,
      .ant-menu-submenu-selected {
        font-size: 13px;
        color: white;
      }
      li.ant-menu-submenu-open
        ul.ant-menu-inline
        li.ant-menu-item-selected
        span.ant-menu-title-content
        p,
      li.ant-menu-submenu-open
        ul.ant-menu-inline
        li.ant-menu-item-active
        span.ant-menu-title-content
        p {
        font-size: 13px;
        color: white;
        /* margin-left: -24px; */
      }
      li.ant-menu-submenu-open ul.ant-menu-inline li.ant-menu-item-selected,
      li.ant-menu-submenu-open ul.ant-menu-inline li.ant-menu-item-active {
        background: rgba(255, 255, 255, 0.05);
      }
      .ant-menu:not(.ant-menu-horizontal),
      .ant-menu-item-selected,
      .ant-menu-item:active,
      .ant-menu-submenu-title:active {
        background: transparent;
      }
      .ant-menu-item-selected,
      .ant-menu-light .ant-menu-item:hover,
      .ant-menu-light .ant-menu-submenu-title:hover,
      /* .ant-menu-submenu-selected, */
      li.ant-menu-submenu-open div.ant-menu-submenu-title span.ant-menu-title-content {
        color: white;
      }
      .ant-menu-item .ant-menu-item-selected .ant-menu-item-only-child {
        font-weight: 600;
        font-size: 13px;s f
        line-height: 20px;
        color: white;
        background-color: transparent;
      }

      /* {
      .ant-menu-item,
      .ant-menu-item:hover,
      .ant-menu-item-selected,
      .ant-menu-item-selected:hover,
      .ant-menu-submenu-selected,
      .ant-menu-submenu-selected:hover,
      .ant-menu-submenu-title,
      .ant-menu-item-title,
      .ant-menu-submenu-title:hover,
      .ant-menu-item-title:hover,
      .ant-menu-title-content
     ,a {
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        color: white;
        background-color: transparent;
      }
    } */

      span.ant-menu-title-content {
        /* color: white; */
      }
      /* .ant-menu-item-active:hover {
        filter: brightness(2);
      } */
      /* .ant-menu-item-active {
        filter: brightness(2);
      } */
      /* .ant-menu-item,
      .ant-menu-item-title {
        color: #818181;
      } */
    }
    .detail {
      width: 75%;
      /* width: 900px; */
      padding: 0px 0px 0px 20px;
    }
  }
  .back-to-head {
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    position: fixed;
    bottom: 35px;
    right: 35px;
    z-index: 9999;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
