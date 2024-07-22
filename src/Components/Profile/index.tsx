import "./styles.scss"

import { PieChart, Pie, Cell } from "recharts"

interface IProfileProps {
  userData: {
    login: string
    name: string
    id: string
    avatarUrl: string
    location: string | null
    followers: {
      totalCount: number
    }
    following: {
      totalCount: number
    }
    repositories: {
      totalCount: number
      nodes: {
        languages: {
          edges: {
            size: number
            node: {
              name: string
              color: string
            }
          }[]
        }
      }[]
    }
  }
  profile: string
}

interface LanguageObj {
  name: string
  value: number
  color: string
}

const Profile = ({ userData, profile }: IProfileProps) => {
  if (profile === "") {
    return (
      <div className="insert-message">
        <span className="text-warning fs-1">Insira um usuário acima</span>
      </div>
    )
  } else {
    if (!userData) return (
      <div className="insert-message">
        <span className="text-warning fs-1">Carregando...</span>
      </div>
    )

    const languageObjs: LanguageObj[] = []

    userData && userData.repositories.nodes.map(repo => {
      repo.languages.edges.map(lang => {
        const langName = lang.node.name
        const langColor = lang.node.color
        const langSize = lang.size

        const langExists = languageObjs.find(obj => obj.name === langName)

        if (langExists) {
          langExists.value += langSize
        } else {
          languageObjs.push({ name: langName, value: langSize, color: langColor })
        }
      })
    })

    const totalValue = languageObjs.reduce((total, lang) => total + lang.value, 0)

    const langPercent = languageObjs.map(lang => ((lang.value / totalValue) * 100).toFixed(2))

    return (
      <div className="profile">
        <div className="profile__info-container">
          {userData && userData.avatarUrl && <a href={userData.avatarUrl} target="_blank"><img className="avatar" src={userData.avatarUrl} /></a>}
          <div className="profile__info">
            {userData && (
              <div>
                <span>User: </span>
                <span> {userData.login} </span>
              </div>
            )}
            {userData && (
              <div>
                <span>Name: </span>
                <span> {userData.name} </span>
              </div>
            )}
            {userData && (
              <div>
                <span>ID: </span>
                <span> {userData.id} </span>
              </div>
            )}
            {userData && userData.followers.totalCount !== null && (
              <div>
                <span>Seguindo: </span>
                <span> {userData.followers.totalCount} </span>
              </div>
            )}
            {userData && userData.following.totalCount !== null && (
              <div>
                <span>Seguidores: </span>
                <span> {userData.following.totalCount} </span>
              </div>
            )}
            {userData && userData.repositories.totalCount !== null && (
              <div>
                <span>Repositórios (Públicos): </span>
                <span> {userData.repositories.totalCount} </span>
              </div>
            )}
            {userData && (
              <div>
                <span>Localização: </span>
                <span> {userData.location} </span>
              </div>
            )}
          </div>
        </div>
        <div className="pieChart">
          <PieChart width={300} height={200}>
            <Pie
              data={languageObjs}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              labelLine={false}
            >
              {
                languageObjs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))
              }
            </Pie>
          </PieChart>
        </div>
        <div className="graphLangs">
          {languageObjs.map((entry, index) => (
            <div key={`colorIcon-${index}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={entry.color} className="bi bi-square-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" />
              </svg>
              <span>{entry.name} ({langPercent[index]}%)</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Profile