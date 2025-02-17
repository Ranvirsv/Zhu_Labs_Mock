import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="App">
      <Header />
      <NavBar />

      <div className="content">
        {/* Page routing content goes here */}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
