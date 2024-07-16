import './App.scss'
import '@bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

import Search from './Components/Search'
import Profile from './Components/Profile'
import Repositories from './Components/Repositories'

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
        url
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
          <Repositories userData={data && data.user} />
        </div>
      </div>
    </div>
  )
}

export default App