import React, { useEffect, useState } from "react";
import { Table, Button, Form, Dropdown } from "react-bootstrap";
import axios from "axios";

interface User {
  email: string;
  name: string;
  institution: string;
  approved_user: number;
  admin_rights: number;
  approved_at: string | null;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://js2test.ear180013.projects.jetstream-cloud.org/fetch_users.php",
        {
          method: "post",
          mode: "cors",
          body: JSON.stringify({
            Operation: "Fetch",
          }),
        }
      );
      const result = await response.json();
      const { data, status } = result;
      if (status === "success") {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        setError("Failed to fetch users");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const updateUser = async (email: string, key: keyof User, value: number) => {
    const confirmUpdate = window.confirm(
      `Are you sure you want to update ${key} for ${email}?`
    );
    if (!confirmUpdate) return;

    try {
      await fetch(
        "https://js2test.ear180013.projects.jetstream-cloud.org/fetch_users.php",
        {
          method: "post",
          mode: "cors",
          body: JSON.stringify({
            Operation: "Update",
            Email: email,
            Key: key,
            Value: value,
          }),
        }
      );
      fetchUsers(); // Refresh the user list
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const deleteUser = async (email: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${email}?`
    );
    if (!confirmDelete) return;

    try {
      await fetch(
        "https://js2test.ear180013.projects.jetstream-cloud.org/fetch_users.php",
        {
          method: "post",
          mode: "cors",
          body: JSON.stringify({
            Operation: "Delete",
            Email: email,
          }),
        }
      );
      fetchUsers(); // Refresh the user list
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const filterUsers = (filterType: string) => {
    switch (filterType) {
      case "admin":
        setFilteredUsers(users.filter((user) => user.admin_rights === 1));
        break;
      case "approved":
        setFilteredUsers(users.filter((user) => user.approved_user === 1));
        break;
      case "new":
        setFilteredUsers(users.filter((user) => user.approved_at === null));
        break;
      case "removed":
        setFilteredUsers(
          users.filter(
            (user) => user.approved_user === 0 && user.approved_at !== null
          )
        );
        break;
      default:
        setFilteredUsers(users);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Admin Page</h1>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Filter Users
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => filterUsers("admin")}>
            Admin Users
          </Dropdown.Item>
          <Dropdown.Item onClick={() => filterUsers("approved")}>
            Approved Users
          </Dropdown.Item>
          <Dropdown.Item onClick={() => filterUsers("new")}>
            New Users
          </Dropdown.Item>
          <Dropdown.Item onClick={() => filterUsers("removed")}>
            Removed Users
          </Dropdown.Item>
          <Dropdown.Item onClick={() => filterUsers("all")}>
            All Users
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Institution</th>
            <th>Approved User</th>
            <th>Admin Rights</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.institution}</td>
              <td>{user.approved_user}</td>
              <td>{user.admin_rights}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`approved_user-${user.email}`}
                  checked={user.approved_user === 1}
                  onChange={() =>
                    updateUser(
                      user.email,
                      "approved_user",
                      user.approved_user === 1 ? 0 : 1
                    )
                  }
                  label="Approve"
                />
                <Form.Check
                  type="switch"
                  id={`admin_rights-${user.email}`}
                  checked={user.admin_rights === 1}
                  onChange={() =>
                    updateUser(
                      user.email,
                      "admin_rights",
                      user.admin_rights === 1 ? 0 : 1
                    )
                  }
                  label="Admin"
                />
                <Button variant="danger" onClick={() => deleteUser(user.email)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
