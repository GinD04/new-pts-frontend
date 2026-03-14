import { IFormModalOptions } from '@/shared';
import { Button, Form, Input, ModalBody, ModalFooter, ModalHeader } from '@heroui/react';
import { FC } from 'react';
import { Body1 } from '../text';

export const FormModal: FC<IFormModalOptions> = ({ ...options }) => {
    return (
        <>
            <ModalHeader>{options.header}</ModalHeader>
            <Form className='w-full items-stretch' {...options.formOptions}>
                <ModalBody>
                    <Body1>{options.message}</Body1>

                    {options.fields.map(f => (
                        <Input key={`${f.name}-${f.label}`} {...f} />
                    ))}
                </ModalBody>
                <ModalFooter>
                    {options.reset && <Button type='reset'>{options.textButtonReset ?? 'Сбросить'}</Button>}
                    <Button type='submit' color='secondary'>
                        {options.textButtonSubmit ?? 'Отправить'}
                    </Button>
                </ModalFooter>
            </Form>
        </>
    );
};
