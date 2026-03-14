import { modalService } from '@/services';
import { AnyModalOptions, IModalOptions, MODAL_TYPE, ModalType } from '@/shared';
import { ReactNode, useEffect, useState, useCallback } from 'react';
import { Modal as HerouiModal, ModalContent, useDisclosure } from '@heroui/react';
import { CustomModal } from './custom-modal.component';
import { ConfirmModal } from './confirm-modal.component';
import { FormModal } from './form-modal.component';

export const Modal = () => {
    const [modalOptions, setModalOptions] = useState<AnyModalOptions | null>(null);

    const handleOpen = useCallback((options: AnyModalOptions) => {
        setModalOptions(options);
    }, []);

    useEffect(() => {
        modalService.subscribe(handleOpen);
        return () => modalService.unsubscribe(handleOpen);
    }, [handleOpen]);

    const handleClose = useCallback(
        (herouiOnClose: () => void) => {
            modalOptions?.onCancel?.();
            setModalOptions(null);
            herouiOnClose();
        },
        [modalOptions],
    );

    const clearModal = useCallback(() => {
        modalOptions?.onCancel?.();
        setModalOptions(null);
    }, [modalOptions]);

    const handleApply = useCallback(
        (herouiOnClose: () => void, data?: unknown) => {
            modalOptions?.onApply?.(data);
            setModalOptions(null);
            herouiOnClose();
        },
        [modalOptions],
    );

    const modalBodyContent: Record<ModalType, (options: AnyModalOptions, onClose: () => void) => ReactNode> = {
        [MODAL_TYPE.CUSTOM]: (options, onClose) => {
            if (options.type !== MODAL_TYPE.CUSTOM) return null;
            return (
                <CustomModal
                    {...options}
                    onCancel={() => handleClose(onClose)}
                    onApply={data => handleApply(onClose, data)}
                />
            );
        },
        [MODAL_TYPE.CONFIRM]: (options, onClose) => {
            if (options.type !== MODAL_TYPE.CONFIRM) return null;
            return (
                <ConfirmModal
                    {...options}
                    onCancel={() => handleClose(onClose)}
                    onApply={data => handleApply(onClose, data)}
                />
            );
        },
        [MODAL_TYPE.FORM]: (options, onClose) => {
            if (options.type !== MODAL_TYPE.FORM) return null;
            return (
                <FormModal
                    {...options}
                    onCancel={() => handleClose(onClose)}
                    onApply={data => handleApply(onClose, data)}
                />
            );
        },
    };

    return (
        <HerouiModal
            isOpen={!!modalOptions}
            size={modalOptions?.size}
            onClose={clearModal}
            backdrop='opaque'
            radius='lg'>
            <ModalContent>
                {onClose => modalOptions && modalBodyContent[modalOptions.type]?.(modalOptions, onClose)}
            </ModalContent>
        </HerouiModal>
    );
};
