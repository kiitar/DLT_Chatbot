import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import CardTable from "../../components/CardTable";
import CreateMenu from "../../components/CreateMenu";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";

export const TrainingContext = React.createContext();

const Tranning = () => {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dataTrain, setDataTrain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([""]);
  const [mount, setMount] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let offset = `${page - 1}0`;

      let data = JSON.stringify({
        query:
          "query getTrainSet($offset:Int,$limit:Int!,$chatbot_id:Int!){\n    getTrainSet(offset:$offset,limit:$limit,chatbot_id:$chatbot_id){\n      rows\n      data {\n        id\n        message\n        keyword\n        status\n        created_at\n        reply_message {\n        \n          reply_message\n        }\n        confident\n      }\n  }\n}",
        variables: { offset: parseInt(offset), limit: 10, chatbot_id: 1 },
      });

      let config = {
        method: "post",
        url: "http://103.245.164.59:50002",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(function (response) {
          setDataTrain(response.data.data.getTrainSet.data);
          setTotal(response.data.data.getTrainSet.rows / 10);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    console.log("mount");

    fetchData();
  }, [page, mount]);

  const handleClick = () => {
    console.log("modal");
    setQuestion("");
    setAnswer([""]);
    console.log(question, answer);
    setModal(true);
  };

  const handleValidate = () => {
    console.log("check");
    if (question === "") {
      setWarningMessage("กรุณากรอกคำถาม .");
      return;
    }
    if (answer.some((v) => v === "")) {
      setWarningMessage("กรุณากรอกคำตอบ .");
      return;
    }

    handleCreate();
  };

  const handleCreate = () => {
    console.log("create");
    console.log(question);
    console.log(answer);
    setModal(false);
    setLoading(true);

    let data = JSON.stringify({
      query:
        "mutation createTrainSet(\n  $chatbot_id:Int!,\n  $message:String!, \n  $intent:[String!]!\n  ){\n    createTrainSet(\n      chatbot_id:$chatbot_id,\n      message:$message, \n      intent:$intent\n    ){\n     message\n     intent\n  }\n}",
      variables: { chatbot_id: 1, message: question, intent: answer },
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
        if (response.error) {
          console.log("error");
          return;
        }
        console.log(response.data);

        setTimeout(() => {
          setLoading(false);
          setPage(1);
          setMount(!mount);
        }, 5000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOnChangePage = (p) => {
    console.log(p);
    setPage(p);
  };

  return (
    <TrainingContext.Provider
      value={{
        Modal: [modal, setModal],
        Question: [question, setQuestion],
        Answer: [answer, setAnswer],
        WarningMessage: [warningMessage, setWarningMessage],
        Mount: [mount, setMount],
        Loading: [loading, setLoading],
      }}
    >
      <div className="container-main">
        <div className="page-main">
          <div className="padding-page">
            <div className="pagename-history">Training</div>
            <div className="line-dashboard"></div>
            <div className="top-page">
              <div className="namepage"></div>
              <div className="btn-open-tranning">
                <Button name="Training" styleBtn="create" onClick={handleClick} />
              </div>
              <div>{modal && <CreateMenu handleValidate={handleValidate} />}</div>
            </div>
            {loading && (
              <div className="center">
                <CircularProgress />
              </div>
            )}

            <div className="card-data-table-open">
              <CardTable data={dataTrain} />
            </div>

            <div>
              <div className="pagination-center">
                {total > 0 && (
                  <Pagination
                    count={Math.ceil(total)}
                    shape="rounded"
                    onChange={(e, p) => {
                      handleOnChangePage(p);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TrainingContext.Provider>
  );
};

export default Tranning;
