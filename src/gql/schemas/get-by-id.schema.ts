import { IQuestion } from '@/shared';
import { gql, TypedDocumentNode } from '@apollo/client';

export type GetTestingByIdQuery = {
    testingById: {
        __typename?: 'Testing';
        description: string;
        duration: number;
        startTime: string;
        title: string;
        questions: IQuestion[];
    };
};

export type GetByIdQueryVariables = {
    id: string;
};
export const GET_BY_ID_TESTING: TypedDocumentNode<GetTestingByIdQuery, GetByIdQueryVariables> = gql`
    query GetTestingByIdQuery($id: ID!) {
        testingById(id: $id) {
            description
            duration
            questions {
                answerType
                answers
                id
                text
                zones {
                    max
                    min
                    name
                }
            }
            startTime
            title
        }
    }
`;
