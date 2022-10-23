import { useReactiveVar } from "@apollo/client";
import { FunctionComponent, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useOnCallCreated, useUpdateUserStatus } from "../../hooks";
import { authService, storeService } from "../../services";
import { appContextVar } from "../../services/store";
import {
  AiOutlineLogout,
  FcHome,
  CgProfile,
  AiOutlineCloudUpload,
  Toolbar,
  FiInbox,
} from "../shared";
import { Dialog } from "../shared/dialog/Dialog";
import classes from "./Shell.module.css";
import { useState } from "react";
import { VideoCall } from "../shared/videoCall";
const title = "Are you sure you want to logout?"
interface ShellProps { }
const Shell: FunctionComponent<ShellProps> = () => {
  const [isActiveCall, setIsActiveCall] = useState<boolean>(false)
  const { data: createCallData } = useOnCallCreated(({ subscriptionData }) => {
    if (subscriptionData?.data) {
      setIsActiveCall(true)
    }
  });
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
      await storeService?.client?.clearStore()
      await authService.logout(async () => {
        appContextVar({
          user: {},
          isAuthenticate: false,
          loading: false
        });
        navigate("/login");
      });
    }
  };
  const navigateHome = () => handleNavigate("/home");
  const navigateMyWall = () => handleNavigate("/myWall");
  const navigatePost = () => handleNavigate("/post");
  const navigateInbox = () => handleNavigate("/inbox");
  const closeDialog = () => setDialogOpen(false);
  return (
    <div className={classes.container}>
      <Dialog
        onDialogSuccess={handleDialogLogout}
        open={open}
        onDialogCancel={closeDialog}
        title={title}
      />
      <div className={classes.outlet_container}>
        {isActiveCall && createCallData?.onCallStart?.caller &&
          <VideoCall
            callTo={createCallData?.onCallStart?.caller}
            callerSdp={createCallData?.onCallStart?.sdp}
            onCloseHandler={() => { setIsActiveCall(prev => !prev) }}
          />}
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
