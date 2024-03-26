export const btnStyle = {
  mt: 1.5,
  maxWidth: "90px",
  color: "#ffffff",
  backgroundColor: "#000000",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "#808080",
  },
  ":disabled": {
    color: "#ffffff",
    opacity: 0.3,
    cursor: "not-allowed"
  },
}

export const statusMapping = {
  'resolved' : 'lightgreen',
  'in progress': 'yellow',
  'new': 'lightblue'
}

export const statusDisplayMapping = {
  resolved: 'Resolved',
  'in progress': 'In Progress',
  new: 'New'
}

export const helpDeskCard = {
  border: "1px solid black",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  cursor: 'pointer',
  width: '200px',
  borderRadius: "10px",
  gap: 2,
  ':hover': {
    boxShadow: '0px 1.5px 1.5px 0px rgba(0, 0, 0, 0.5)'
  }
}
