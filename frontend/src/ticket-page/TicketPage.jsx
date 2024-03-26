import {
  Box,
  Button,
  FormLabel,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../features/ticket/tickets";
import { btnStyle } from "../styles/commonStyles";

function TicketPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  function handleTicketSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    const { ticketName, email, summary } = formObject;
    if (!(ticketName.length > 0 && email.length > 0 && summary.length > 0)) {
      setShowError(true);
    } else {
      dispatch(
        createTicket({ name: ticketName, email: email, summary: summary })
      );
      setShowSuccess(true);
      e.target.reset();
    }
  }

  return (
    <Box mx="10%" my="5%">
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
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setShowSuccess(false)}
      >
        <SnackbarContent
          message="✅  Ticket has been saved"
          sx={{ backgroundColor: "green", justifyContent: "center" }}
        />
      </Snackbar>
    </Box>
  );
}

export default TicketPage;
