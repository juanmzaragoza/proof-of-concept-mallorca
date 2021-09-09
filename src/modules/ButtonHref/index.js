import React from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import "../ButtonPopUp/styles.scss";

const ButtonHref = ({ title, href, ...props }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        href={href}
        target="_blank"
        className="ButtonPopUp"
      >
        {title}
      </Button>
    </>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default compose(withSnackbar, injectIntl)(ButtonHref);
