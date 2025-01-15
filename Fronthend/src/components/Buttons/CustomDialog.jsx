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
}) => {
  return (
    <DialogRoot role="alertdialog" placement="center" closeOnInteractOutside={true}>
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
          <p>{dialogBody}</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">{cancelButtonText}</Button>
          </DialogActionTrigger>
          <Button colorPalette={confirmButtonColor} onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};


export default CustomDialog;

