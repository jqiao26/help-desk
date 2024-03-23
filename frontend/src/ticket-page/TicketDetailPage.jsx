import { Breadcrumbs, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TicketDescription from "../components/TicketDescription";
import TicketSideBar from "./TicketSideBar";

function TicketDetailPage() {
  const { ticketDetail, ticketDetailLoading } = useSelector(
    (state) => state.tickets
  );

  return ticketDetailLoading || !ticketDetail ? (
    <Typography>Loading...</Typography>
  ) : (
    <Grid container spacing={5}>
      <Grid item sm={12} lg={7} md={7}>
        <TicketDescription ticket={ticketDetail} />
      </Grid>
      <Grid item sm={12} lg={5} md={5}>
        <TicketSideBar ticket={ticketDetail} />
      </Grid>
    </Grid>
  );
}

export default TicketDetailPage;
