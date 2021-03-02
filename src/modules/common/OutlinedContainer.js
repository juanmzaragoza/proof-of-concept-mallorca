import "./styles.scss";

const OutlinedContainer = ({ title, children }) => {
  return(
    <div className="outlined-container">
      {title? <span className="title">{title}</span>:null}
      {children}
    </div>
  )
}
export default OutlinedContainer;