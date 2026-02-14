'use client';
import { Answer } from '@/components';
import { useTestStore } from './testing.store';
import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { GET_BY_ID_TESTING } from '@/shemas/gql/get-by-id.shema';

const Testing = () => {
    const { addAnswer, totalQuestions, currentQuestion, setCurrentQuestion, updateAnswer } = useTestStore();
    const { loading, error, data } = useQuery(GET_BY_ID_TESTING, {
        variables: { id: '1' },
    });

    useEffect(() => {
        console.log(data);
    }, []);

    const handleUpdateAnswers = (value: string[] | string) => {
        updateAnswer(currentQuestion, typeof value === 'string' ? [value] : value);
    };

    return (
        <main className='max-h-full max-w-full w-full h-full m-auto flex'>
            <div className='w-full flex flex-col items-center justify-center gap-8'>
                {/* <Text variant='h4'>Вы не верблюд?</Text>
                <RadioGroup label="Выберите один вариант ответа" onValueChange={handleUpdateAnswers}>
                    <Radio value="buenos-aires">Buenos Aires</Radio>
                    <Radio value="sydney">Sydney</Radio>
                    <Radio value="san-francisco">San Francisco</Radio>
                    <Radio value="london">London</Radio>
                    <Radio value="tokyo">Tokyo</Radio>
                </RadioGroup>
                <Pagination initialPage={1} total={5} size='sm' showControls /> */}

                {/* {data?.testing.map((t, index) => (
                    <H5 key={index}>
                        {t.title}
                    </H5>
                ))} */}

                {/* <H5>{data?.testingById.questions[5].question ?? 'undefined'}</H5>
                <Answer
                    type={data?.testingById.questions[5].answerType ?? 'SINGLE'}
                    options={data?.testingById.questions[5].answers.map((a, i) => ({
                        label: a,
                        value: a,
                        id: i,
                    }))}
                    placeholder={'Введите ответ'}
                    id={`${Date.now.toString}`}
                    label='Выберите один вариант ответа'
                /> */}
                <Answer type='DRAG' id={'1'} label='Выберите один вариант ответа' />
            </div>
        </main>
    );
};

export default Testing;
