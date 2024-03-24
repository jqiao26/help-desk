import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "../features/comment/comments";
import { btnStyle } from "../styles/commonStyles";
import TicketComment from "./TicketComment";

function TicketCommentBox({ ticket }) {
  const { comments } = useSelector((state) => state.comments);
  const { id } = ticket;
  const [commentDraft, setCommentDraft] = useState("");
  const dispatch = useDispatch();

  function refetchComments() {
    dispatch(fetchComments(id));
  }

  async function handlePostComment() {
    await dispatch(createComment({ ticketId: id, comment: commentDraft }));
    refetchComments();
    setCommentDraft("");
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

      <Box mt={5} display="flex" flexDirection="column" gap={2}>
        {comments.length > 0 &&
          comments.map((comment, idx) => (
            <TicketComment key={idx} comment={comment} />
          ))}
      </Box>
    </Box>
  );
}

export default TicketCommentBox;
