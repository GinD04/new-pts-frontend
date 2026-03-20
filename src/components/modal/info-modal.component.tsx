import { IInfoModalOptions } from '@/shared';
import { Button, ModalBody, ModalFooter, ModalHeader } from '@heroui/react';
import { FC } from 'react';
import { Body1 } from '@/components';

export const InfoModal: FC<IInfoModalOptions> = ({ ...options }) => {
    return (
        <>
            <ModalHeader>{options.header}</ModalHeader>
            <ModalBody>
                <Body1>{options.message}</Body1>
            </ModalBody>
            <ModalFooter>
                <Button onPress={options.onApply} color='primary' fullWidth>
                    {options.textButtonApply ?? 'Ок'}
                </Button>
            </ModalFooter>
        </>
    );
};
