import React from "react";
import Button from "../Button";
// import { ModalContext } from "../../pages/Tranning";
import "./style.css";

export const Modal = ({ onSubmit, onClose, text }) => {
  return (
    <div className="modal">
      <div className="container-modal">
        <div className="name-modal flex center">{/* <i class="fa fa-warning"></i> */}</div>
        <div className="name-modal flex center">
          <h2>{text ? text : "ยืนยันการทำรายการ"}</h2>
        </div>
        <div className="flex center">
          <div className="padding-btn">
            <Button name="ตกลง" styleBtn="create" onClick={onSubmit} />
          </div>
          <div className="padding-btn">
            <Button name="ยกเลิก" styleBtn="close" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
