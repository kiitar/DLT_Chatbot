import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";
import axios from "axios";
import moment from "moment";

const ChatBot = () => {
  const [datas, setDatas] = useState([
    { owner: "user", name: "admin", message: `สวัสดีครับ`, time: "00:00" },
    { owner: "bot", name: "กรมการขนส่งทางบก", message: `บอทสวัสดีครับ กรอกข้อความทดสอบได้เลยครับ`, time: "00:00" },
  ]);
  const messagesEnd = useRef();
  const bodyChatbot = useRef();
  const [message, setMessgae] = useState("");

  useEffect(() => {
    const scrollToBottom = (messagesEnd) => {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    if (bodyChatbot.current.scrollHeight > 600) {
      scrollToBottom(messagesEnd);
    }
  }, [datas]);

  const handleInputMessage = (e) => {
    setMessgae(e.target.value);
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    let arr = datas;

    arr.push({ owner: "user", name: "admin", message: `${message}`, time: moment(moment()).format("HH:mm") });
    setDatas([...arr]);
    setMessgae("");

    let data = JSON.stringify({
      query:
        "query getMessage(\n   $user_id:String!\n   $chatbot_id:Int!\n   $message:String!\n   $name:String\n   $provider:String!\n   $token:String!\n){\n    getMessage(\n         user_id:$user_id,\n         chatbot_id:$chatbot_id,\n         message:$message,\n         name:$name,\n         provider:$provider,\n         token:$token,\n    ){\n        found\n        intent\n        confidence\n        token\n        secrete\n        created_at\n  }\n}",
      variables: {
        user_id: "testtoken",
        chatbot_id: 1,
        message: `${message}`,
        name: "tar",
        provider: "test",
        token: "tar",
      },
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
        setDatas([
          ...datas,
          {
            owner: "bot",
            name: "กรมการขนส่งทางบก",
            message: `${response.data.data.getMessage.intent}`,
            time: `${response.data.data.getMessage.created_at}`,
          },
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container-main">
      <div className="page-main">
        <div className="padding-page">
          <p className="phone-p none-medai">ทดสอบการสนทนา</p>
          <div className="line-dashboard none-medai"></div>
          <div className="flex">
            <div className="main-chatbot-profile none-medai">
              <div className="profile-chat">
                <img className="user-logo" src={user} alt="" />
                <div className="name-chat-user">
                  <span className="nameuser">username</span>
                  <span className="status">status</span>
                </div>
              </div>
            </div>
            <div className="main-chatbot">
              <div className="body-chatbot" ref={bodyChatbot}>
                {datas &&
                  datas.map((v, i) => {
                    if (v.owner === "bot") {
                      return (
                        <div className="box-massages" key={i} ref={messagesEnd}>
                          <div className={`${v.owner}-chat`}>
                            <div className="icon-bot">
                              <img className={`${v.owner}-logo`} src={v.owner === "user" ? user : logo} alt="" />
                            </div>
                            <div className="box-massage-chat">
                              <div className="date">{v.name}</div>
                              <div className="massage-bot">
                                <p>{v.message}</p>
                              </div>
                              <div className="date-bot">{v.time}</div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="box-massages" key={i} ref={messagesEnd}>
                          <div className={`${v.owner}-chat`}>
                            <div className="box-massage-chat">
                              <div className="date-bot">{v.name}</div>
                              <div className="massage-bot">
                                <p>{v.message}</p>
                              </div>
                              <div className="date-bot">{v.time}</div>
                            </div>
                            <div className="icon-user">
                              <img className={`${v.owner}-logo`} src={v.owner === "user" ? user : logo} alt="" />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>

              {/* ------------------ */}
              <div className="box-txt">
                <div className="input-txt-massage">
                  <input
                    className="massage-chat"
                    type="text"
                    placeholder="..."
                    value={message}
                    onChange={(e) => {
                      handleInputMessage(e);
                    }}
                    onKeyDown={(e) => handleInputMessage(e)}
                  />
                </div>
                <div className="box-btn-massage">
                  <button className="sent-massage" onClick={handleSendMessage}>
                    {" "}
                    <i className="fa fa-paper-plane"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
