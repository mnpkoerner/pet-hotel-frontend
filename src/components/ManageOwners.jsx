import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ManageOwners() {

    const [newOwner, setNewOwner] = useState('');
    const ownerData = useSelector(state => state.ownerReducer);
    const dispatch = useDispatch();

    // // dummy owner data
    // const dummyData = [
    //     {
    //         id: 1,
    //         name: 'Travis',
    //         numberOfPets: '2'
    //     },
    //     {
    //         id: 2,
    //         name: 'Mark',
    //         numberOfPets: '13'
    //     },
    //     {
    //         id: 3,
    //         name: 'Josh',
    //         numberOfPets: '1'
    //     },
    //     {
    //         id: 4,
    //         name: 'Collin',
    //         numberOfPets: '2'
    //     }
    // ]

    useEffect(() => {
        dispatch({ type: 'FETCH_OWNER_DATA' });
    }, []);

    const submitNewOwner = (evt) => {
        evt.preventDefault();
        dispatch({ type: 'ADD_NEW_OWNER', payload: { name: newOwner } })
    }

    const deleteOwner = (id) => {
        dispatch({ type: 'DELETE_OWNER', payload: id })
    }

    return (
        <>
            <form onSubmit={submitNewOwner}>
                <h3>Add Owner</h3>
                <input
                    type="text"
                    placeholder="Owner name"
                    value={newOwner}
                    onChange={(event) => setNewOwner(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <br />
            <div>
                <h3>Owners</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number of pets</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownerData.map((owner, i) => {
                            return (
                                <tr key={i}>
                                    <td>{owner.name}</td>
                                    <td>{owner.count}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteOwner(owner.id)}
                                        >
                                            Delete
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ManageOwners;
