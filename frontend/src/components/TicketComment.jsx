import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createComment } from "../features/comment/comments";
import { btnStyle } from "../styles/commonStyles";

function TicketComment({ ticket }) {
  const { id } = ticket;
  const [commentDraft, setCommentDraft] = useState("");
  const dispatch = useDispatch();

  function handlePostComment() {
    console.log(id, commentDraft);
    dispatch(createComment({ ticketId: id, comment: commentDraft }));
  }

  return (
    <Box
      sx={{
        p: 7,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography mb={2}>Leave a Comment</Typography>
      <TextField
        value={commentDraft}
        onChange={(e) => setCommentDraft(e.target.value)}
        minRows={3}
      />
      <Button size="small" sx={btnStyle} onClick={handlePostComment}>
        Post
      </Button>
    </Box>
  );
}

export default TicketComment;
