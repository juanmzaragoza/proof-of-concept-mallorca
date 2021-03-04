import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import {Save, Undo, Delete, ChevronLeft, ChevronRight} from "@material-ui/icons";

import ContentHeader from "./ContentHeader";
import BreadcrumbHeader from "./BreadcrumbHeader";
import {bindActionCreators} from "redux";
import {setFireSaveFromHeader} from "redux/pageHeader";


const FormHeader = ({ actions }) => {
  const list = [
    {
      id: 1,
      breakpoints: {
        xs: 3
      },
      content: <BreadcrumbHeader />
    },
    {
      id: 2,
      breakpoints: {
        xs: 9
      },
      style: {
        display: 'flex',
        flexDirection: 'row-reverse'
      },
      content: <div>
        <IconButton onClick={() => actions.onClickOnSave(true)}>
          <Save />
        </IconButton>
        <IconButton >
          <Undo />
        </IconButton>
        <IconButton >
          <Delete />
        </IconButton>
        <span>
          <IconButton disabled>
            <ChevronLeft />
          </IconButton>
          <span>
            1 / 250
          </span>
          <IconButton >
            <ChevronRight />
          </IconButton>
        </span>
      </div>
    },
  ];

  return (
    <ContentHeader grids={list} />
  );
}

FormHeader.propTypes = {
  actions: PropTypes.shape({
    onClickOnSave: PropTypes.func
  }),
}

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    onClickOnSave: bindActionCreators(setFireSaveFromHeader, dispatch),
  };
  return { actions };
};

export default connect(null,mapDispatchToProps)(FormHeader);