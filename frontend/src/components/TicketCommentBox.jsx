import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "../features/comment/comments";
import { btnStyle } from "../styles/commonStyles";
import TicketComment from "./TicketComment";

function TicketCommentBox({ ticket }) {
  const { comments } = useSelector((state) => state.comments);
  const { ticketDetail } = useSelector((state) => state.tickets);
  const { id } = ticket;
  const [commentDraft, setCommentDraft] = useState("");
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  function refetchComments() {
    dispatch(fetchComments(id));
  }

  async function handlePostComment() {
    if (!(commentDraft.length > 0)) {
      setShowError(true);
    } else {
      await dispatch(createComment({ ticketId: id, comment: commentDraft }));
      refetchComments();
      console.log(`Send email to ${ticketDetail.email}: New Comment`);
      setCommentDraft("");
    }
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
      <Button
        size="small"
        sx={btnStyle}
        onClick={handlePostComment}
        disabled={commentDraft.length === 0}
      >
        Post
      </Button>

      <Box mt={5} display="flex" flexDirection="column" gap={2}>
        {comments.length > 0 &&
          comments.map((comment, idx) => (
            <TicketComment key={idx} comment={comment} />
          ))}
      </Box>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setShowError(false)}
      >
        <SnackbarContent
          message="⚠️  Please complete all fields"
          sx={{ backgroundColor: "grey", justifyContent: "center" }}
        />
      </Snackbar>
    </Box>
  );
}

export default TicketCommentBox;
