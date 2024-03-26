import { Box, Typography } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import { helpDeskCard } from "../styles/commonStyles";
import { useNavigate } from "react-router-dom";

function HelpDeskLanding() {
  const navigate = useNavigate();

  function navigateHelpDeskPage(isAdmin) {
    const endUrl = isAdmin ? "admin-page" : "help-desk";
    navigate(`${endUrl}`);
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        mt: "10%",
      }}
    >
      <Typography fontFamily="Roboto" variant="h5">
        Welcome to the Help Desk
      </Typography>
      <Box display="flex" gap={5}>
        <Box sx={helpDeskCard} onClick={() => navigateHelpDeskPage(false)}>
          <Typography>Login as User</Typography>
          <PersonIcon sx={{ width: "35px", height: "35px" }} />
        </Box>
        <Box sx={helpDeskCard} onClick={() => navigateHelpDeskPage(true)}>
          <Typography>Login as Admin</Typography>
          <SupportAgentIcon sx={{ width: "35px", height: "35px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default HelpDeskLanding;
