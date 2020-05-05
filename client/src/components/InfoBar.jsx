import React from "react";

const InfoBar = ({ room, roomdata }) => {
  console.log(roomdata);
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src={
            "https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"
          }
          alt="1"
        />
        <h3>
          {room} ({roomdata[0] && roomdata[0].length} online)
        </h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img
            className=""
            src={
              "https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png"
            }
            alt="2"
          />
        </a>
      </div>
    </div>
  );
};
export default InfoBar;
