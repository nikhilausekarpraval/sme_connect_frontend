import React from 'react';
//import { Button } from '@mui/material';
import { Button } from 'react-bootstrap';
import './FilterButton.scss';

interface IFilterButtonProps {
    icon: React.ElementType | React.ReactNode; 
    onClick: () => void;
    title: string;
    className?: string; 
}

const FilterButton: React.FC<IFilterButtonProps> = ({
    icon: Icon, 
    onClick,
    title,
    className = '',
}) => {
    return (
        <Button
            //variant="contained"
            //startIcon={Icon && (typeof Icon === 'function' ? <Icon /> : Icon)} 
            onClick={onClick}
            title={title}
            className={`gradient-button ${className}`}
        >
            {Icon && (typeof Icon === 'function' ? <Icon size={20}/> : Icon)} 
        </Button>
    );
};

export default FilterButton;
