import { Box, Typography, Breadcrumbs, Divider } from "@mui/material";

function TicketDescription({ ticket }) {
  const { name, summary } = ticket;

  return (
    <Box
      sx={{
        p: 7,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Breadcrumbs separator="/">
        <Typography>ticket</Typography>
        <Typography>{name}</Typography>
      </Breadcrumbs>
      <Typography variant="h3" mt={0.5}>
        {name}
      </Typography>
      <Divider />
      <Typography variant="h6" mt={0.5}>
        Description
      </Typography>
      <Typography mt={0.5}>{summary}</Typography>
    </Box>
  );
}

export default TicketDescription;
