import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import { Spinner } from "../loader";
import { StoreProvider } from "../store";
interface AppContainerProps {
    children: React.ReactNode;
}

const AppContainer: FunctionComponent<AppContainerProps> = ({ children }) => {
    const { loading } = useReactiveVar(appContextVar);
    return (<StoreProvider>
        {!loading ? children : <Spinner label={'Loading...'} />}
    </StoreProvider>);

}

export default AppContainer;