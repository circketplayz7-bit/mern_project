import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <section className="student-list">

      <p className="section-title">
        API USERS
      </p>

      <h2>
        Users From API
      </h2>

      <div className="students-container">

        {users.map((user) => (
          <div className="student-card" key={user.id}>

            <div className="student-number">
              {user.id}
            </div>

            <h3>
              {user.name}
            </h3>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>City:</strong>{" "}
              {user.address.city}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Users;
