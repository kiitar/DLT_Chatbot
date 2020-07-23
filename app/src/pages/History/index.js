import React, { useState, useEffect } from "react";
import "../../style/layout.css";
import TableHistoryList from "../../components/TableHistoryList";
import CardTableHistoryList from "../../components/CardTableHistoryList";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const History = () => {
  const handleOnChangePage = (p) => {
    console.log(p);
  };

  const [total, setTotal] = useState(0);
  const [datas, setDatas] = useState([]);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      const currentBot = JSON.parse(localStorage.getItem("currentBot"));
      console.log(currentBot);

      let data = JSON.stringify({
        query:
          "query getConversationHistory(\n    $chatbot_id:Int!,\n    $offset:Int,\n    $limit:Int!\n  ){\n    getConversationHistory(\n        chatbot_id:$chatbot_id,\n        offset:$offset,\n        limit:$limit\n      ){\n      rows\n      data{\n        id\n      chatbot_id\n      name\n      interlocutor_id\n      provider\n      conversation\n      is_answerable\n      is_not_answerable\n      created_at\n      }\n  }\n}",
        variables: { chatbot_id: currentBot, offset: 0, limit: 10 },
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
          setDatas(response.data.data.getConversationHistory.data);
          setTotal(response.data.data.getConversationHistory.rows / 10);
          if (!mount) {
            setMount(!mount);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, [mount]);

  return (
    <div className="container-main">
      <div className="page-main">
        <div className="padding-page">
          <p className="phone-p">ประวัติการสนทนา</p>
          <div className="line-dashboard"></div>
          <div style={{ height: "20px" }}></div>
          <div className="data-table">{mount && <TableHistoryList data={datas} />}</div>

          <div className="card-data-table">{mount && <CardTableHistoryList data={datas} />}</div>

          <div>
            <div className="block center">
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
    </div>
  );
};

export default History;
