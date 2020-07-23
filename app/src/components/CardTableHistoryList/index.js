import React from "react";
import Button from "../../components/Button";

import "./style.css";
import { Link } from "react-router-dom";

const CardTable = ({ data }) => {
  return (
    <div>
      {data.map((v, i) => {
        return (
          <div className="container-card" key={i}>
            <div className="data-card-title">ลำดับ {i + 1}</div>
            <div className="data-card">ผู้ใช้งาน</div>
            <div className="data-card-word">{v.provider}</div>
            <div className="data-card">จำนวนบทสนทนา/คำถาม</div>
            <div className="data-card-word">{v.conversation}</div>
            <div className="data-card">จำนวนที่ตอบได้</div>
            <div className="data-card-word">{v.is_answerable}</div>
            <div className="data-card">จำนวนที่ตอบไม่ได้</div>
            <div className="data-card-word">{v.is_not_answerable}</div>
            <div className="data-card-word center">
              <Link className="link" to={`/history_detail/${v.id}`}>
                <Button name="รายละเอียด " styleBtn="view" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardTable;
