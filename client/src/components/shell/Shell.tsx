import { useReactiveVar } from "@apollo/client";
import { FunctionComponent } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUpdateUserStatus } from "../../hooks";
import { authService } from "../../services";
import { appContextVar } from "../../services/store";
import {
  AiOutlineLogout,
  FcHome,
  CgProfile,
  AiOutlineCloudUpload,
  Toolbar,
  FiInbox,
} from "../shared";
import {Dialog} from "../shared/dialog/Dialog";
import classes from "./Shell.module.css";
import { useState } from "react";
interface ShellProps {}
const Shell: FunctionComponent<ShellProps> = () => {
  const { isAuthenticate } = useReactiveVar(appContextVar);
  const [open, setDialogOpen] = useState<boolean>(false);
  useUpdateUserStatus();
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    setDialogOpen(true);
  };

  const handleDialogLogout = async () => {
    if (isAuthenticate) {
      await authService.logout(() => {
        appContextVar({
          user: {},
          isAuthenticate: false,
        });
        navigate("/login");
      });
    }
  };
  const navigateHome = () => handleNavigate("/home");
  const navigateMyWall = () => handleNavigate("/myWall");
  const navigatePost = () => handleNavigate("/post");
  const navigateInbox = () => handleNavigate("/inbox");
  
  const closeDialog = () => setDialogOpen(false)
  const title = "Are you sure you want to logout?"

  return (
    <div className={classes.container}>
      <Dialog
        onDialogSuccess={handleDialogLogout}
        open={open}
        onDialogCancel={closeDialog}
        title = {title}
      />
      <div className={classes.outlet_container}>
        <Outlet />
      </div>
      <Toolbar
        actions={[
          {
            function: handleLogout,
            icon: <AiOutlineLogout />,
            id: "AiOutlineLogout-handleLogout",
          },
          {
            function: navigatePost,
            icon: <AiOutlineCloudUpload />,
            id: "AiOutlineCloudUpload-navigatePost",
          },
          {
            function: navigateHome,
            icon: <FcHome />,
            id: "FcHome-navigateHome",
          },
          {
            function: navigateInbox,
            icon: <FiInbox />,
            id: "FcHome-navigateInbox",
          },
          {
            function: navigateMyWall,
            icon: <CgProfile />,
            id: "CgProfile-navigateMyWall",
          },
        ]}
      />
    </div>
  );
};

export default Shell;
