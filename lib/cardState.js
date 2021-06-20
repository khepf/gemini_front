import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CardStateProvider({ children }) {
    const [cardInventory, setCardInventory] = useState([]);
    const [testState, setTestState] = useState(false);

    function toggleTestState() {
        setTestState(!testState);
      }

    return (
        <LocalStateProvider
        value={{
            testState,
            setTestState
        }}>
            { children }
        </LocalStateProvider>
    )
}

function useCardState() {
    const all = useContext(LocalStateContext);
    return all;
}

export { CardStateProvider,  useCardState };