import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { authService } from "../../services";
import { appContextVar } from "../../services/store";
import { AiOutlineLogout, Button, FcHome } from "../shared";
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

    return (<>
        <div className={classes.header_container}>
            <Button className={classes.button} handleClick={handleNavigate}> <FcHome /></Button>
            <Button className={classes.button} handleClick={handleLogout}><AiOutlineLogout /> </Button>
        </div>
        <div className={classes.container}>
            <Outlet />
        </div>
    </>);
}

export default Shell;