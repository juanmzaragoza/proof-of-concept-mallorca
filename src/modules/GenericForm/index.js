import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, Input, Paper, TextField} from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: '1% 0',
    marginTop: '5%'
  },
  formControlsFilledInput: {
    width: '100%',
    padding: '20px'
  },
});

const GenericForm = (props) => {
  const formRef = useRef(null);
  const [onBlur, setOnBlur] = useState({});

  const {
    root,
    formControlsFilledInput
  } = useStyles();

  useEffect(() => {
    if(props.submitFromOutside){
      const form = formRef.current;
      if (form) {
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit();
        } else {
          form.dispatchEvent(new Event('submit', {cancelable: true}));
        }
      }
    }
  },[props.submitFromOutside]);

  const renderField = params => {

    const {
      key,
      onChange,
      value,
      placeHolder,
      required,
      breakpoints,
      error
    } = params;
    switch(params.type) {
      case 'input':
        return (
          <Grid item
                key={key}
                xs={breakpoints? breakpoints.xs:12}
                sm={breakpoints? breakpoints.sm:false}
                md={breakpoints? breakpoints.md:false}
                lg={breakpoints? breakpoints.lg:false}
                key={placeHolder}>
            <FormControl className={formControlsFilledInput} variant="filled">
              <TextField
                onChange={e => onChange(e.currentTarget.value)}
                value={value}
                label={placeHolder}
                required={Boolean(required)}
                error={onBlur[key] && Boolean(error)}
                helperText={onBlur[key] && Boolean(error)? error.message:''}
                onBlur={() => setOnBlur({[key]: true})}
                type={"text"} />
            </FormControl>
          </Grid>
        );
      default:
        return;
    }
  }

  const {
    formComponents
  } = props;
  return (
    <div className={root}>
      <Paper>
        <form ref={formRef} onSubmit={(e) => {
          e.preventDefault();
          if (props.onSubmit) props.onSubmit(e);
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} container spacing={1}>{/* BEGINING of 1st Column */}
              {
                formComponents.map((component, index) => <React.Fragment key={index}>{renderField(component)}</React.Fragment>)
              }
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
};

GenericForm.propTypes = {
  formComponents: PropTypes.array
};
export default GenericForm;