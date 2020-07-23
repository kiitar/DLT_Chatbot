import React from "react";

import "./style.css";

const CardTable = ({ data, page }) => {
  console.log(data);
  return (
    <div>
      {data.map((v, i) => {
        return (
          <div className="container-card" key={i}>
            <div className="data-card-title bold">ลำดับ {parseInt(`${i + 1}`)}</div>
            <div className="flex-card">
              <div className="data-card bold">วันที่</div>
              <div style={{ width: "10px" }}></div>
              <div className="data-card-word">{v.created_at}</div>
            </div>
            {/* <div className="data-card">คำถาม</div> */}
            <div className="data-card-word bold">{v.message}</div>
            {/* <div className="data-card">คำตอบ</div> */}
            <div className="box-massage-card">
              <div className="massage-card">{v.reply_message}</div>
            </div>
            <div className="flex-card">
              <div className="data-card bold">ค่าความมั่นใจ</div>
              <div style={{ width: "10px" }}></div>
              <div className="data-card-word">{v.confident}</div>
            </div>
            <div className="flex-card">
              <div className="data-card">สถานะ</div>
              <div style={{ width: "10px" }}></div>
              {v.is_answerable ? (
                <div className="data-card-word green">ตอบได้</div>
              ) : (
                <div className="data-card-word red">ตอบไม่ได้</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardTable;
