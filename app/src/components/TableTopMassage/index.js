import React from "react";

import "./style.css";

const TableTopMassage = ({ data }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>ลำดับ</th>
            <th>คำถาม</th>
            <th style={{ textAlign: "center" }}>จำนวนครั้ง</th>
          </tr>
        </tbody>
        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{`${v.message}`}</td>
                <td className="blue" style={{ textAlign: "center" }}>{`${v.frequency}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableTopMassage;
