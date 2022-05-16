import React from 'react';

interface ErrorProps {
  error: string;
}

const Error = ({error}: ErrorProps) => {
    return (
        <div className="h-full flex items-center justify-center">
            <h1 className="text-red-500 font-bold text-3xl">{error}</h1>
        </div>
    );
};

export { Error};