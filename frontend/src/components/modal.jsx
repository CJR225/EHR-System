import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };
  

  return (
    <div>
      <Button onClick={handleOpen} id="sidebarItem">
        Join Course
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row mb-2">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Course Code
            </Typography>
          </div>
          <div className="row">
            <input id="coursecodeInput">
            </input>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please enter course code.
          </Typography>
          <button type="submit" className="submit-button mt-4">
            Submit
          </button>
        </Box>
      </Modal>
    </div>
  );
}
