import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { authService } from "../../services";
import { appContextVar } from "../../services/store";
import { AiOutlineLogout, Button, FcHome, FiRefreshCw } from "../shared";
import classes from './Shell.module.css';
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
        <div style={{ position: 'sticky', top: 0 }}>
            <Button handleClick={handleNavigate}>Go <FcHome /></Button>
            <Button handleClick={handleLogout}><AiOutlineLogout /> logout</Button>
            <Button handleClick={refreshToken}><FiRefreshCw /></Button>
        </div>
        <div className={classes.container}>
            <Outlet />
        </div>
    </>);
}

export default Shell;