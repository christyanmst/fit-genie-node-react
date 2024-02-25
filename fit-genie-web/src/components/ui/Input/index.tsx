import styles from './styles.module.scss';

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export function Input({ ...props }: InputProps) {
    return (
        <input type="text" className={styles.input} {...props} />
    )
}

export function TextArea({ ...props }: TextAreaProps) {
    return (
        <textarea className={styles.input} {...props} />
    )
}

