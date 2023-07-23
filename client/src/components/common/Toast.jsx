import React from "react";
import Toast from "react-bootstrap/Toast";

function PopUpToast({ open, setOpen, title, message }) {
  setTimeout(() => {
    setOpen(false);
  }, 8000);

  return (
    <>
      <Toast
        show={open}
        onClose={() => setOpen(false)}
        className="toast-container"
      >
        <Toast.Header>
          <strong className="flex gap-0">
            {title} <i className="fa-solid fa-circle-check"></i>{" "}
          </strong>
          <button onClick={() => setOpen(false)} className="close-btn">
            <i className="m-0 fa-solid fa-xmark"></i>
          </button>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  );
}

export default PopUpToast;
