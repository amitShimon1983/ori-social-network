import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { authService } from "../../services";
import { appContextVar } from "../../services/store";
import { AiOutlineLogout, Button, FcHome, CgProfile, AiOutlineCloudUpload } from "../shared";
import classes from './Shell.module.css';
interface ShellProps {

}
const Shell: FunctionComponent<ShellProps> = () => {
    const { isAuthenticate } = useReactiveVar(appContextVar);
    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        navigate(path)
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

    return (<div className={classes.container}>
        <div className={classes.outlet_container}>
            <Outlet />
        </div>
        <div className={classes.header_container}>
            <Button className={classes.button} handleClick={() => handleNavigate("/home")}> <FcHome /></Button>
            <Button className={classes.button} handleClick={() => handleNavigate("/myWall")}><CgProfile /> </Button>
            <Button className={classes.button} handleClick={() => handleNavigate("/post")}><AiOutlineCloudUpload /> </Button>
            <Button className={classes.button} handleClick={handleLogout}><AiOutlineLogout /> </Button>
        </div>
    </div>);
}

export default Shell;