import { gql } from '@apollo/client';

const ALL_NOTES = gql`
    query {
        allNotes {
            id,
            createdAt,
            updatedAt,
            body
        }
    }
`

export { ALL_NOTES };