import React from 'react';
import { AddButtonProps } from '@/lib/types/db';

const AddButton = ({ url }: AddButtonProps) => {
    return (
        <a href={url} className="text-decoration-none d-flex align-items-center justify-content-center">
            <div className="text-black border border-5 border-black p-5 flex justify-center items-center rounded-lg">
                <b className="text-9xl">+</b>
            </div>
        </a>
    );
};

export default AddButton;
