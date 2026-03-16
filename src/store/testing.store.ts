import { IAnswer, IAnswerData, IQuestion, IZoneInfo } from '@/shared';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TestState = {
    currentQuestionNumber: number;
    answers: IAnswer[];
    questions: IQuestion[];
    totalQuestions: number;
    duration?: number;
    globalAnswers: string[] | null;
    globalZones: IZoneInfo[] | null;

    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;

    setCurrentQuestionNumber: (index: number) => void;
    setDuration: (duration: number) => void;
    setQuestions: (questions: IQuestion[]) => void;
    addAnswer: (answer: IAnswer) => void;
    updateAnswer: (questionId: number, answer: IAnswerData[]) => void;
    clearTest: () => void;
    setGlobalAnswers: (globalAnswers: string[] | null) => void;
    setGlobalZones: (globalZones: IZoneInfo[] | null) => void;

    getProgress: () => number;
    getAnsweredCount: () => number;
};

export const useTestStore = create<TestState>()(
    persist(
        (set, get) => ({
            currentQuestionNumber: 0,
            answers: [],
            questions: [],
            totalQuestions: 0,
            _hasHydrated: false,
            duration: undefined,
            globalAnswers: null,
            globalZones: null,

            setCurrentQuestionNumber: index => set({ currentQuestionNumber: index }),

            setQuestions: questions =>
                set({
                    questions: questions,
                    totalQuestions: questions.length,
                }),

            setDuration: duration => set({ duration }),

            addAnswer: answer =>
                set(state => ({
                    answers: [...state.answers, answer],
                })),

            updateAnswer: (questionId, newAnswers) =>
                set(state => ({
                    answers: state.answers.map(answer =>
                        answer.questionId === questionId ? { ...answer, answers: newAnswers } : answer,
                    ),
                })),

            setGlobalAnswers: globalAnswers => set({ globalAnswers }),

            setGlobalZones: globalZones => set({ globalZones }),

            clearTest: () =>
                set({
                    totalQuestions: 0,
                    currentQuestionNumber: 0,
                    answers: [],
                }),

            getProgress: () => {
                const state = get();
                return state.questions.length > 0
                    ? Math.round(((state.currentQuestionNumber + 1) / state.questions.length) * 100)
                    : 0;
            },

            getAnsweredCount: () => {
                return get().answers.length;
            },
            setHasHydrated: state => set({ _hasHydrated: state }),
        }),
        {
            name: 'test-storage',
            onRehydrateStorage: () => state => {
                state?.setHasHydrated(true);
            },
        },
    ),
);
