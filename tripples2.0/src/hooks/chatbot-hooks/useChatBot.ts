import { useState } from 'react'

export const useChatBot = () => {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  function handleOpen() {
    setOpen(true);
    setHasUnread(false);
    // Lock body scroll
    document.body.style.overflow = "hidden";
  }

  function handleClose() {
    setOpen(false);
    // Restore scroll
    document.body.style.overflow = "";
  }

  return {
    open, hasUnread,
    handleOpen, handleClose
  }
}