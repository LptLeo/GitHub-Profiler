import './App.scss'
import '@bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

import Search from './Components/Search'
import Profile from './Components/Profile'

function App() {
  const [profile, setProfile] = useState("")

  const { loading, data, error } = useQuery(gql`
    query Repos {
      user(login: "${profile}") {
        login
        name
        id
        avatarUrl
        location
        following {
          totalCount
        }
        followers {
          totalCount
        }
        repositories(first: 100) {
          totalCount
          nodes {
            name
            url
            id
            createdAt
            owner {
              login
            }
            languages(first: 100) {
              edges {
                size
                node {
                  id
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `)

  if (loading) (
    <div className="insert-message">
      <span className="text-warning fs-1">Carregando...</span>
    </div>
  )

  if (error) {
    <div>Erro! {error.message}</div>
  }

  return (
    <div className="body">
      <div className="container">
        <Search name={setProfile} />
        <div className="container-load">
          {profile === "" ? (
            <div className="insert-message">
              <span className="text-warning fs-1">Insira um usuário acima</span>
            </div>
          ) : (
            <Profile userData={data && data.user} />
          )}
          <div className="row">
            {data && data.user.repositories.nodes.map(repo => (
              <div key={repo.id} className="repositorie">
                <div className="repositorie-container">
                  <a href={repo.url} target="_blank"><h5>{repo.name}</h5></a>
                  <div className="h-100 pb-5">
                    <div>
                      <span>{repo.languages.edges.length !== 0 ? <b>Linguagens: </b> : <b>Nenhuma linguagem</b>}</span>
                      {repo.languages.edges.map((lang, index) => (
                        <span key={lang.node.id}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={lang.node.color} className="bi bi-square-fill mb-1" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" />
                          </svg>
                          <> </>
                          {lang.node.name}{index < repo.languages.edges.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span><b>Data: </b> {repo.createdAt.substring(0, 10).replaceAll("-", " / ")} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App