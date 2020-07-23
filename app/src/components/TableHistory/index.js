import React from "react";


import "./style.css";


const Table = () => {

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>ลำดับ</th>
            <th>วันที่</th>
            <th style={{ width: '200px' }}>คำถาม</th>
            <th>คำตอบ</th>
            <th>ค่าความมั่นใจ</th>
            <th>สถานะ</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>1</td>
            <td>24-07-2020:20.41</td>
            <td>สวัสดี</td>
            <td>สวัสดีคะ กรมการขนส่งยินดีให้บริการคะ</td>
            <td className="blue">0.4236222222222222</td>
            <th className="green">ตอบได้</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;