import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Input, InputProps } from '@heroui/react';
import { useState } from 'react';

export const Password = ({ ...props }: Omit<InputProps, 'type'>) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            type={isVisible ? 'text' : 'password'}
            endContent={
                <button
                    aria-label='toggle password visibility'
                    className='focus:outline-solid outline-transparent'
                    type='button'
                    onClick={toggleVisibility}>
                    {isVisible ? <EyeSlashIcon className='size-4' /> : <EyeIcon className='size-4' />}
                </button>
            }
            {...props}
        />
    );
};
