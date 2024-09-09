import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { deleteCookie } from "../utils/cookieHandler";

function LogoutModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Do you want to log out?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="deep-purple"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={deleteCookie("token")}
          >
            <span>Logout</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default LogoutModal;
