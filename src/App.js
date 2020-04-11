import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: `Novo repositorio ${Date.now()}`,
      url: "http://localhost:8080",
      techs: ["React JS", "React Native", "Node JS", "JavaScript"],
    });
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const leftRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(leftRepositories);
  }

  useEffect(() => {
    api.get("/repositories").then(({ data }) => setRepositories(data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
