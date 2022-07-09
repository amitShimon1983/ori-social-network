import { FunctionComponent } from "react";
import { ApolloProvider } from '@apollo/client'
import { storeService } from "../../../services";
interface StoreProviderProps {
    children: React.ReactNode
}

const StoreProvider: FunctionComponent<StoreProviderProps> = ({ children }) => {
    return (<ApolloProvider client={storeService.client!}>
        {children}
    </ApolloProvider>);
}

export default StoreProvider;