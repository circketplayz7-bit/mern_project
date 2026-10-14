
import { useState, useEffect } from "react";
import "./App.css";
import Users from "./Users";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [count, setCount] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("Lahore");
  const [marks, setMarks] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch students from API
  const fetchStudents = async () => {
    if (!API_URL) {
      console.error("VITE_API_URL is missing in .env");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/students`);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(
        Array.isArray(data) ? data : data.students || []
      );
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students when page loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student through API
  const addStudent = async () => {
    if (!name.trim() || !email.trim() || !age || marks === "") {
      alert("Please fill all fields");
      return;
    }

    if (
      Number(age) <= 0 ||
      !Number.isFinite(Number(age)) ||
      Number(marks) < 0 ||
      Number(marks) > 100
    ) {
      alert("Enter a valid age and marks between 0 and 100");
      return;
    }

    if (!API_URL) {
      alert("VITE_API_URL .env file mein set karo");
      return;
    }

    const newStudent = {
      name: name.trim(),
      email: email.trim(),
      age: Number(age),
      city,
      marks: Number(marks),
    };

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const result = await response.json();

      alert("Student added successfully!");

      setName("");
      setEmail("");
      setAge("");
      setCity("Lahore");
      setMarks("");

      // Refresh list from database
      await fetchStudents();

      console.log("Added student:", result);
    } catch (error) {
      console.error("Add student error:", error);
      alert("Student add nahi hua. Backend API check karo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav>
        <div className="logo">
          My<span>Website</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#students">Students</a>
          <a href="#users">Users</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="small-title">
            WELCOME TO MY WEBSITE
          </p>

          <h1>
            Build Your Future
            <span> With Us</span>
          </h1>

          <p>
            A simple React website with student management,
            counter and API fetching.
          </p>

          <a href="#students" className="hero-btn">
            Get Started
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <p className="section-title">ABOUT US</p>

        <h2>Learn & Grow Together</h2>

        <p className="section-text">
          We create simple and modern web applications
          using React and modern frontend technologies.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="section services">
        <p className="section-title">OUR SERVICES</p>

        <h2>What We Provide</h2>

        <div className="service-container">
          <div className="service-card">
            <div className="icon">⚛️</div>
            <h3>React Development</h3>
            <p>Modern and responsive websites using React.</p>
          </div>

          <div className="service-card">
            <div className="icon">🎨</div>
            <h3>Frontend Design</h3>
            <p>Clean and attractive user interfaces.</p>
          </div>

          <div className="service-card">
            <div className="icon">💻</div>
            <h3>Web Development</h3>
            <p>Fast and user-friendly web applications.</p>
          </div>
        </div>
      </section>

      {/* Counter */}
      <section className="counter-section">
        <p className="section-title">REACT COUNTER</p>

        <h2>Simple Counter</h2>

        <div className="counter-box">
          <h1>{count}</h1>

          <button onClick={() => setCount(count + 1)}>
            + Add
          </button>
        </div>
      </section>

      {/* Student Form */}
      <section id="students" className="student-section">
        <p className="section-title">STUDENT MANAGEMENT</p>

        <h2>Add New Student</h2>

        <div className="form-box">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter Age"
            min="1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter Marks"
            min="0"
            max="100"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Multan">Multan</option>
          </select>

          <button onClick={addStudent} disabled={saving}>
            {saving ? "Adding..." : "Add Student"}
          </button>
        </div>
      </section>

      {/* Student List */}
      <section className="student-list">
        <p className="section-title">STUDENTS</p>

        <h2>Student List</h2>

        <button onClick={fetchStudents} disabled={loading}>
          {loading ? "Loading..." : "Refresh Students"}
        </button>

        <div className="students-container">
          {loading && students.length === 0 ? (
            <p className="empty">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="empty">No students found.</p>
          ) : (
            students.map((student, index) => (
              <div
                className="student-card"
                key={student._id || student.id || index}
              >
                <div className="student-number">
                  {index + 1}
                </div>

                <h3>{student.name}</h3>

                <p>
                  <strong>Email:</strong> {student.email}
                </p>

                <p>
                  <strong>Age:</strong> {student.age}
                </p>

                <div
                  className={
                    Number(student.age) >= 18 ? "adult" : "minor"
                  }
                >
                  {Number(student.age) >= 18 ? "Adult" : "Minor"}
                </div>

                <p>
                  <strong>City:</strong> {student.city}
                </p>

                <p>
                  <strong>Marks:</strong> {student.marks}
                </p>

                <div
                  className={
                    Number(student.marks) >= 50 ? "pass" : "fail"
                  }
                >
                  {Number(student.marks) >= 50 ? "Pass" : "Fail"}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* API Users */}
      <section id="users">
        <Users />
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <p className="section-title">CONTACT</p>

        <h2>Let's Work Together</h2>

        <p>Have a question? Feel free to contact us.</p>

        <button
          onClick={() => {
            window.location.href = "mailto:info@example.com";
          }}
        >
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 MyWebsite. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
