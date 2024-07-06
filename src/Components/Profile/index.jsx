import "./styles.scss"

import { PieChart, Pie, Cell } from "recharts"

const Profile = ({ userData }) => {
    if (!userData) return (
        <div className="insert-message">
            <span className="text-warning fs-1">Carregando...</span>
        </div>
    )

    const languageObjs = []

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
            {userData && userData.avatarUrl && <img className="avatar" src={userData.avatarUrl} />}
            <div className="profile__info">
                {userData && (
                    <div>
                        <span className="profile__text">User: </span>
                        <span> {userData.login} </span>
                    </div>
                )}
                {userData && (
                    <div>
                        <span className="profile__text">Name: </span>
                        <span> {userData.name} </span>
                    </div>
                )}
                {userData && (
                    <div>
                        <span className="profile__text">ID: </span>
                        <span> {userData.id} </span>
                    </div>
                )}
                {userData && userData.followers.totalCount !== null && (
                    <div>
                        <span className="profile__text">Seguindo: </span>
                        <span> {userData.followers.totalCount} </span>
                    </div>
                )}
                {userData && userData.following.totalCount !== null && (
                    <div>
                        <span className="profile__text">Seguidores: </span>
                        <span> {userData.following.totalCount} </span>
                    </div>
                )}
                {userData && userData.repositories.totalCount !== null && (
                    <div>
                        <span className="profile__text">Repositórios (Públicos): </span>
                        <span> {userData.repositories.totalCount} </span>
                    </div>
                )}
                {userData && (
                    <div>
                        <span className="profile__text">Localização: </span>
                        <span> {userData.location} </span>
                    </div>
                )}
            </div>
            <div>
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
                    <div className="me-1" key={`colorIcon-${index}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={entry.color} className="bi bi-square-fill" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z" />
                        </svg>
                        <span className="graphDescriptionText">{entry.name} ({langPercent[index]}%)</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile