import { IAnswer, IAnswerData, IQuestion, IZoneInfo } from '@/shared';

export type TestState = {
    currentQuestionNumber: number;
    answers: IAnswer[];
    questions: IQuestion[];
    totalQuestions: number;
    duration?: number;
    globalAnswers: string[] | null;
    globalZones: IZoneInfo[] | null;
    remainingSeconds: number | null;

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
    setRemainingSeconds: (s: number) => void;

    getProgress: () => number;
    getAnsweredCount: () => number;
};
