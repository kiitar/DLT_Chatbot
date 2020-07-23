import React, { useState } from "react";
import "./style.css";
import { TrainingContext } from "../../pages/Tranning";
import axios from "axios";
import { Modal as Modals } from "../Modal";

const CardTable = ({ data }) => {
  const { Mount, Loading } = React.useContext(TrainingContext);
  const [mount, setMount] = Mount;
  const [, setLoading] = Loading;
  const [confirm, setConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  const handleDelete = (id) => {
    setLoading(true);
    deleteTrainSet(id);
  };

  const beforeDedelete = (id) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const onClose = () => {
    console.log("clossssss");
    setConfirm(false);
  };

  const onSubmit = () => {
    console.log("submit");
    setConfirm(false);
    handleDelete(idDelete);
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
      {confirm && <Modals onClose={onClose} onSubmit={onSubmit} />}
      {data.map((v, i) => {
        return (
          <div className="container-card" key={i}>
            <div className="data-card-title bold">ลำดับ {i + 1}</div>
            <div className="data-card-word bold">{v.message}</div>
            <div className="data-card-word">
              {v.reply_message.map((v, i) => {
                return (
                  <div className="box-massage-card" key={i}>
                    <div className="massage-card"> {`${v.reply_message} `} </div>
                  </div>
                );
              })}
            </div>
            <div className="flex-card">
              <div className="data-card bold">ค่าความมั่นใจ</div>
              <div style={{ width: "10px" }}></div>

              {v.confident > 0.35 ? (
                <div className="data-card-word green bold">{v.confident}</div>
              ) : (
                <div className="data-card-word red bold">{v.confident}</div>
              )}
            </div>
            <div className="card-btn">
              <button className="btn-card" onClick={() => beforeDedelete(v.id)}>
                <i className="fa fa-trash btn-card-size"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardTable;
