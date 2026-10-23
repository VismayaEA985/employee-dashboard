
import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Employee Dashboard</h2>
      <p>Employee details fetched from API</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function EmployeeForm() {
  return (
    <div className="container mt-4">
      <h2>Employee Form</h2>

      <form onSubmit={event => {
        event.preventDefault();
        alert('Form submitted! Data is not saved.');
      }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" type="text"
            placeholder="Enter name" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input className="form-control" type="text"
            placeholder="Enter designation" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input className="form-control" type="text"
            placeholder="Enter location" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input className="form-control" type="number"
            placeholder="Enter salary" min="0" required />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <p className="text-muted mt-3">
        This is a demo form. Data is not sent to a server.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Employee Portal
          </Link>

          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/employee-form">
              Employee Form
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </>
  );
}
