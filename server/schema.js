const { PrismaClient } = require('@prisma/client');
const { gql } = require('apollo-server');
const prisma = new PrismaClient();

const typeDefs = gql`
  type Note {
    id: ID!
    createdAt: String!
    updatedAt: String
    body: String!
  }
  type Query {
    allNotes: [Note!]!
  }
  type Mutation {
    createNote(body: String): Note!
    updateNote(id: ID! body: String!): Note
    deleteNote(id: ID!): Note
  }
`;

const resolvers = {
    Query: {
        allNotes: () => {
            return prisma.note.findMany({
                orderBy: [
                    {
                        createdAt: 'desc',
                    }
                ]
            });
        }
    },
    Mutation: {
        createNote: (_, { body }) => {
            return prisma.note.create({
                data: {
                    body
                },
            })
        },
        updateNote: (_, { id, body }) => {
            console.log(id, body)
            return prisma.note.update({
                where: { id: Number(id) },
                data: { body },
            });
        },
        deleteNote: async (_, { id }) => {
            return prisma.note.delete({
                where: {
                    id: Number(id),
                },
            });
        }
    }
}

module.exports = {
    resolvers,
    typeDefs,
}