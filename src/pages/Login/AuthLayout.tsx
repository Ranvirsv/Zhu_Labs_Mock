import { Card } from "react-bootstrap";
import { Outlet } from "react-router";
import "./AuthLayout.scss";
export default function AuthLayout() {
  return (
    <div className="authLayout">
      <Card className="formCard">
        {/* Auth related forms are then rendered in the place of Outlet */}
        <Outlet />
      </Card>
    </div>
  );
}
