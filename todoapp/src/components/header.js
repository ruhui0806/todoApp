import React from 'react'

const Header = (props) => {
  const style = {
    backgroundColor: "rgb(252, 198, 3)"
  }
  return (
    <header style={style} className="App-header text-center">
      <h2 className="font-link" style={{ color: "#001219" }}>
        To-do List
      </h2>
      <br />
      <button className="btn btn-dark font-link" onClick={props.handleUrgent}>{props.urgent ? "Show All" : "Show Urgent"}  <i onClick={props.handleUrgent} className={props.urgent ? "bi bi-flag-fill" : "bi bi-flag"}></i></button>

    </header>
  )
}
export default Header


