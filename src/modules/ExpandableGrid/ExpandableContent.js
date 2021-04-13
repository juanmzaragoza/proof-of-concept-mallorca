import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";

const ExpandableContent = ({ data, columns }) => {
  console.log(data ,columns)
  return (<Grid container spacing={2}>
    {columns.map(col => <Grid item xs={12} md={3}><b>{col.title}:</b> {col.func? col.func(data[col.name]):data[col.name]}</Grid>)}
  </Grid>);
};

ExpandableContent.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};
export default ExpandableContent;