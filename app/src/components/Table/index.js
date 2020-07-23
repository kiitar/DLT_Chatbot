import React from "react";
import Button from "../Button/";
import axios from "axios";
import "./style.css";
import { TrainingContext } from "../../pages/Tranning";

const Table = ({ data }) => {
  const { Mount, Loading } = React.useContext(TrainingContext);
  const [mount, setMount] = Mount;
  const [, setLoading] = Loading;

  const handleDelete = (id) => {
    setLoading(true);
    deleteTrainSet(id);
  };

  const deleteTrainSet = (id) => {
    console.log(id);
    let data = JSON.stringify({
      query:
        "mutation deleteTrainSet(\n    $id:Int!\n  ){\n    deleteTrainSet(\n        id:$id\n    ){\n        id\n  }\n}",
      variables: { id: id },
    });

    let config = {
      method: "post",
      url: "http://103.245.164.59:50002",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.data) {
          setTimeout(() => {
            setLoading(false);
            setMount(!mount);
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr style={{ textAlign: "center", display: "flex", justifyContent: "start", height: "100%" }}>
            <th style={{ width: "50px" }}>ลำดับ</th>
            <th style={{ width: "150px" }}>คำถาม</th>
            <th style={{ width: "500px" }}>คำตอบ</th>
            <th style={{ textAlign: "center", width: "150px" }}>ค่าความมั่นใจ</th>
            <th style={{ textAlign: "center", width: "100px" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i} style={{ textAlign: "center", display: "flex", justifyContent: "start", height: "100%" }}>
                <td style={{ width: "50px" }}>{i + 1}</td>
                <td style={{ width: "150px" }}>{v.message}</td>
                <td style={{ width: "500px" }}>
                  {v.reply_message.map((v) => {
                    return `${v.reply_message} `;
                  })}
                </td>
                <td style={{ textAlign: "center", width: "150px" }}>{v.confident}</td>
                <td style={{ textAlign: "center", width: "100px" }}>
                  <Button name="delete " styleBtn="delete" onClick={() => handleDelete(v.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
