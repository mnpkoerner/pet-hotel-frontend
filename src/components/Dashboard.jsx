import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  useEffect(() => {
    dispatch({ type: "FETCH_PETS" });
    dispatch({ type: "FETCH_OWNER_DATA" });
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();

  const ownerReducer = useSelector((store) => store.ownerReducer);
  const petReducer = useSelector((store) => store.petReducer);

  const handleSubmit = () => {
    dispatch({ type: "POST_PET", payload: newPet });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_PET", payload: id });
  };

  const handleCheckIn = (id) => {
    console.log("id", id);
    dispatch({ type: "UPDATE_CHECK_IN", payload: id });
  };

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    setNewPet({ ...newPet, [event.target.name]: event.target.value });
  };

  const [newPet, setNewPet] = useState({
    owner: "",
    name: "",
    breed: "",
    color: "",
  });

  return (
    <div>
      <h4>Add Pet</h4>
      <span>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Pet Name"
        />
        <input
          onChange={handleChange}
          name="color"
          type="text"
          placeholder="Pet Color"
        />
        <input
          onChange={handleChange}
          name="breed"
          type="text"
          placeholder="Pet Breed"
        />
        <select onChange={handleChange} name="owner" placeholder="Owner Name">
          <option value="" selected>Select an Owner</option>
          {ownerReducer.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
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
          {petReducer.map((pet) => {
            <>
              <td>{pet.owner}</td>
              <td>{pet.name}</td>
              <td>{pet.breed}</td>
              <td>{pet.color}</td>
              <td>{pet.checkedIn}</td>
              <td>
                <button onClick={() => handleDelete(pet.id)}>Delete</button>
                <button onClick={() => handleCheckIn(pet.id)}>Check-In</button>
              </td>
            </>
          })}
        </tr>
      </table>
    </div>
  );
}

export default Dashboard;
