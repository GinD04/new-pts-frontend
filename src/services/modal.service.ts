import {
    IConfirmOptions,
    IObserver,
    ICustomModalOptions,
    MODAL_TYPE,
    IFormModalOptions,
    AnyModalOptions,
} from '@/shared';

export class ModalService implements IObserver {
    public functions: ((options: AnyModalOptions) => void)[] = [];

    public subscribe = (func: (options: AnyModalOptions) => void) => {
        this.functions.push(func);
    };

    public unsubscribe = (func: (options: AnyModalOptions) => void) => {
        this.functions.splice(this.functions.indexOf(func), 1);
    };

    private readonly notify = (options: AnyModalOptions) => {
        this.functions.forEach(func => func(options));
    };

    public openForm = (options: IFormModalOptions) => {
        this.notify({ ...options, type: MODAL_TYPE.FORM });
    };

    public openConfirm = (options: IConfirmOptions) => {
        this.notify({ ...options, type: MODAL_TYPE.CONFIRM });
    };

    public openCustom = (options: ICustomModalOptions) => {
        this.notify({ ...options, type: MODAL_TYPE.CUSTOM });
    };
}

export const modalService = new ModalService();
