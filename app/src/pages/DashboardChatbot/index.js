import React, { useState, useEffect } from "react";
import TableTopMassage from "../../components/TableTopMassage";
import axios from "axios";

const DashboardChatbot = () => {
  const [dashboardData, setDashboardData] = useState();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let currentBot = JSON.parse(localStorage.getItem("currentBot"));
      console.log("DB", currentBot);

      let data = JSON.stringify({
        query:
          "query getDashboard($chatbot_id:Int!,){\n    getDashboard(chatbot_id:$chatbot_id){\n      dashboardHistory{\n          allUsers\n          allConversationHistory\n          conversationRatio\n          conversationIsAnswerable\n          conversationIsNotAnswerable\n      },\n      dashboardCurrent{\n          allUsers\n          allConversationHistory\n          conversationRatio\n          conversationIsAnswerable\n          conversationIsNotAnswerable\n      },\n      dashboardRanking{\n          topMessage{\n            id\n            chatbot_id\n            message\n            frequency\n          }\n      }\n  }\n}",
        variables: { chatbot_id: currentBot },
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
        .then(async (response) => {
          // console.log(response.data.data.getDashboard);
          await setDashboardData(response.data.data.getDashboard);
          if (!mount) {
            setMount(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    // setId(Select.chatbot.id);
    fetchData();
    return () => {
      setMount(true);
    };
  }, [mount]);

  return (
    <div className="container-main">
      <div className="page-main">
        <div className="padding-page">
          <p className="phone-p">จำนวนการสนทนาทั้งหมด</p>
          <div className="line-dashboard"></div>
          <div className="box-main-dashboard">
            <div className="">
              <div className="box-dashboard-1">
                <div>
                  <i className="fa fa-comments-o icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">คนที่สนทนาทั้งหมด</div>
                  <div className="font-dashboard">{mount && `${dashboardData.dashboardHistory.allUsers}`}</div>
                  <div className="font-dashboard-massage">คน</div>
                </div>
              </div>
            </div>

            <div className="flex-dashboard">
              <div className="box-dashboard-2">
                <div>
                  <i className="fa fa-comments icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">บทสนทนาทั้งหมด</div>
                  <div className="font-dashboard allcolor">
                    {mount && `${dashboardData.dashboardHistory.allConversationHistory}`}
                  </div>
                  <div className="font-dashboard-massage">massage</div>
                </div>
              </div>
              <div className="box-dashboard-3">
                <div>
                  <i className="fa fa-line-chart icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">บทสนทนา/คน</div>
                  <div className="font-dashboard blue">
                    {mount && `${dashboardData.dashboardHistory.conversationRatio}%`}
                  </div>
                  <div className="font-dashboard-massage">percent</div>
                </div>
              </div>
              <div className="box-dashboard-4">
                <div>
                  <i className="fa fa-commenting icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">คำถามที่ตอบได้</div>
                  <div className="font-dashboard green">
                    {mount && `${dashboardData.dashboardHistory.conversationIsAnswerable}`}
                  </div>
                  <div className="font-dashboard-massage">massage</div>
                </div>
              </div>
              <div className="box-dashboard-5">
                <div>
                  <i className="fa fa-commenting-o icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">คำถามที่ตอบไม่ได้</div>
                  <div className="font-dashboard red">
                    {mount && `${dashboardData.dashboardHistory.conversationIsNotAnswerable}`}
                  </div>
                  <div className="font-dashboard-massage">massage</div>
                </div>
              </div>
            </div>
          </div>

          <p className="phone-p">จำนวนการสนทนาของวันนี้</p>
          <div className="line-dashboard"></div>

          <div className="box-main-dashboard">
            <div className="">
              <div className="box-dashboard-1">
                <div>
                  <i className="fa fa-comments-o icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">คนที่สนทนาวันนี้</div>
                  <div className="font-dashboard"> {mount && `${dashboardData.dashboardCurrent.allUsers}`}</div>
                  <div className="font-dashboard-massage">คน</div>
                </div>
              </div>
            </div>

            <div className="flex-dashboard">
              <div className="box-dashboard-2">
                <div>
                  <i className="fa fa-comments icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">บทสนทนาวันนี้</div>
                  <div className="font-dashboard allcolor">
                    {" "}
                    {mount && `${dashboardData.dashboardCurrent.allConversationHistory}`}
                  </div>
                  <div className="font-dashboard-massage">massage</div>
                </div>
              </div>
              <div className="box-dashboard-3">
                <div>
                  <i className="fa fa-line-chart icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">บทสนทนา/คน</div>
                  <div className="font-dashboard blue">
                    {" "}
                    {mount && `${dashboardData.dashboardCurrent.conversationRatio}%`}
                  </div>
                  <div className="font-dashboard-massage">percent</div>
                </div>
              </div>
              <div className="box-dashboard-4">
                <div>
                  <i className="fa fa-commenting icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">คำถามที่ตอบได้</div>
                  <div className="font-dashboard green">
                    {" "}
                    {mount && `${dashboardData.dashboardCurrent.conversationIsAnswerable}`}
                  </div>
                  <div className="font-dashboard-massage">massage</div>
                </div>
              </div>
              <div className="box-dashboard-5">
                <div>
                  <i className="fa fa-commenting-o icon-dashboard"></i>
                </div>
                <div className="right-dashboard">
                  <div className="font-dashboard-massage">คำถามที่ตอบไม่ได้</div>
                  <div className="font-dashboard red">
                    {" "}
                    {mount && `${dashboardData.dashboardCurrent.conversationIsNotAnswerable}`}
                  </div>
                  <div className="font-dashboard-massage">massage</div>
                </div>
              </div>
            </div>

            <div className="flex-dashboard-colum">
              <p className="phone-p">Top massage</p>
              <div className="line-dashboard"></div>
              <div className="table-massage">
                {mount && <TableTopMassage data={dashboardData.dashboardRanking.topMessage} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChatbot;
