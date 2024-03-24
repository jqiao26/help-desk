import { Box, Divider, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function TicketComment({ comment: commentObj }) {
  const { timestamp, user, comment } = commentObj;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Divider sx={{ mb: 1 }} />
      <Box display="flex" gap={0.5} alignItems="center">
        <AccountCircleOutlinedIcon sx={{ mb: 0.5 }} />
        <Typography>{user}</Typography>
        <Typography ml={1} color="gray">
          {new Date(timestamp).toDateString()}
        </Typography>
      </Box>
      <Typography>{comment}</Typography>
    </Box>
  );
}

export default TicketComment;
