import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { authService } from "../../services";
import { appContextVar } from "../../services/store";
import { AiOutlineLogout, FcHome, CgProfile, AiOutlineCloudUpload, Toolbar } from "../shared";
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
    const navigateHome = () => handleNavigate("/home");
    const navigateMyWall = () => handleNavigate("/myWall");
    const navigatePost = () => handleNavigate("/post");

    return (<div className={classes.container}>
        <div className={classes.outlet_container}>
            <Outlet />
        </div>
        <Toolbar actions={[{ function: handleLogout, icon: <AiOutlineLogout />, id: 'AiOutlineLogout-handleLogout' },
        { function: navigatePost, icon: <AiOutlineCloudUpload />, id: 'AiOutlineCloudUpload-navigatePost' },
        { function: navigateHome, icon: <FcHome />, id: 'FcHome-navigateHome' },
        { function: navigateMyWall, icon: <CgProfile />, id: 'CgProfile-navigateMyWall' }]} />
    </div>);
}

export default Shell;