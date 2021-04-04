import React, { useState, useEffect } from 'react'
import NotesContainer from './components/NotesContainer';
import EditorContainer from './components/EditorContainer';

import './App.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    //fetch data
  }, [])

  return (
    <div className="app-wrapper box">
      <NotesContainer
        notes={notes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <EditorContainer
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </div>
  );
}

export default App;
