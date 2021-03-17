import PropTypes from "prop-types";
import "./styles.scss";

const OutlinedContainer = ({ title, children, className }) => {
  return(
    <div className={`outlined-container ${className? className:''} `}>
      {title? <span className="title">{title}</span>:null}
      {children}
    </div>
  )
}

OutlinedContainer.propTypes = {
  title: PropTypes.any,
  children: PropTypes.element
}
export default OutlinedContainer;