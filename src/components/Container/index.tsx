import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

function Container({ children }: ContainerProps) {
    return (
        <>
            {children}
        </>
    );
}

export default Container;
