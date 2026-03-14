import { Button, ModalBody, ModalFooter, ModalHeader } from '@heroui/react';
import { ICustomModalOptions } from '@/shared';
import { Body1 } from '@/components';

export const CustomModal: React.FC<ICustomModalOptions> = ({ ...options }) => {
    return (
        <>
            <ModalHeader>{options.header}</ModalHeader>
            <ModalBody>
                <Body1>{options.message}</Body1>
                {options.body}
            </ModalBody>
            <ModalFooter>
                {options.footer ? (
                    options.footer
                ) : (
                    <>
                        <Button onPress={options.onCancel}>Закрыть</Button>
                        <Button onPress={options.onApply} color='primary'>
                            Ок
                        </Button>
                    </>
                )}
            </ModalFooter>
        </>
    );
};
