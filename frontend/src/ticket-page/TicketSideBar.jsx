import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateTicketStatusById } from "../features/ticket/tickets";

function TicketSideBar({ ticket }) {
  const { email, status } = ticket;
  const dispatch = useDispatch();

  function handleStatusChange(e) {
    dispatch(updateTicketStatusById({ ...ticket, status: e.target.value }));
  }

  return (
    <Box
      sx={{
        p: 7,
        mt: 14.5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Divider />
      <Grid container spacing={3} display="flex" alignItems="center">
        <Grid item md={6}>
          <Typography fontWeight={900}>Status</Typography>
        </Grid>
        <Grid item md={6}>
          <Select
            size="small"
            defaultValue={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography fontWeight={900}>Reporter</Typography>
        </Grid>
        <Grid item md={6}>
          {email}
        </Grid>
      </Grid>
    </Box>
  );
}

export default TicketSideBar;
