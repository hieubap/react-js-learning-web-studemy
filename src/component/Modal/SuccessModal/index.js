import React from "react";
import { SuccessModalWrapper } from "./styled";
import BaseModal from "../../Common/BaseModal";
export default function SuccessModal({ state, setState }) {
  return (
    <BaseModal
      state={state}
      setState={setState}
      width={450}
      openModal={state.openSuccessModal}
      titleModal={"Success"}
      buttonFooter={"OK"}
      arrowBack={false}
      content={
        <SuccessModalWrapper>Action successfully !!!</SuccessModalWrapper>
      }
    />
  );
}
