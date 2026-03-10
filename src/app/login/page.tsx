'use client';

import { H6, Password } from '@/components';
import { authService } from '@/services/api';
import { useAuthStore } from '@/store/auth';
import { Button, Card, CardBody, CardHeader, Divider, Form, Input, Tab, Tabs } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export default function LoginPage() {
    const { setUser, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/testing');
        }
    }, [router, user]);

    const handleSubmitRespondent = (e: FormEvent) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
        authService
            .loginRespondent(String(data.login))
            .then(data => {
                setUser(data);
                router.push('/testing');
            })
            .catch(error => console.log(error));
    };

    const handleSubmitPsychologist = (e: FormEvent) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
        authService.loginPsychologist(String(data.login), String(data.password));
    };

    return (
        <Card isBlurred>
            <CardHeader className='justify-center'>
                <H6>Вход в систему</H6>
            </CardHeader>
            <CardBody>
                <Tabs fullWidth aria-label='Tabs form' size='md'>
                    <Tab key='respondent' title='Респондент'>
                        <Form onSubmit={handleSubmitRespondent}>
                            <Input
                                placeholder='Логин'
                                color='primary'
                                variant='faded'
                                name='login'
                                isRequired
                                errorMessage='Пожалуйста, введите логин'
                            />
                            <Divider />
                            <Button type='submit' variant='solid' color='secondary' fullWidth>
                                Войти
                            </Button>
                        </Form>
                    </Tab>

                    <Tab key='psychologist' title='Психолог'>
                        <Form onSubmit={handleSubmitPsychologist}>
                            <Input name='login' placeholder='Логин' color='primary' variant='faded' />
                            <Password name='password' placeholder='Пароль' color='primary' variant='faded' />
                            <Divider />
                            <Button type='submit' variant='solid' color='secondary' fullWidth>
                                Войти
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    );
}
