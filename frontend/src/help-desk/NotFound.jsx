import { Box, Button, Typography } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { useNavigate } from "react-router-dom";
import { btnStyle } from "../styles/commonStyles";

function NotFound() {
  const navigate = useNavigate();

  function navigateHelpDeskPage() {
    navigate("/");
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        mt: "10%",
      }}
    >
      <Typography fontFamily="Roboto" variant="h5">
        404 Page not found
      </Typography>
      <SearchOffOutlinedIcon sx={{ width: "30px", height: "30px" }} />
      <Button sx={btnStyle} onClick={navigateHelpDeskPage}>
        Go Home
      </Button>
    </Box>
  );
}

export default NotFound;
