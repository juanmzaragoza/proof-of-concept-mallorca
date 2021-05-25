import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";

const ExpandableContent = ({ data, columns }) => {
  return (<Grid container spacing={2}>
    {columns.map((col, index) => <Grid key={index} item xs={12} md={3}><b>{col.title}:</b> {col.getCellValue? col.getCellValue(data):data[col.name]}</Grid>)}
  </Grid>);
};

ExpandableContent.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};
export default ExpandableContent;