import "./styles.scss"

import { useState } from "react"

const Search = ({ name }) => {
  const [inputValue, setInputValue] = useState("")

  const handleClick = (value) => {
    name(value)
  }

  const handleKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <>
      <div className="title">
        GitHub Profiler
      </div>
      <div className="search">
        <h2>Procurar Usuário</h2>
        <form>
          <input className="form-control" type="text" placeholder="Perfil" onChange={e => setInputValue(e.target.value)} onKeyDown={e => handleKey(e)} />
          <button onClick={() => handleClick(inputValue)} className="btn" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}

export default Search