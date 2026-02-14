export interface ITestInfo {
    id?: number;
    title?: string;
    duration?: number;
    startTime?: string;
    questions?: IQuestion[];
}

export interface IQuestion {
    id?: number;
    text?: string;
    answersType?: AnswerType;
    answers?: string[];
}

export interface IAnswer {
    questionId?: number;
    answers?: string[];
}

export interface ITestWithQuestions extends ITestInfo {
    questions?: IQuestion[];
}

export const ANSWER_TYPE = {
    SINGLE: 'SINGLE',
    MULTIPLY: 'MULTIPLY',
    STRING: 'STRING',
    TEXT: 'TEXT',
    MAP: 'MAP',
    DRAG: 'DRAG',
} as const;

export type AnswerType = (typeof ANSWER_TYPE)[keyof typeof ANSWER_TYPE];
