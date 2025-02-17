import { Card } from "react-bootstrap";
import { Outlet } from "react-router";
import "./AuthLayout.scss";
export default function AuthLayout() {
  return (
    <div className="authLayout">
      <Card className="formCard">
        {/* Forms and pages go here? */}

        <Outlet />
      </Card>
    </div>
  );
}
