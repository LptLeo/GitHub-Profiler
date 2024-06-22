import "./styles.scss"

import { useEffect, useState } from "react"

import { PieChart, Pie } from "recharts"

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const [reposData, setReposData] = useState(null)
    const [dataLang, setdataLang] = useState(null)

    useEffect(() => {
        fetch("https://api.github.com/users/LptLeo")
            .then(response => response.json())
            .then(result => setUserData(result))
            .catch(error => console.error("Erro ao buscar os dados:", error))

        fetch("https://api.github.com/users/LptLeo/repos")
            .then(response => response.json())
            .then(result => setReposData(result))
            .catch(error => console.error("Erro ao buscar os dados:", error))
    }, [])

    //// Problema de sobrecarga de requisições Fetch, necessário aprender "Consulta GraphQL"
    useEffect(() => {
        if (reposData) {
            const fetchLangData = async () => {
                try {
                    const tempDataLang = await Promise.all(
                        reposData.map((repo) =>
                            fetch(repo.languages_url).then((response) => response.json())
                        )
                    )

                    const aggregatedLangData = tempDataLang.reduce((acc, obj) => {
                        for (const [key, value] of Object.entries(obj)) {
                            if (acc[key]) {
                                acc[key] += value
                            } else {
                                acc[key] = value
                            }
                        }
                        return acc
                    }, {})

                    const formattedLangData = Object.entries(aggregatedLangData).map(
                        ([name, value]) => ({ name, value })
                    )

                    setdataLang(formattedLangData)
                } catch (error) {
                    console.error("Erro ao buscar os dados:", error)
                }
            }

            fetchLangData()
        }
    }, [reposData])

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ]

    const data02 = [
        { name: 'Group A', value: 2400, color: "#FFF" },
        { name: 'Group B', value: 4567, color: "#FFF" },
        { name: 'Group C', value: 1398, color: "#FFF" },
        { name: 'Group D', value: 9800, color: "#FFF" },
        { name: 'Group E', value: 3908, color: "#FFF" },
        { name: 'Group F', value: 4800, color: "#FFF" },
    ]

    return (
        <div className="profile">
            <img className="avatar" src="https://avatars.githubusercontent.com/u/27590894?v=4" />
            <div>
                <div>
                    <span className="fs-5 fw-bold">User: </span>
                    <span> {userData ? userData.login : (" - - - ")} </span>
                </div>
                <div>
                    <span className="fw-bold">Name: </span>
                    <span> {userData ? userData.name : (" - - - ")} </span>
                </div>
                <div>
                    <span className="fw-bold">ID: </span>
                    <span> {userData ? userData.id : (" - - - ")} </span>
                </div>
                <div>
                    <span className="fw-bold">Seguindo: </span>
                    <span> {userData ? userData.following : (" - - - ")} </span>
                </div>
                <div>
                    <span className="fw-bold">Seguidores: </span>
                    <span> {userData ? userData.followers : (" - - - ")} </span>
                </div>
                <div>
                    <span className="fw-bold">Repositórios (Públicos): </span>
                    <span> {userData ? userData.public_repos : (" - - - ")} </span>
                </div>
            </div>
            <div>
                <PieChart width={600} height={200}>
                    <Pie
                        dataKey="value"
                        data={data01}
                        cx="25%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Pie
                        dataKey="value"
                        nameKey="name"
                        data={dataLang}
                        cx="75%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={80}
                        fill="dataKey='color'"
                        label
                    >

                    </Pie>
                </PieChart>
            </div>
        </div>
    )
}

export default Profile