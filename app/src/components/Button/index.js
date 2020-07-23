import React from "react";
import "./style.css"

const Button = (props) => {

  let styleBtn = 'btn-open'

  if (props.styleBtn === 'create') {
    styleBtn = 'btn-open' 
  }
  else if(props.styleBtn === 'delete') {
    styleBtn = 'btn-delete' 
  }
  else if(props.styleBtn === 'close') {
    styleBtn = 'btn-close' 
  }
  else if(props.styleBtn === 'view') {
    styleBtn = 'btn-view' 
  }


  return (
    <div>
      <button className={styleBtn} onClick={props.onClick}>
        {props.name}
      </button>
    </div>
  );
};

export default Button;
