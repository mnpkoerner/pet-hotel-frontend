import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ManageOwners() {

    const [newOwner, setNewOwner] = useState('');
    const ownerData = useSelector(state => state.ownerReducer);
    const dispatch = useDispatch();

    // dummy owner data
    const dummyData = [
        {
            id: 1,
            name: 'Travis',
            numberOfPets: '2'
        },
        {
            id: 2,
            name: 'Mark',
            numberOfPets: '13'
        },
        {
            id: 3,
            name: 'Josh',
            numberOfPets: '1'
        },
        {
            id: 4,
            name: 'Collin',
            numberOfPets: '2'
        }
    ]

    useEffect(() => {
        dispatch({ type: 'FETCH_OWNER_DATA' });
    }, []);

    const submitNewOwner = () => {
        dispatch({ type: 'ADD_NEW_OWNER', payload: newOwner })
    }

    const deleteOwner = () => {
        dispatch({ type: 'ADD_NEW_OWNER', payload: newOwner })
    }

    return (
        <>
            <form>
                <h3>Add Owner</h3>
                <input
                    type="text"
                    placeholder="Owner name"
                    value={newOwner}
                    onChange={(event) => setNewOwner(event.target.value)}
                />
                <button onClick={submitNewOwner}>Submit</button>
            </form>
            <br />
            <div>
                <h3>Owners</h3>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Number of pets</th>
                        <th>Actions</th>
                    </tr>
                    {dummyData.map((owner, i) => {
                        return (
                            <tr key={i}>
                                <td>{owner.name}</td>
                                <td>{owner.numberOfPets}</td>
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
                </table>
            </div>

        </>
    )
}

export default ManageOwners;