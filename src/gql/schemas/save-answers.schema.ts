import { gql } from '@apollo/client';

export type AnswerValueInput = {
    answer: string;
    order?: string;
    zone?: string;
};

export type AnswerInput = {
    questionId: number;
    answer: AnswerValueInput[];
};

export type SaveStudentAnswerVariables = {
    studentId: number;
    testingId: number;
    answers: AnswerInput[];
};

export interface SaveStudentAnswerMutation {
    saveStudentAnswer: {
        endTime: string;
        ended: boolean;
        id: number;
        startTime: string;
        studentId: number;
        testingId: number;
    };
}

export const SAVE_ANSWER = gql`
    mutation SaveAnswersMutation($studentId: Int!, $testingId: Int!, $answers: [AnswerInput]!) {
        saveStudentAnswer(studentId: $studentId, testingId: $testingId, answers: $answers) {
            endTime
            ended
            id
            startTime
            studentId
            testingId
        }
    }
`;
