import { createContext, useState } from "react";

export const DataContext = createContext('default');

const DataProvider = ({ children }) => {

    const [UID, setUID] = useState('');

    return (
        <DataContext.Provider
            value={[
                UID,
                setUID
            ]}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;