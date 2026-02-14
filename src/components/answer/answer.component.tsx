'use client';

import { ChangeEvent, useState } from 'react';
import type { AnswerProps, Option } from './answer.types';
import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Textarea } from '@heroui/react';
import { DragDrop, IDraggableItem, DropZone } from '@/components';

const draggableItems: IDraggableItem[] = [
    { id: 'item-1', content: 'Элемент 1', data: { type: 'task' } },
    { id: 'item-2', content: 'Элемент 2', data: { type: 'task' } },
    { id: 'item-3', content: 'Элемент 3', data: { type: 'note' } },
    { id: 'item-4', content: 'Элемент 4', data: { type: 'task' } },
    { id: 'item-5', content: 'Элемент 5', data: { type: 'note' } },
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
}: AnswerProps) => {
    const [inputValue, setInputValue] = useState(value ?? '');
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const handleStringChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange?.(e.target.value);
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange?.(e.target.value);
    };

    const handleSingleChange = (option: Option) => {
        setSelectedOptions([option]);
        onChange?.(option.value);
    };

    const handleMultiplyChange = (option: Option) => {
        const isSelected = selectedOptions.some(o => o.id === option.id);
        const newSelected = isSelected
            ? selectedOptions.filter(o => o.id !== option.id)
            : [...selectedOptions, option];

        setSelectedOptions(newSelected);
        onChange?.(newSelected.map(o => o.value));
    };

    const fields = {
        SINGLE: (
            <RadioGroup id={id} label='Выберите один вариант ответа'>
                {options.map((o, i) => (
                    <Radio
                        key={`radio-${i}-${o.label}`}
                        value={o.value as string}
                        onChange={() => handleSingleChange(o)}>
                        {o.label}
                    </Radio>
                ))}
            </RadioGroup>
        ),

        MULTIPLY: (
            <CheckboxGroup id={id} label='Выберите один или несколько вариантов ответа'>
                {options.map((o, i) => (
                    <Checkbox
                        key={`checkbox-${i}-${o.label}`}
                        value={o.value as string}
                        onChange={() => handleMultiplyChange(o)}>
                        {o.label}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        ),

        STRING: (
            <Input
                id={id}
                label={label}
                placeholder={placeholder}
                value={inputValue as string}
                onChange={handleStringChange}
                required={required}
            />
        ),

        TEXT: (
            <Textarea
                value={inputValue as string}
                onChange={handleTextChange}
                placeholder={placeholder}
                maxRows={5}
                required={required}
                id={id}
            />
        ),

        MAP: null,
        DRAG: <DragDrop draggableItems={draggableItems} dropZones={dropZones} />,
    };

    return fields[type];
};
