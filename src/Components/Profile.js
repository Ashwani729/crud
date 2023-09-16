import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../user";
import { TbUserCircle } from "react-icons/tb";

export default function Profile({ children }) {
  const navigate = useNavigate();
  const user = getUser();
  const logOut = () => {
    const users = [];

    users.push(...(JSON.parse(localStorage.getItem("users")) || []));

    const user = users.find((u) => u.login);
    if (user) {
      user.login = undefined;
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/");
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#616161",
        marginBottom: "20px",

        
        
      }}
    >
      <div style={{ textAlign: "center",display:"flex", justifyContent: "space-between",height:"73px",width:"76%",margin:"auto" }}>
        <div className="nav-head">
          <p>USER'S INVENTORY</p>
        </div>
        <div style={{display:"flex",alignItems:"center"}}>
          <p
            style={{
              fontSize: "20px",
              alignItems: "center",
              marginRight: "10px",
              color:"white"
            }}
          >
            <TbUserCircle/>
            
          </p>
          
            
            <button className="button-blue" onClick={() => logOut()}>Logout</button>
          
        </div>
      </div>
    </div>
  );
}
