import React, {FC, MouseEventHandler, ReactNode} from 'react';

export interface ISectionButtonProps {
    children?: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SectionButton: FC<ISectionButtonProps> = ({children, className, onClick}) => {
    return (
        <button
            className={className ? "primary-btn " + className : "primary-btn"}
            role={onClick ? "button" : "none"}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export {SectionButton}