import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import { StoreProvider } from "../store";

interface AppContainerProps {
    children: React.ReactNode;
}

const AppContainer: FunctionComponent<AppContainerProps> = ({ children }) => {
    const { loading } = useReactiveVar(appContextVar);
    return (<StoreProvider>
        {!loading ? children : <span>Loading...</span>}
    </StoreProvider>);
}

export default AppContainer;