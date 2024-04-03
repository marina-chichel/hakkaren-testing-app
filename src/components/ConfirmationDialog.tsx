import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Params = {
  isOpen: boolean;
  closeDialog: () => void;
  handleDelete: () => void;
  text?: string;
};

function DeleteConfirmationDialog({
  isOpen,
  closeDialog,
  handleDelete,
  text = "Are you sure?",
}: Params) {
  const deleteAndClose = () => {
    handleDelete();
    closeDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteAndClose} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
