import { useEffect, useState } from "react";
import "./App.css";

interface User {
  _id: number;
  email: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  return (
    <>
      <h1>Test</h1>
    </>
  );
}

export default App;
