import React, {useState, useEffect} from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
      atualizarLista();
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if(response.status === 204){
      //atualizarLista();
      const novaLista = [...repositories]
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      novaLista.splice(repositoryIndex,1);
      setRepositories(novaLista);

    }
  }

  function atualizarLista(){
    api
      .get('/repositories')
      .then(response=>{
        setRepositories(response.data);
      });
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <>
              <li key={repository.id} >{repository.title}</li>
              <button key={Date.now()} onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </>
          
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
