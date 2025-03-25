import { createContext, ReactNode, useContext, useState } from "react";

interface PortalTransitionProps {
    children: ReactNode
}

interface PortalTransitionContextValue {
    currentPortal: string;
    setCurrentPortal: (Portal: string) => void
}

const PortalTransitionContext = createContext<PortalTransitionContextValue>({currentPortal: '', setCurrentPortal: () => {}});

export const PortalTransitionProvider = ({children}: PortalTransitionProps) => {
    const [currentPortal, setCurrentPortal] = useState('');
    return (
        <PortalTransitionContext.Provider value={{currentPortal, setCurrentPortal}}>
            {children}
        </PortalTransitionContext.Provider>
    )
}

export const usePortalTransition = () => {
    return useContext(PortalTransitionContext);
}