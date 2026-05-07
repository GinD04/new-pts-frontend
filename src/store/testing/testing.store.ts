import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestState } from './testing.types';

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
            remainingSeconds: null,

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
                    answers: state.answers.map(ans =>
                        ans.questionId === questionId ? { ...ans, answer: newAnswers } : ans,
                    ),
                })),

            setGlobalAnswers: globalAnswers => set({ globalAnswers }),

            setGlobalZones: globalZones => set({ globalZones }),

            setRemainingSeconds: s => set({ remainingSeconds: s }),

            clearTest: () =>
                set({
                    totalQuestions: 0,
                    currentQuestionNumber: 0,
                    answers: [],
                    remainingSeconds: null,
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
