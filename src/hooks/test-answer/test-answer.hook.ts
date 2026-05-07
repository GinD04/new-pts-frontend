import { useTestStore } from '@/store';
import { UseTestAnswerProps, UseTestAnswerReturn } from './test-answer.types';
import { useCallback, useMemo } from 'react';
import { IAnswerData, isAnswerData, isArrayAnswerData } from '@/shared';
import { AnswerValueType } from '@/components';

export const useTestAnswer = ({ answerType, questionId }: UseTestAnswerProps): UseTestAnswerReturn => {
    const { answers, addAnswer, updateAnswer } = useTestStore();

    const currentAnswer = useMemo(() => {
        return answers.find(a => a.questionId === questionId);
    }, [answers, questionId]);

    const value = useMemo((): AnswerValueType => {
        if (!currentAnswer?.answer || currentAnswer.answer.length === 0) {
            return answerType === 'MULTIPLY' ? [] : '';
        }

        if (answerType === 'DRAG' || 'MAP') {
            return currentAnswer.answer;
        }

        const answerValues = currentAnswer.answer.map(a => a.answer);

        if (answerType === 'NUMBER') {
            return Number(answerValues[0] ?? 0);
        }

        return answerType === 'MULTIPLY' ? answerValues : (answerValues[0] ?? '');
    }, [currentAnswer, answerType]);

    const hasAnswer = useMemo(() => {
        return !!currentAnswer?.answer && currentAnswer.answer.length > 0;
    }, [currentAnswer]);

    const convertToAnswerData = useCallback((v: AnswerValueType): IAnswerData[] => {
        if (typeof v === 'string') {
            return v ? [{ answer: v, order: Date.now().toString() }] : [];
        }
        if (typeof v === 'number') {
            return [{ answer: v.toString(), order: Date.now().toString() }];
        }
        if (Array.isArray(v)) {
            return v.map(item => ({
                answer: isAnswerData(item) ? item.answer : item.toString(),
                order: Date.now().toString(),
            }));
        }
        return [];
    }, []);

    const saveAnswer = useCallback(
        (v: AnswerValueType) => {
            const answerData = isArrayAnswerData(v) ? v : convertToAnswerData(v);
            if (currentAnswer) {
                updateAnswer(questionId, answerData);
            } else {
                addAnswer({
                    questionId,
                    answer: answerData,
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
