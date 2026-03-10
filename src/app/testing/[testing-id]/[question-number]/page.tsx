'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTestStore } from '@/store';
import { Button, CircularProgress, Divider, Pagination } from '@heroui/react';
import { Answer, H5, Option, AnswerValueType, Timer } from '@/components';
import { useTestAnswer } from '@/hooks';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnswerInput, useSaveAnswer } from '@/gql';
import { useAuthStore } from '@/store/auth';

export default function QuestionPage() {
    const { 'question-number': questionNumber } = useParams<{ 'question-number': string }>();
    const { 'testing-id': testingId } = useParams<{ 'testing-id': string }>();
    const { totalQuestions, questions, _hasHydrated, duration, answers, clearTest } = useTestStore();
    const { user } = useAuthStore();

    const [saveAllAnswers] = useSaveAnswer();

    const router = useRouter();

    const currentQuestion = questions[+questionNumber - 1];

    const isLastQuestion = +questionNumber === totalQuestions;

    const { value, saveAnswer } = useTestAnswer({
        questionId: currentQuestion?.id ?? 0,
        answerType: currentQuestion?.answerType ?? 'SINGLE',
    });

    const [localValue, setLocalValue] = useState<AnswerValueType>(value);

    if (!_hasHydrated) return <CircularProgress />;

    if (!currentQuestion) {
        throw new Error('К сожалению, вопрос не найден');
    }

    const options: Option[] =
        currentQuestion.answers?.map((a, i) => ({
            id: i,
            label: a,
            value: a,
        })) || [];

    const handleChangeQuestion = (q: number) => {
        saveAnswer(localValue);
        router.push(`/testing/${testingId}/${q}`);
    };

    const handleChangeValue = (v: AnswerValueType) => {
        setLocalValue(v);
    };

    const handleBack = () => {
        router.push(`/testing/${testingId}`);
    };

    const handleFinishTest = () => {
        saveAnswer(localValue);
        saveAllAnswers({
            variables: {
                answers: answers.map(a => ({
                    ...a,
                    questionId: Number(a.questionId),
                })) as AnswerInput[],
                studentId: user?.id ?? 0,
                testingId: Number(testingId),
            },
        });
        clearTest();
        router.push('/testing');
    };

    return (
        <>
            <header className='w-full max-w-xl flex justify-between items-center'>
                <Button
                    onPress={handleBack}
                    startContent={<ArrowLeftIcon className='size-4' />}
                    color='default'
                    variant='light'>
                    Назад
                </Button>
                <Timer initialSeconds={duration} autoStart />
            </header>
            <H5>{currentQuestion.text}</H5>
            <Divider />
            <Answer
                key={questionNumber}
                id={questionNumber}
                type={currentQuestion.answerType}
                options={options}
                value={localValue}
                onChange={handleChangeValue}
                zones={currentQuestion.zones}
                className='min-h-40 max-w-3xl max-h-9/12 w-full flex align-middle'
            />
            <div className='flex flex-row gap-4'>
                <Pagination
                    showControls
                    initialPage={+questionNumber}
                    total={totalQuestions}
                    className='max-w-full'
                    onChange={handleChangeQuestion}
                />
                {isLastQuestion && (
                    <Button
                        endContent={<ArrowRightIcon className='size-4' />}
                        color='secondary'
                        onPress={handleFinishTest}
                        className='w-min animate-in fade-in duration-300'>
                        Завершить
                    </Button>
                )}
            </div>
        </>
    );
}
