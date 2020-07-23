import React, { useState } from "react";
import Button from "../Button";
import { TrainingContext } from "../../pages/Tranning";
import "./style.css";
import { Modal as Modals } from "../Modal";

const CreateMenu = ({ handleValidate }) => {
  const { Modal, Question, Answer, WarningMessage } = React.useContext(TrainingContext);
  const [, setModal] = Modal;
  const [question, setQuestion] = Question;
  const [answer, setAnswer] = Answer;
  const [warningMessage, setWarningMessage] = WarningMessage;
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    setWarningMessage("");
    setModal(false);
  };

  const handleSubmit = () => {
    console.log("submit");

    setWarningMessage("");
    setConfirm(true);
  };

  const onClose = () => {
    console.log("clossssss");
    setConfirm(false);
  };

  const onSubmit = () => {
    console.log("submit");
    // setModal(false);
    setConfirm(false);
    handleValidate();
  };

  const handleAddAnswer = () => {
    console.log("add ans");
    let ans = answer;
    ans.push("");
    setAnswer([...ans]);
    console.log(answer);
  };

  const handleRemoveAnswer = () => {
    let ans = answer;
    if (answer.length > 1) {
      ans.pop();

      setAnswer([...ans]);
    } else {
      setWarningMessage("ไม่สามารถลบคำตอบนี้ได้");
    }
  };

  const handleInputAnswer = (e, i) => {
    let ans = answer;
    ans.splice(i, 1, e.target.value);
    setWarningMessage("");
    setAnswer([...ans]);
  };

  const handleInputQuestion = (e) => {
    setWarningMessage("");
    setQuestion(e.target.value);
  };

  return (
    <>
      <div className="modal">
        <div className="container-create">
          {confirm && <Modals onClose={onClose} onSubmit={onSubmit} />}
          <div>
            <div>คำถาม</div>
            <div className="flex-create">
              <textarea
                className="text-area"
                maxLength="100"
                placeholder="เพิ่มคำถาม..."
                onChange={(e) => handleInputQuestion(e)}
              />
              <em>{question.length}/100</em>
            </div>
            <div style={{ margin: "20px 0" }} />
            {answer.map((v, i) => {
              return (
                <div className="massage-padding" key={i}>
                  <div>คำตอบ</div>
                  <div className="flex-create">
                    <textarea
                      key={i}
                      maxLength="250"
                      className="text-area"
                      placeholder="เพิ่มคำตอบ..."
                      onChange={(e) => {
                        handleInputAnswer(e, i);
                      }}
                    />
                    <em>{answer[i].length}/250</em>
                  </div>
                </div>
              );
            })}
            <div className="right flex">
              {answer.length > 1 && (
                <div>
                  <Button name="ลบคำตอบ -" styleBtn="delete" onClick={handleRemoveAnswer} />
                </div>
              )}
              <div style={{ margin: "0 10px" }}></div>
              <div>
                <Button name="เพิ่มคำตอบ +" styleBtn="create" onClick={handleAddAnswer} />
              </div>
            </div>
          </div>

          <div style={{ margin: "100px 0" }}></div>
          {warningMessage !== "" && <p style={{ color: "orange" }}>{`* Warning ! ${warningMessage} `}</p>}
          <div className="flex center">
            <div className="padding-btn">
              <Button name="Training" styleBtn="create" onClick={handleSubmit} />
            </div>
            <div className="padding-btn">
              <Button name="Close" styleBtn="close" onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMenu;
