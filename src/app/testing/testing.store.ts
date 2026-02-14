import { IAnswer } from '@/shared';
import { create } from 'zustand';

type TestState = {
    totalQuestions: number;
    currentQuestion: number;
    answers: IAnswer[];

    setTotalQuestions: (count: number) => void;
    setCurrentQuestion: (index: number) => void;
    addAnswer: (answer: IAnswer) => void;
    updateAnswer: (questionId: number, answer: string[]) => void;
    clearTest: () => void;

    getProgress: () => number;
    getAnsweredCount: () => number;
};

export const useTestStore = create<TestState>((set, get) => ({
    totalQuestions: 0,
    currentQuestion: 0,
    answers: [],

    setTotalQuestions: count => set({ totalQuestions: count }),

    setCurrentQuestion: index => set({ currentQuestion: index }),

    addAnswer: answer =>
        set(state => ({
            answers: [...state.answers, answer],
        })),

    updateAnswer: (questionId, updatedFields) =>
        set(state => ({
            answers: state.answers.map(answer =>
                answer.questionId === questionId ? { ...answer, updatedFields } : answer,
            ),
        })),

    clearTest: () =>
        set({
            totalQuestions: 0,
            currentQuestion: 0,
            answers: [],
        }),

    getProgress: () => {
        const state = get();
        return state.totalQuestions > 0
            ? Math.round(((state.currentQuestion + 1) / state.totalQuestions) * 100)
            : 0;
    },

    getAnsweredCount: () => {
        return get().answers.length;
    },
}));
