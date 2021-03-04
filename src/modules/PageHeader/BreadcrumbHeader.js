import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import "./styles.scss";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {Breadcrumbs} from "@material-ui/core";

import {getBreadcrumbs} from "../../redux/pageHeader/selectors";
import HeadingHeader from "./HeadingHeader";

const BreadcrumbHeader = ({ config }) => {
  return (
    <HeadingHeader>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {config.map((c, index) => c.href?
          <Link key={index} className="header-breadcrumb-link"  color="inherit" href={c.href} onClick={() => {}}>
            {c.title}
          </Link>
          :
          <Typography key={index} className="header-breadcrumb-nolink"  color="textPrimary">{c.title}</Typography>)}
      </Breadcrumbs>
    </HeadingHeader>
  )
}

BreadcrumbHeader.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string
  }))
};

const mapStateToProps = (state, props) => {
  return {
    config: getBreadcrumbs(state)
  };
};

const component = injectIntl(connect(
  mapStateToProps,
  null
)(BreadcrumbHeader));

export default component;