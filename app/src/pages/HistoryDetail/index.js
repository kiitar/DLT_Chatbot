import React, { useEffect, useState } from "react";
import "../../style/layout.css";
import CardTableHistory from "../../components/CardTableHistory";
import { useParams } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
var axios = require("axios");
const HistoryDetail = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [datas, setDatas] = useState([]);
  const handleOnChangePage = (p) => {
    console.log(p);
    setPage(p);
  };

  let { id } = useParams();
  const [userID] = useState(id);

  useEffect(() => {
    const fetchData = (id) => {
      console.log(typeof id);
      let offset = `${page - 1}0`;

      let data = JSON.stringify({
        query:
          "query getConversationHistoryDetails(\n    $interlocutor_id:Int!,\n    $offset:Int,\n    $limit:Int!\n  ){\n    getConversationHistoryDetails(\n        interlocutor_id:$interlocutor_id,\n        offset:$offset,\n        limit:$limit\n      ){\n      rows\n      data {\n        id\n        interlocutor_id\n        message \n        reply_message \n        confident\n        is_answerable\n        created_at\n      }\n  }\n}",
        variables: { interlocutor_id: parseInt(id), offset: parseInt(offset), limit: 10 },
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
          setDatas(response.data.data.getConversationHistoryDetails.data);
          setTotal(response.data.data.getConversationHistoryDetails.rows / 10);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData(userID);
  }, [page, userID]);

  return (
    <div className="container-main">
      <div className="page-main">
        <div className="padding-page">
          <p className="phone-p">รายละเอียดการสนทนา</p>
          <div className="line-dashboard"></div>
          <div style={{ height: "20px" }}></div>

          <div className="card-data-table-open">
            <CardTableHistory data={datas} page={page} />
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
  );
};

export default HistoryDetail;
