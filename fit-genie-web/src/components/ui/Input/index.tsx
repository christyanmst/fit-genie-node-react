import styles from './styles.module.scss';

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ComponentType<IconBaseProps>;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export function Input({ icon: Icon, ...props }: InputProps) {
    return (
        <div className={styles.inputWrapper} >
            {Icon && <Icon size={20} className={styles.icon} />}
            <input type="text" className={styles.input} {...props} />
        </div>
    )
}

export function TextArea({ ...props }: TextAreaProps) {
    return (
        <textarea className={styles.input} {...props} />
    )
}

