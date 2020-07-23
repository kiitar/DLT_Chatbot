import React from "react";
import Button from "../../components/Button";


const Config = () => {
  return (
    <div className="container-main">
      <div className="page-main">
        <div className="padding-page">
          <p className="phone-p">รายละเอียดการสนทนา</p>
          <div className="line-dashboard"></div>

          <div>
            
            <div className="container-line">
              <div className="box-icon-line">
                <h1>LINE</h1>
              </div>
              <div className="box-config">
                <input className="input-config" type="text" placeholder="Tokan"/>
              </div>
              <div className="box-config">
                <input className="input-config" type="text" placeholder="Select Key"/>
              </div>
              <div className="flex center">
                <div className="padding-btn">
                  <Button name="submit" styleBtn="create" />
                </div>
                <div className="padding-btn">
                  <Button name="cancel" styleBtn="close" />
                </div>
              </div>
            </div>

            <div className="container-line">
              <div className="box-icon-line">
                <h1>FACEBOOK</h1>
              </div>
              <div className="box-config">
                <input className="input-config" type="text" placeholder="Tokan"/>
              </div>

              <div className="flex center">
                <div className="padding-btn">
                  <Button name="submit" styleBtn="create" />
                </div>
                <div className="padding-btn">
                  <Button name="cancel" styleBtn="close" />
                </div>
              </div>
            </div>


          </div>


        </div>
      </div>
    </div>
  );
};

export default Config;
