import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Rooms from "./pages/Rooms/Rooms";
import Informations from "./pages/Informations/Informations";
import Room from "./pages/Room/Room";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import CreateBox from "./pages/CreateDevice/CreateDevice";
import Devices from "./pages/Devices/Devices";
import Device from "./pages/Device/Device";
import Settings from "./pages/Settings/Settings";
import CreateBuilding from "./pages/CreateBuilding/CreateBuilding";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        {/* <Header /> */}
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/devices" element={<Devices />} />
          <Route exact path="/devices/create" element={<CreateBox />} />
          <Route exact path="/devices/:id" element={<Device />} />
          <Route exact path="/buildings/create" element={<CreateBuilding />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route
            exact
            path="/buildings/:id/rooms/create"
            element={<CreateRoom />}
          />
          <Route exact path="/rooms/:id" element={<Room />} />
          <Route exact path="/informations" element={<Informations />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
