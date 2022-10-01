import { FunctionComponent } from "react";
import {
  MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "../mui";
import Button from "../button/Button";
interface DialogProps {
  onDialogCancel: () => void;
  onDialogSuccess: () => void;
  open: boolean;
  title: string;
  content?: string;
}

export const Dialog: FunctionComponent<DialogProps> = ({
  onDialogCancel,
  onDialogSuccess,
  open,
  title,
  content,
}) => {
  const handleCancelDialog = () => {
    onDialogCancel();
  };

  const handleSuccessDialog = () => {
    onDialogSuccess();
  };
  return (
    <div>
      <MuiDialog
        open={open}
        onClose={handleCancelDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {content && (
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button handleClick={handleCancelDialog}>No</Button>
          <Button handleClick={handleSuccessDialog}>Yes</Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
};
