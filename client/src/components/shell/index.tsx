import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { authService } from "../../services";
import { Button } from "../shared";

interface ShellProps {
    setUser: React.Dispatch<React.SetStateAction<{
        [key: string]: any;
    } | undefined>>
}
const Shell: FunctionComponent<ShellProps> = ({ setUser }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/home")
    }
    const handleLogout = async () => {
        await authService.logout(() => {
            setUser(undefined)
            navigate("/login")
        })
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