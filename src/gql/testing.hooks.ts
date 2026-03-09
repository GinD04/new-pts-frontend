import { createMutationHook, createQueryHook } from './apollo.utils';
import {
    GET_ALL_TESTINGS,
    GET_BY_ID_TESTING,
    GetAllTestingsQuery,
    GetByIdQueryVariables,
    GetTestingByIdQuery,
    SAVE_ANSWER,
    SaveStudentAnswerMutation,
    SaveStudentAnswerVariables,
} from './schemas';

export const useGetAllTesting = createQueryHook<GetAllTestingsQuery>(GET_ALL_TESTINGS);

export const useGetTestingById = createQueryHook<GetTestingByIdQuery, GetByIdQueryVariables>(GET_BY_ID_TESTING);

export const useSaveAnswer = createMutationHook<SaveStudentAnswerMutation, SaveStudentAnswerVariables>(
    SAVE_ANSWER,
);
