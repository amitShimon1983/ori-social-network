import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { authService } from "../../services";
import { appContextVar } from "../../services/store";
import { Button } from "../shared";

interface ShellProps {

}
const Shell: FunctionComponent<ShellProps> = () => {
    const { isAuthenticate } = useReactiveVar(appContextVar);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/home")
    }
    const handleLogout = async () => {
        if (isAuthenticate) {
            await authService.logout(() => {
                appContextVar({
                    user: {},
                    isAuthenticate: false
                })
                navigate("/login")
            })
        }
    }
    const refreshToken = async () => {
        await authService.refresh()
    }
    return (<>
        <Button handleClick={handleNavigate}>Go &#127968;</Button>
        <Button handleClick={handleLogout}>logout</Button>
        <Button handleClick={refreshToken}>&#10227;</Button>
        <h1>Ori Social network</h1>
        <Outlet />
    </>);
}

export default Shell;