import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../features/ticket/tickets";
import { useNavigate } from "react-router-dom";
import { statusMapping } from "../styles/commonStyles";

const columns = (onTicketClick) => {
  return [
    {
      field: "name",
      headerName: "Ticket Name",
      flex: 1,
      width: 150,
      renderCell: (params) => (
        <Box
          onClick={() => onTicketClick(params.row.id)}
          display="flex"
          alignItems="center"
          height="100%"
        >
          <Typography
            fontSize={15}
            sx={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 110,
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              backgroundColor: statusMapping[params.value],
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              mb: 0.25,
            }}
          ></Box>
          {params.value}
        </Box>
      ),
    },
    {
      field: "summary",
      headerName: "Summary",
      sortable: false,
      width: 160,
      flex: 1,
    },
  ];
};

function AdminPage() {
  const { tickets, ticketsLoading } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onTicketClick(ticketId) {
    navigate(`ticket/${ticketId}`);
  }

  function fetchAdminTickets() {
    dispatch(fetchTickets());
  }

  useEffect(() => {
    fetchAdminTickets();
  }, []);

  return ticketsLoading ? (
    <Typography>Loading...</Typography>
  ) : (
    <Box sx={{ width: "100%", height: "87vh" }}>
      <DataGrid
        rows={tickets}
        columns={columns(onTicketClick)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default AdminPage;
