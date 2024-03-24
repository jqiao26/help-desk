import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TicketComment from "../components/TicketComment";
import TicketDescription from "../components/TicketDescription";
import { fetchTicketById } from "../features/ticket/tickets";
import TicketSideBar from "./TicketSideBar";

function TicketDetailPage() {
  const { ticketDetail, ticketDetailLoading } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  function fetchTicketDetails() {
    dispatch(fetchTicketById(ticketId));
  }

  useEffect(() => {
    fetchTicketDetails();
  }, []);

  return ticketDetailLoading || !ticketDetail ? (
    <Typography>Loading...</Typography>
  ) : (
    <Grid container spacing={5} width="90%">
      <Grid item sm={12} lg={7} md={7}>
        <TicketDescription ticket={ticketDetail} />
        <TicketComment ticket={ticketDetail} />
      </Grid>
      <Grid item sm={12} lg={5} md={5}>
        <TicketSideBar ticket={ticketDetail} />
      </Grid>
    </Grid>
  );
}

export default TicketDetailPage;
