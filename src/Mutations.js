import { gql } from '@apollo/client';

const CREATE_NOTE = gql`mutation createNote($body: String!) {
    createNote(body: $body) {
        id,
        createdAt,
        updatedAt,
        body
    }
}`;


const UPDATE_NOTE = gql`mutation updateNote($id: ID! $body: String!) {
    updateNote(id: $id body: $body) {
        id,
        createdAt,
        updatedAt,
        body
    }
}`;

const DELETE_NOTE = gql`mutation deleteNote($id: ID!) {
    deleteNote(id: $id) {
        id,
        createdAt,
        updatedAt,
        body
    }
}`;


export { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE };



