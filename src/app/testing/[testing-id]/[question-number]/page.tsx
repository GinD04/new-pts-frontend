'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTestStore, useAuthStore, useTimerStore } from '@/store';
import { addToast, Button, CircularProgress, Divider, Pagination } from '@heroui/react';
import { Answer, H5, Option, AnswerValueType, Timer } from '@/components';
import { useTestAnswer } from '@/hooks';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnswerInput, useSaveAnswer } from '@/gql';
import { modalService } from '@/services';

export default function QuestionPage() {
    const { 'question-number': questionNumber } = useParams<{ 'question-number': string }>();
    const { 'testing-id': testingId } = useParams<{ 'testing-id': string }>();
    const {
        totalQuestions,
        questions,
        _hasHydrated,
        duration,
        answers,
        clearTest,
        globalAnswers,
        globalZones,
        remainingSeconds,
        setRemainingSeconds,
    } = useTestStore();
    const { user } = useAuthStore();

    const initialSeconds = remainingSeconds ?? duration;

    const { stopInterval, startInterval } = useTimerStore();

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

    const getZones = () => {
        if (currentQuestion.zones && currentQuestion.zones.length !== 0) return currentQuestion.zones;
        return globalZones ?? [];
    };

    const getAnswerValues = () => {
        if (currentQuestion.answers && currentQuestion.answers.length !== 0) return currentQuestion.answers;
        return globalAnswers ?? [];
    };

    const options: Option[] = getAnswerValues().map((a, i) => ({
        id: i,
        label: a,
        value: a,
    }));

    const handleChangeQuestion = (q: number) => {
        router.push(`/testing/${testingId}/${q}`);
    };

    const handleChangeValue = (v: AnswerValueType) => {
        setLocalValue(v);
        saveAnswer(v);
    };

    const handleBack = () => {
        clearTest();
        clearTest();
        stopInterval();
        router.push(`/testing/${testingId}`);
    };

    const sendAnswers = () => {
        saveAllAnswers({
            variables: {
                answers: [...answers].map(a => ({
                    answer: a.answer,
                    questionId: Number(a.questionId),
                })) as AnswerInput[],
                studentId: user?.id ?? 0,
                testingId: Number(testingId),
            },
        })
            .then(response => {
                if (response?.error) {
                    throw new Error(response.error.message);
                }

                clearTest();
                clearTest();
                stopInterval();
                addToast({
                    color: 'success',
                    title: 'Ответы сохранены',
                    description: 'Тестирование успешно завершено',
                });
                router.push('/testing');
            })
            .catch(() =>
                addToast({
                    title: 'Ошибка',
                    description: 'Не удалось сохранить ответы',
                    color: 'danger',
                }),
            );
    };

    const handleFinishTest = () => {
        modalService.openConfirm({
            header: 'Вы уверены, что хотите завершить тест?',
            message: 'Ваши ответы будут сохранены и тест завершится.',
            onApply: sendAnswers,
            textButtonApply: 'Завершить',
        });
    };

    const handleTimeUp = () => {
        modalService.openCustom({
            header: 'К сожалению, время вышло',
            footer: (
                <Button
                    color='secondary'
                    fullWidth
                    onPress={handleFinishTest}
                    className='w-min animate-in fade-in duration-300'>
                    Завершить тест и сохранить ответы
                </Button>
            ),
            isDismissable: false,
            isKeyboardDismissDisabled: true,
            hideCloseButton: true,
        });
    };

    const handlePause = () => {
        modalService.openInfo({
            header: 'Вы поставили тестирование на паузу',
            textButtonApply: 'Продолжить',
            onApply: () => startInterval(handleTimeUp),
            isDismissable: false,
            isKeyboardDismissDisabled: true,
            hideCloseButton: true,
        });
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
                {duration !== 0 && (
                    <Timer
                        initialSeconds={initialSeconds}
                        autoStart
                        onTimeUp={handleTimeUp}
                        onPauseTimer={handlePause}
                        onTick={setRemainingSeconds}
                    />
                )}
            </header>
            <H5 className='max-w-2xl'>{currentQuestion.text}</H5>
            <Divider />
            <Answer
                key={questionNumber}
                id={questionNumber}
                type={currentQuestion.answerType}
                options={options}
                value={localValue}
                onChange={handleChangeValue}
                zones={getZones()}
                className='min-h-40 max-w-2xl max-h-9/12 w-full flex align-middle'
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
