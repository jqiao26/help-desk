import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createTicket } from "../features/ticket/tickets";
import { btnStyle } from "../styles/commonStyles";

function TicketPage() {
  const dispatch = useDispatch();

  function handleTicketSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const { ticketName, email, summary } = formObject;
    dispatch(
      createTicket({ name: ticketName, email: email, summary: summary })
    );

    e.target.reset();
  }

  return (
    <form onSubmit={handleTicketSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Submit a Support Ticket</Typography>
        <Box display="flex" flexDirection="column">
          <FormLabel>Ticket Name</FormLabel>
          <TextField
            type="text"
            size="small"
            name="ticketName"
            variant="outlined"
            sx={{ maxWidth: "350px" }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <FormLabel>Email</FormLabel>
          <TextField
            type="text"
            size="small"
            name="email"
            variant="outlined"
            sx={{ maxWidth: "350px" }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <FormLabel>Summary</FormLabel>
          <TextField
            type="text"
            size="small"
            name="summary"
            variant="outlined"
            minRows={3}
            multiline
          />
        </Box>
        <Button type="submit" sx={btnStyle}>
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default TicketPage;
