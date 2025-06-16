import { default as React } from '../../../node_modules/react';
export interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
