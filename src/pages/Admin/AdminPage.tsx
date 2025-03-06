import React, { useEffect, useState } from "react";
import { Table, Button, Form, Dropdown } from "react-bootstrap";

/**
 * ### User Interface
 * Represents the properties of a user instance.
 *
 * @property {string} email - The user's email address.
 * @property {string} name - The user's full name.
 * @property {string} institution - The institution the user is affiliated with.
 * @property {number} approved_user - Specifies whether the user is approved (1 for approved, 0 for not).
 * @property {number} admin_rights - Specifies whether the user has admin privileges (1 for admin, 0 for regular user).
 * @property {string | null} approved_at - The timestamp when the user was approved, or null if never approved.
 */
interface User {
  email: string;
  name: string;
  institution: string;
  approved_user: number;
  admin_rights: number;
  approved_at: string | null;
}

/**
 * ### AdminPage
 *
 * This component renders the administrator page, where an admin can:
 * - View all registered users.
 * - Toggle user approval and admin rights.
 * - Delete users from the system.
 *
 * ### State and Behavior
 * - `user`: List of users that we're rendering.
 * - `filteredUsers`: List of users that are being rendered due to a filtered query.
 * - `loading`: Boolean indicating whether or not the page is still loading and fetching users.
 * - `error`: A string representing an error message from the server if there is an error.
 *
 * ### API Integrations
 * - Fetch users from the backend.
 * - Update user permissions.
 * - Delete users from the system.
 */
const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users every time the component is rendered.
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Fetches a list of users from the backend. This updates the state with the fetched data or sets
   * an error if fetching fails.
   */
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
    } catch (err) {
      setError("Failed to fetch users");
    }

    setLoading(false);
  };

  /**
   * Updates a user's attribute (e.g. approval status or admin rights)
   * @param email Email of the user being updated.
   * @param key The field to update (e.g. 'approved_user' or 'admin_rights', which are both booleans).
   * @param value The new value (0 or 1).
   */
  const updateUser = async (email: string, key: keyof User, value: number) => {
    // Prompt confirmation of operation before doing anything
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
      fetchUsers(); // Refresh the user list; NOTE: This could be improved;
    } catch (err) {
      setError("Failed to update user");
    }
  };

  /**
   * Deletes a user from the system
   * @param email Email of the user that's being deleted.
   * @returns
   */
  const deleteUser = async (email: string) => {
    // Prompt confirmation to delete the user
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${email}?`
    );
    if (!confirmDelete) return;

    // Delete the user via our API. Then fetch a new list of users.
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
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  /**
   * Filters the user list based on a selected category.
   * @param filterType A keyword that filters the users being rendered.
   */
  const filterUsers = (filterType: string) => {
    switch (filterType) {
      case "admin":
        setFilteredUsers(users.filter((user) => user.admin_rights === 1));
        break;
      case "approved":
        setFilteredUsers(users.filter((user) => user.approved_user === 1));
        break;
      case "new":
        // If a user has never been approved, indicated by approved_at being null, then we consider them 'new'.
        setFilteredUsers(users.filter((user) => user.approved_at === null));
        break;
      case "removed":
        setFilteredUsers(
          users.filter(
            // For us, a removed user is one that's no longer approved, but has been approved previously.
            // So this indicates the idea of us removing their approval.
            (user) => user.approved_user === 0 && user.approved_at !== null
          )
        );
        break;
      default:
        // For any other keywords, we'll display all users.
        setFilteredUsers(users);
    }
  };

  /**
   * If still loading, then rendering our loading screen
   * Else, done loading, but we had an error so display the error screen.
   */
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Admin Page</h1>
      {/* A drop down allowing admins to see what kinds of filters they can apply.  */}
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

      {/* The main content. This is the table that contains all the user information that we will render. There's a header 
      that shows the column names, and then the table body that has the user's given information and also forms and buttons that 
      give the admin 3 privileges:
        1. The ability to approve a user; this is done by Chen Zhu himself.
        2. The ability to toggle whether or not a user is an admin.
        3. The ability to delete a user.
       */}
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
