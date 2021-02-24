import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Hotel</h1>
        <span>
          <button>Dashboard</button>
          <button>Manage Owners</button>
        </span>
        <br />
        <h4>Add Pet</h4>
        <span>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <select></select>
          <button>Submit</button>
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
          </tr>
        </table>
      </header>
    </div>
  );
}

export default Dashboard;
