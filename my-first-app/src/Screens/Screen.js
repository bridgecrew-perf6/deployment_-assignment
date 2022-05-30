import React, {useState, useEffect} from "react";
import API from "../Components/API";

const Screens = () => {

    const [input, setInput] = useState("2022-05-27T12:00:01")
    const [output, setOutput] = useState([])

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateTime1 = input.substring(0,13)
        const dateTime2 = input.substring(input.length-2)
        const dateTime3 = input.substring(14,16);
        const dateTime = dateTime1 + "%3A" + dateTime3 + "%3A" + dateTime2
        const {status, data} = await API.get(`/carpark-availability?date_time=${dateTime}`)
        if (status == 200){
            manipulateData(data);
        }
    }

    const manipulateData = (data) => {
        const carparkData = data.items[0].carpark_data
        setOutput(carparkData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Input your query data time in the form of "YYYY-MM-DD[T]HH:mm:ss (SGT)" <input type="text" value={input} onChange={handleInput}></input>
                <button type="submit">Submit</button>
            </form>
            <h3> Results: </h3>
            <ul>
                {output.map((item)=>{
                    return (
                        <li>Carpark Number: {item.carpark_number} Lots Available: {item.carpark_info[0].lots_available} Updated Date: {item.update_datetime.substring(0,10)} Updated Time: {item.update_datetime.substring(item.update_datetime.length-8)}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Screens