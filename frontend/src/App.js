import { BrowserRouter as Router, Routes,  Route } from "react-router-dom"
import TicketDetailPage from "./ticket-page/TicketDetailPage";
import HelpDeskLanding from "./help-desk/HelpDeskLanding";
import TicketPage from './ticket-page/TicketPage'
import AdminPage from "./admin-page/AdminPage";
import NotFound from "./help-desk/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelpDeskLanding />} />
        <Route path="/admin-page/ticket/:ticketId" element={<TicketDetailPage />} />
        <Route path="/help-desk" element={<TicketPage />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
