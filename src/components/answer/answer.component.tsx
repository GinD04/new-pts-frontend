'use client';
import { ChangeEvent } from 'react';
import type { AnswerProps } from './answer.types';
import { Checkbox, CheckboxGroup, Input, NumberInput, Radio, RadioGroup, Textarea } from '@heroui/react';
import { DragDrop, IDraggableItem, DropZone } from '@/components';
import { AnswerValueType } from './answer.types';

const draggableItems: IDraggableItem[] = [
    { id: 'item-1', content: 'Элемент 1', data: { type: 'task' } },
    { id: 'item-2', content: 'Элемент 2', data: { type: 'task' } },
    { id: 'item-3', content: 'Элемент 3', data: { type: 'note' } },
    { id: 'item-4', content: 'Элемент 4', data: { type: 'task' } },
    { id: 'item-5', content: 'Элемент 5', data: { type: 'note' } },
    { id: 'item-6', content: 'Элемент 6', data: { type: 'task' } },
    { id: 'item-7', content: 'Элемент 7', data: { type: 'note' } },
    { id: 'item-8', content: 'Элемент 8', data: { type: 'task' } },
];

const dropZones: DropZone[] = [
    { id: 'zone-1', title: 'Зона 1' },
    { id: 'zone-2', title: 'Зона 2' },
    { id: 'zone-3', title: 'Зона 3' },
];

export const Answer = ({
    id,
    type,
    label,
    options = [],
    value,
    placeholder = 'Введите ответ...',
    required = false,
    onChange,
    className,
}: AnswerProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const handleNumberInputChange = (e: number | React.ChangeEvent<HTMLInputElement>) => {
        if (typeof e === 'number') {
            onChange?.(e);
            return;
        }
        onChange?.(Number(e.target.value));
    };

    const handleRadioChange = (selectedValue: string) => {
        const selected = options.find(o => o.value.toString() === selectedValue);
        if (selected) {
            onChange?.(selected.value);
        }
    };

    const handleCheckboxChange = (selectedValues: string[]) => {
        const selected = options.filter(o => selectedValues.includes(o.value.toString()));
        onChange?.(selected.map(o => o.value) as AnswerValueType);
    };

    const fields = {
        SINGLE: (
            <RadioGroup
                id={id}
                label='Выберите один вариант ответа'
                value={value?.toString() ?? ''}
                onValueChange={handleRadioChange}
                className='m-auto'>
                {options.map(o => (
                    <Radio key={`radio-${o.value}`} value={o.value.toString()}>
                        {o.label}
                    </Radio>
                ))}
            </RadioGroup>
        ),

        MULTIPLY: (
            <CheckboxGroup
                id={id}
                label='Выберите один или несколько вариантов ответа'
                value={Array.isArray(value) ? value.map(v => v.toString()) : []}
                onValueChange={handleCheckboxChange}
                className='m-auto'>
                {options.map(o => (
                    <Checkbox key={`checkbox-${o.value}`} value={o.value.toString()}>
                        {o.label}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        ),

        STRING: (
            <Input
                id={id}
                aria-label='Поле для ответа'
                label={label}
                placeholder={placeholder}
                value={typeof value === 'string' ? value : ''}
                onChange={handleInputChange}
                required={required}
                className='max-w-md w-full m-auto'
            />
        ),

        TEXT: (
            <Textarea
                id={id}
                aria-label='Поле для ответа'
                label={label}
                value={typeof value === 'string' ? value : ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                maxRows={5}
                required={required}
                className='max-w-md w-full m-auto'
            />
        ),

        NUMBER: (
            <NumberInput
                id={id}
                aria-label='Поле для ответа'
                label={label}
                placeholder={placeholder}
                value={typeof value === 'number' ? value : undefined}
                onChange={handleNumberInputChange}
                required={required}
                className='max-w-md w-full m-auto'
            />
        ),

        MAP: null,
        DRAG: <DragDrop draggableItems={draggableItems} dropZones={dropZones} />,
    };

    return <div className={className}>{fields[type]}</div>;
};
