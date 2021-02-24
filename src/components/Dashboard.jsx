import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  useEffect(() => {

  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {};

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    setNewPet({ ...newPet, [event.target.name]: event.target.value });
  };

  const [newPet, setNewPet] = useState({
    name: '',
    color: '',
    breed: '',
    owner: ''
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Hotel</h1>
        <span>
          <button
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              history.push("/owners");
            }}
          >
            Manage Owners
          </button>
        </span>
        <br />
        <h4>Add Pet</h4>
        <span>
          <input onChange={handleChange} name="name" type="text" placeholder="Pet Name"/>
          <input onChange={handleChange} name="color" type="text" placeholder="Pet Color"/>
          <input onChange={handleChange} name="breed" type="text" placeholder="Pet Breed"/>
          <select onChange={handleChange} name="owner" placeholder="Owner Name"></select>
          <button onClick={handleSubmit}>Submit</button>
        </span>
        <br />
        <h4>History</h4>
        <table>
          <tr>
            <th>Owner</th>
            <th>Pet</th>
            <th>Breed</th>
            <th>Color</th>
            <th>Checked In</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button>Delete</button>
                <button>Check-In</button>
            </td>
          </tr>
        </table>
      </header>
    </div>
  );
}

export default Dashboard;
