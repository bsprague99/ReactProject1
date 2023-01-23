import axios from 'axios'
import Table from './Table';
import Form from './Form';
import React, {useState, useEffect} from 'react';

function MyApp() {

    const [characters, setCharacters] = useState([]);

    async function removeOneCharacter (index) {
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);  

        const Id = characters[index].id; 
        const response = await axios.delete(`http://localhost:5000/users/${Id}`);
        
        if (response.status === 204) {
            console.log(`deleted success`);
        }
        else{
            console.log(`delete failed `);
        }
    }  
    
    function updateList(person) { 
        makePostCall(person).then( result => {
            if (result && result.status === 201){
                console.log(`added success`);
            }  
            else{
                console.log(`added failed`);
            }
        });
    }

    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/users');
            return response.data.users_list;     
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error); 
            return false;         
        }
    }

    useEffect(() => {
    fetchAll().then( result => {
        if (result)
            setCharacters(result);
        });
    }, [] );

    async function makePostCall(person){
        try {
           const response = await axios.post('http://localhost:5000/users', person);
           setCharacters([...characters, response.data]);
           return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
    }

    return (
        <div className="container">
          <Table characterData={characters} removeCharacter={removeOneCharacter} />
          <Form handleSubmit={updateList} />
        </div>
    )
}
export default MyApp;