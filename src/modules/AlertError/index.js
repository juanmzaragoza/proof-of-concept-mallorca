import React from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

const AlertError = ({ description, type, cols = 12, ...props }) => {
  return (
    <Grid item md={cols}>
      {" "}
      <Alert severity={type}>{description}</Alert>
    </Grid>
  );
};

AlertError.propTypes = {
  description: PropTypes.object,
  type: PropTypes.string,
};

export default compose(withSnackbar, injectIntl)(AlertError);
