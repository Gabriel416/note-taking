import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NotesContainer from './components/NotesContainer';
import EditorContainer from './components/EditorContainer';

import { ALL_NOTES } from './Queries';
import './App.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const { error, loading, data, refetch, networkStatus } = useQuery(
    ALL_NOTES,
    { notifyOnNetworkStatusChange: true }
  );

  useEffect(() => {
    if (data && data.allNotes) {
      setNotes(data.allNotes);
    }
  }, [data])

  return (
    <div className="app-wrapper box">
      <NotesContainer
        error={error}
        loading={loading}
        networkStatus={networkStatus}
        refetch={refetch}
        notes={notes}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <EditorContainer
        refetch={refetch}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
    </div>
  );
}

export default App;
