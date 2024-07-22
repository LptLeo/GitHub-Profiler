import "./styles.scss";

import { useState } from "react";

interface IRepositoriesProps {
  userData: {
    login: string;
    repositories: {
      totalCount: number;
      nodes: {
        name: string;
        url: string;
        id: string;
        createdAt: string;
        owner: {
          login: string;
        };
        languages: {
          edges: {
            node: {
              id: string;
              name: string;
              color: string;
            };
          }[];
        };
      }[];
    };
  };
}

const Repositories = ({ userData }: IRepositoriesProps) => {
  const [filterInput, setFilterInput] = useState("");

  const filteredRepos = userData
    ? userData.repositories.nodes.filter((repo) =>
        repo.name.toLowerCase().includes(filterInput.trim().toLowerCase())
      )
    : [];

  return (
    <>
      {userData && (
        <>
          <div className="filter">
            <input
              type="text"
              className="filter-input"
              placeholder="Filtrar"
              onChange={(e) => setFilterInput(e.target.value)}
            />
          </div>
          <div className="row">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <div key={repo.id} className="repositorie">
                  <div className="repositorie-container">
                    <a href={repo.url} target="_blank">
                      <h5>{repo.name}</h5>
                    </a>
                    <div className="h-100 pb-5">
                      <div>
                        <span className="lang-text">
                          {repo.languages.edges.length !== 0 ? (
                            <b>Linguagens: </b>
                          ) : (
                            <b>Nenhuma linguagem</b>
                          )}
                        </span>
                        {repo.languages.edges.map((lang, index) => (
                          <span key={lang.node.id}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill={lang.node.color}
                              className="bi bi-square-fill mb-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" />
                            </svg>
                            <> </>
                            <span className="lang-values">
                              {lang.node.name}
                              {index < repo.languages.edges.length - 1 && ", "}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="repositorie-date">
                        <b>Data: </b>{" "}
                        {repo.createdAt.substring(0, 10).replaceAll("-", " / ")}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="insert-message">
                <span className="text-warning fs-1">
                  Repositório não encontrado
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Repositories;
