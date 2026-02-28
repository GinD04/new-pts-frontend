import { useTestStore } from '@/store';
import { UseTestAnswerProps, UseTestAnswerReturn } from './test-answer.types';
import { useCallback, useMemo } from 'react';
import { IAnswerData } from '@/shared';
import { AnswerValueType } from '@/components';

export const useTestAnswer = ({ answerType, questionId }: UseTestAnswerProps): UseTestAnswerReturn => {
    const { answers, addAnswer, updateAnswer } = useTestStore();

    const currentAnswer = useMemo(() => {
        return answers.find(a => a.questionId === questionId);
    }, [answers, questionId]);

    const value = useMemo((): AnswerValueType => {
        if (!currentAnswer?.answers || currentAnswer.answers.length === 0) {
            return answerType === 'MULTIPLY' ? [] : '';
        }

        const answerValues = currentAnswer.answers.map(a => a.answer);

        return answerType === 'MULTIPLY' ? answerValues : (answerValues[0] ?? '');
    }, [currentAnswer, answerType]);

    const hasAnswer = useMemo(() => {
        return !!currentAnswer?.answers && currentAnswer.answers.length > 0;
    }, [currentAnswer]);

    const convertToAnswerData = useCallback((v: AnswerValueType): IAnswerData[] => {
        if (typeof v === 'string') {
            return v ? [{ answer: v, order: Date.now() }] : [];
        }
        if (typeof v === 'number') {
            return [{ answer: v.toString(), order: Date.now() }];
        }
        if (Array.isArray(v)) {
            return v.map(item => ({
                answer: item.toString(),
                order: Date.now(),
            }));
        }
        return [];
    }, []);

    const saveAnswer = useCallback(
        (v: AnswerValueType) => {
            const answerData = convertToAnswerData(v);

            if (currentAnswer) {
                updateAnswer(questionId, answerData);
            } else {
                addAnswer({
                    questionId,
                    answers: answerData,
                });
            }
        },
        [questionId, currentAnswer, addAnswer, updateAnswer, convertToAnswerData],
    );

    const clearAnswer = useCallback(() => {
        if (currentAnswer) {
            updateAnswer(questionId, []);
        }
    }, [questionId, currentAnswer, updateAnswer]);

    return {
        value,
        hasAnswer,
        saveAnswer,
        clearAnswer,
    };
};
