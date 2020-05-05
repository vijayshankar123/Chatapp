import React, { useState } from "react";
import { Link } from "react-router-dom";
const Join = () => {
  const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  const onChange = e => {
    setName(e.target.value);
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="joinInput"
            onChange={onChange}
          />
        </div>

        <Link
          onClick={e => (!name ? e.preventDefault() : null)}
          to={`/chat?name=${name}`}
        >
          <button className="button mt20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Join;
