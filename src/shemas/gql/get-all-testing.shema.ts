import { gql, TypedDocumentNode } from '@apollo/client';

export type GetAllTestingsQuery = {
    testing: [
        {
            __typename: 'Testing';
            duration?: number;
            id?: number;
            startTime?: string;
            title?: string;
        },
    ];
};

type GetAllTestingsQueryVariables = Record<string, never>;

export const GET_ALL_TESTINGS: TypedDocumentNode<GetAllTestingsQuery, GetAllTestingsQueryVariables> = gql`
    query GetAllTestingsQuery {
        testing {
            duration
            startTime
            title
            id
        }
    }
`;
