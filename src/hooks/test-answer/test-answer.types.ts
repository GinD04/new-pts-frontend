import { AnswerValueType } from '@/components';

export interface UseTestAnswerProps {
    questionId: number;
    answerType: string;
}

export interface UseTestAnswerReturn {
    value: AnswerValueType;
    hasAnswer: boolean;
    saveAnswer: (value: AnswerValueType) => void;
    clearAnswer: () => void;
}
