import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { getUser } from "../user";

export default function EventPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("");

  useEffect(() => {
    get();
  }, []);

  const user = getUser();

  const get = () => {
    const events = JSON.parse(localStorage.getItem("events"));
    setEvents(events?.filter((o) => o.userId === user?.id) || []);
  };

  const deleteEvent = (id) => {
    const data = [];
    const events = JSON.parse(localStorage.getItem("events"));
    data.push(...events.filter((e) => e.id !== id));
    localStorage.setItem("events", JSON.stringify(data));
    get();
  };
  const handleView =(item)=>{
    navigate(`/events/${item}?view=true`)
    setView("true");
  }
  

  return (
    <div >
      <Profile/>
      <div style={{margin:"auto",display:"flex",justifyContent:"space-between",width:"76%",marginBottom:"20px"}}>
        <div style={{fontSize:"x-large",fontWeight:"600"}}>
          <p>LIST OF USERS</p>
        </div>
        <div>
        <button
        className="addButton"
            
            onClick={() => navigate("/events/new")}
          >
            ADD USERS
          </button>
        </div>
      </div>
      <div className="eventPage">
        {events?.map((item, i) => {
          return (
            <div key={i} style={{display:"flex"}} className="card-container">
              <div style={{alignItems:"center", height:"90%",width:"95%",justifyContent:"center"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="card-name">{item.name}</div>
                <div  ><div style={item.age<=25?{backgroundColor:"green"}:item.age<=50?{backgroundColor:"purple"}:{backgroundColor:"orange"}} className="circle"></div></div>
                </div>
                <hr style={{marginBottom:"10px"}}></hr>
                
                <div>
                  <div style={{display:"flex"}}><div className="sub">AGE:</div><div style={{fontWeight:"600"}}>{item.age}</div></div>
                  <div  style={{display:"flex"}} ><div className="sub">DOB:</div><div style={{fontWeight:"600"}}>{item.date} </div></div>
                  <div  style={{display:"flex"}}><div className="sub">GENDER:</div><div style={{fontWeight:"600"}}>{item.type}</div></div>
                  <div  style={{display:"flex"}}><div className="sub">FAVOURITE FOOD:</div ><div style={{fontWeight:"600"}}>{item.food}</div></div>
                  <div  style={{display:"flex"}}><div className="sub">HOBBIES:</div><div style={{fontWeight:"600"}}>{item.hobbies}</div></div>
                </div>
                
                <hr style={{marginTop:"10px"}}></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between",marginTop:"20px" }}
                >
                  <button className="button-blue" onClick={() => navigate(`/events/${item.id}`)}>
                    Edit
                  </button>
                  <button className="button-red" onClick={() => deleteEvent(item.id)}>Delete</button>
                  <button className="button-blue" onClick={()=>handleView(item.id)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {!events.length && (
          <p style={{ textAlign: "center", marginTop: "15px" }}>No results</p>
        )}
      </div>
    </div>
  );
}
