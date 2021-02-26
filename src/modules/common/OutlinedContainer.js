import "./styles.scss";

const OutlinedContainer = ({ title, children }) => {
  return(
    <div className="outlined-container">
      {title? <div className="title">{title}</div>:null}
      {children}
    </div>
  )
}
export default OutlinedContainer;