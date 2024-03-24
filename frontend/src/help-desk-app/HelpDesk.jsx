import { Box, Tab, Tabs } from "@mui/material";
import TicketPage from "../ticket-page/TicketPage";
import AdminPage from "../admin-page/AdminPage";
import { useDispatch, useSelector } from "react-redux";
import { setCurTab } from "../features/ticket/tickets";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function HelpDesk() {
  const { curTab } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  const handleChange = (_, newValue) => {
    dispatch(setCurTab(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={curTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="Help Desk" value={0} />
          <Tab label="Admin Tab" value={1} />
        </Tabs>
        <CustomTabPanel value={curTab} index={0}>
          <TicketPage />
        </CustomTabPanel>
        <CustomTabPanel value={curTab} index={1}>
          <AdminPage />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default HelpDesk;
