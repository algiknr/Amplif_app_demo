import React, {useEffect, useState} from 'react';
import './App.css';
import {API, Storage} from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import {listNotes} from './graphql/queries';
import {createNote as createNoteMutation, deleteNote as deleteNoteMutation} from './graphql/mutations';


const initialFormState = { name: '', description: '' }

function Notes({ signOut, user }) {
    const [notes, setNotes] = useState([]);   const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {fetchNotes();   }, []);

    async function fetchNotes() {


        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;

        await Promise.all(notesFromAPI.map(async note => {
            if (note.image) {
                note.image = await Storage.get(note.image);
            }
            return note;
        }))
        setNotes(apiData.data.listNotes.items);
    }

    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        await fetchNotes();
    }

    async function createNote() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        if (formData.image) {
            formData.image = await Storage.get(formData.image);
        }
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
    }

    async function deleteNote({ id }) {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});   }

    console.log(user)
    return (
        <div className="App">

            <h1>My Notes App {user.attributes.email}</h1>
            <input
                type="file"
                onChange={onChange}
            />

            <input
                onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                placeholder="Note name"
                value={formData.name}
            />
            <input
                onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                placeholder="Note description"
                value={formData.description}
            />
            <button onClick={createNote}>Create Note</button>
            <button onClick={signOut}>Log Out</button>
            <div style={{marginBottom: 30}}>
                {
                    notes.map(note => (
                        <div key={note.id || note.name}>
                            <h2>{note.name}</h2>
                            <p>{note.description}</p>
                            <button onClick={() => deleteNote(note)}>Delete note</button>
                            {
                                note.image && <img src={note.image} style={{width: 400}}  alt="text"/>
                            }
                        </div>
                    ))
                }
            </div>
        </div>   ); }
export default withAuthenticator(Notes);