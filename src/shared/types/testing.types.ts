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
    answerType: AnswerType;
    answers?: string[];
}

export interface IAnswerData {
    answer: string;
    order: number;
}

export interface IAnswer {
    questionId?: number;
    answers?: IAnswerData[];
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
    NUMBER: 'NUMBER',
} as const;

export type AnswerType = (typeof ANSWER_TYPE)[keyof typeof ANSWER_TYPE];
