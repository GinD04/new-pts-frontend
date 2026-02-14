import { AnswerType } from '@/shared';
import { gql, TypedDocumentNode } from '@apollo/client';

type GetTestingByIdQuery = {
    testingById: {
        __typename?: 'Testing';
        duration: number;
        id: number;
        startTime: string;
        title: string;
        questions: Array<{
            __typename?: 'Question';
            question: string;
            id: number;
            answerType: AnswerType;
            answers: string[];
        }>;
    };
};

type GetByIdQueryVariables = {
    id: string;
};
export const GET_BY_ID_TESTING: TypedDocumentNode<GetTestingByIdQuery, GetByIdQueryVariables> = gql`
    query GetTestingByIdQuery($id: ID!) {
        testingById(id: $id) {
            duration
            id
            startTime
            title
            questions {
                question
                id
                answerType
                answers
            }
        }
    }
`;
