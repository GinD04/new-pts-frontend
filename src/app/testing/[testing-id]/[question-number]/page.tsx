'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTestStore } from '@/store';
import { Button, CircularProgress, Divider, Pagination } from '@heroui/react';
import { Answer, H5, Option, AnswerValueType } from '@/components';
import { useTestAnswer } from '@/hooks';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function QuestionPage() {
    const { 'question-number': questionNumber } = useParams<{ 'question-number': string }>();
    const { totalQuestions, questions, _hasHydrated } = useTestStore();
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
        router.push(`${q}`);
    };

    const handleChangeValue = (v: AnswerValueType) => {
        setLocalValue(v);
    };

    return (
        <>
            <H5>{currentQuestion.text}</H5>
            <Divider />
            <Answer
                id={questionNumber}
                type={currentQuestion.answerType}
                options={options}
                value={localValue}
                onChange={handleChangeValue}
                className='min-h-40 max-w-2xl w-full flex align-middle'
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
                        className='w-min animate-in fade-in duration-300'>
                        Завершить
                    </Button>
                )}
            </div>
        </>
    );
}
