import { Button } from "../ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";



const CustomDialog =  ({
  triggerButton = null, // Pass the entire button element
  dialogTitle = "Are you sure?",
  dialogBody = "This action cannot be undone.",
  confirmButtonText = "Confirm",
  confirmButtonColor = "red",
  cancelButtonText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  return (
    <DialogRoot 
      role="alertdialog"
      placement="center" 
      closeOnInteractOutside={false}
    >
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {dialogBody}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onCancel}>{cancelButtonText}</Button>
          </DialogActionTrigger>
          <Button colorPalette={confirmButtonColor} onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};


export default CustomDialog;

