import React from "react";
import { Modal } from "antd";

export const ModalError = (message) => {
  Modal.error({
    content: <b>{message}</b>,
  });
};

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6InVzZXIxIiwiZW1haWwiOiIxIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV8xIl0sImlhdCI6MTY2OTM2NzA0MCwiZXhwIjoxNjY5NDUzNDQwfQ.fPrbHyliblJUGgGuzczVjBbBBuRkoprNSOyW4LQ3Su8";

export const headers = {
  Authorization: "",
  "Content-Type": "application/json",
};
