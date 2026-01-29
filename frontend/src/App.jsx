import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const API = "http://127.0.0.1:8000/api/employees/";

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  const addEmployee = async () => {
    await axios.post(API, { name, email, role });
    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(API + id + "/");
    loadEmployees();
  };

  return (
    <div>
      <h2>Employee Manager</h2>

      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Role" onChange={e=>setRole(e.target.value)} />
      <button onClick={addEmployee}>Add</button>

      {employees.map(e => (
        <div key={e.id}>
          {e.name} - {e.role}
          <button onClick={()=>deleteEmployee(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
