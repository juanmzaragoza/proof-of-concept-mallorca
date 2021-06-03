import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {submit, reset} from "redux/lovForm";
import {getData, getIsLoading} from "redux/lovForm/selectors";
import ReactGrid from "../ReactGrid";

const LOVAdvancedSearch = ({ id, title, open, close, actions, listKey, columns = [], ...props }) => {
  const [openModal, setOpenModal] = useState(open);

  useEffect(()=>{
    setOpenModal(open);
    if(open){
      actions.reset();
    }
  },[open]);

  const closeIt = (data) => {
    setOpenModal(false);
    close(data);
  };

  return(
    <Dialog
      open={openModal}
      onClose={() => closeIt()}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id={"LOVAdvancedSearch.titulo"} defaultMessage={"Seleccionar {name}"} values={{name: title? title:""}}/>
        <DialogContentText>
          <FormattedMessage id={"LOVAdvancedSearch.subtitulo"} defaultMessage={"Realice una búsqueda avanzada del elemento"}/>
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <ReactGrid
          id={id}
          configuration={{
            columns: columns,
            listKey,
            disabledActions: true
          }}
          onClickRow={closeIt}/>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closeIt()}
          color="primary"
          disabled={props.loading} >
          <FormattedMessage id={"Forms.cancel"} defaultMessage={"Cancelar"} />
        </Button>
      </DialogActions>
    </Dialog>
  )
};

LOVAdvancedSearch.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.func,
  loading: PropTypes.bool,
  columns: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    loading: getIsLoading(state),
    data: getData(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    submit: bindActionCreators(submit, dispatch),
    reset: bindActionCreators(reset, dispatch),
  };
  return { actions };
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  withSnackbar,
  injectIntl
)(LOVAdvancedSearch);