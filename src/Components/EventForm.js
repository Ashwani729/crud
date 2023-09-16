import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Profile from "./Profile";

export default function EventForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (params.id) {
            const events = JSON.parse(localStorage.getItem("events"));
            if (events && events.length) {
                const ev = events.find(e => e.id === Number(params.id));
                if (ev) {
                    setEvent(ev);
                } else {
                    navigate("/events");
                }
            }
        }
    }, []);

    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === "age") {
            value = value.replace(/\D/g, "");
        }
        
        setEvent(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");
    }
    

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const cancel = () => {
        setEvent({});
        setErrors({});
        navigate("/events");
    }

    const create = () => {

        const validate = ["name", "hobbies", "food", "date", "type","age"];
        let errs = {};
        for (let i = 0; i < validate.length; i++) {
            if (!event[validate[i]]) {
                errs = {...errs, [validate[i]]: `${validate[i]} is required`};
            }
        }

        setErrors(prev => {
            return {
                ...prev,
                ...errs
            }
        });

        if (!Object.keys(errs).length) {
            save();
        }

    }
    

    const save = () => {
        const data = [];
        const user = {id: 1};
        const old = JSON.parse(localStorage.getItem("events"));
        let id = 1;
        if (old) {
            data.push(...old);
            id = old.length ? old[old.length - 1].id + 1 : 1;
        }

        if (event?.id) {
            const oldEvent = data.find(o => o.id === event.id);
            for (const a in oldEvent) {
                oldEvent[a] = event[a];
            }
        } else {
            data.push({id, userId: user.id, ...event});
        }

        localStorage.setItem("events", JSON.stringify(data));
        cancel();
    }
    console.log("string",event.st)

    return (
        <div>
            <Profile children={
                <button style={{width: "80px"}} onClick={() => navigate("/events")}>Events</button>
            }/>
            <div className="card">
                <div className="form">
                    <div className="title">
                    {window.location.href.includes("view=true")?<p>View User</p>:
                        <p>{event.id ? "Update" : "Create"} User</p>}
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Name<span className="mandatory">*</span></label>
                        <input type="text" name="name" value={event.name || ""} onChange={handleChange}/>
                        {
                            !!errors.name && <span className="mandatory">{errors.name}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Hobbies<span className="mandatory">*</span></label>
                        <textarea style={{width: "100%"}} rows="4" name="hobbies" value={event.hobbies || ""}
                                  onChange={handleChange}></textarea>
                        {
                            !!errors.hobbies && <span className="mandatory">{errors.hobbies}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{width: "45%"}}>
                            <label>FAVOURITE FOOD<span className="mandatory">*</span></label>
                            <input type="text" name="food" value={event.food || ""} onChange={handleChange}/>
                            {
                                !!errors.food && <span className="mandatory">{errors.food}</span>
                            }
                        </div>
                        <div style={{width: "45%"}}>
                            <label>DOB<span className="mandatory">*</span></label>
                            <input type="date" name="date" value={event.date || ""} onChange={handleChange}/>
                            {
                                !!errors.date && <span className="mandatory">{errors.date}</span>
                            }
                        </div>
                    </div>
                    <div className="space"></div>
                    <div >
                        <label>Gender<span className="mandatory">*</span></label>
                        <div className="space"></div>
                        <div className="radio" style={{display: "flex"}}>
                            <div>
                                <label>
                                    <input type="radio" name="type" value="Male" checked={event.type === "Male"}
                                           onChange={handleChange}/>
                                    &nbsp;Male</label>
                            </div>
                            <div style={{marginLeft: "10px"}}>
                                <label>
                                    <input type="radio" name="type" value="Female" checked={event.type === "Female"}
                                           onChange={handleChange}/>
                                    &nbsp;Female</label>
                            </div>
                        </div>
                        {
                            !!errors.type && <span className="mandatory">{errors.type}</span>
                        }
                        <div style={{width: "45%"}}>
                            <label>Age<span className="mandatory">*</span></label>
                            <input type="text" name="age" value={event.age || ""} onChange={handleChange}/>
                            {
                                !!errors.age && <span className="mandatory">{errors.age}</span>
                            }
                        </div>
                    </div>

                    <div className="space"></div>
                    <div>
                        <button className="button-red" onClick={() => cancel()}>CLOSE</button>
                        {window.location.href.includes("view=true")?<div></div>:<button className="button-blue" style={{marginLeft: "5px"}}
                                onClick={() => create()}>{event.id ? "UPDATE" : "CREATE"}</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}