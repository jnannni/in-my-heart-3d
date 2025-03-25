import { createContext, ReactNode, useContext, useState } from "react";

interface SceneTransitionProps {
    children: ReactNode
}

interface SceneTransitionContextValue {
    currentScene: string;
    setCurrentScene: (scene: string) => void
}

const SceneTransitionContext = createContext<SceneTransitionContextValue>({currentScene: 'mainScene', setCurrentScene: () => {}});

export const SceneTransitionProvider = ({children}: SceneTransitionProps) => {
    const [currentScene, setCurrentScene] = useState('mainScene');
    return (
        <SceneTransitionContext.Provider value={{currentScene, setCurrentScene}}>
            {children}
        </SceneTransitionContext.Provider>
    )
}

export const useSceneTransition = () => {
    return useContext(SceneTransitionContext);
}
