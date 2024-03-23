import HelpDesk from "./help-desk-app/HelpDesk";
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom"
import TicketDetailPage from "./ticket-page/TicketDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelpDesk />} />
        <Route path="/ticket/:ticketId" element={<TicketDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
