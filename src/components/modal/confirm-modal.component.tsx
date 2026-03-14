import { IConfirmOptions } from '@/shared';
import { Button, ModalBody, ModalFooter, ModalHeader } from '@heroui/react';
import { FC } from 'react';
import { Body1 } from '@/components';

export const ConfirmModal: FC<IConfirmOptions> = ({ ...options }) => {
    return (
        <>
            <ModalHeader>{options.header}</ModalHeader>
            <ModalBody>
                <Body1>{options.message}</Body1>
            </ModalBody>
            <ModalFooter>
                <Button onPress={options.onCancel}>Закрыть</Button>
                <Button onPress={options.onApply} color='success'>
                    Ок
                </Button>
            </ModalFooter>
        </>
    );
};
