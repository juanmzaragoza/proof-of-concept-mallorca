import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';
import IconButton from "@material-ui/core/IconButton";
import ObservationsForm from "./ObservationsForm";

const Observations = ({id, placeHolder, required, disabled, value = '', onChange, ...props}) => {
  const [open, setOpen] = useState(false);

  const isEmpty = () => !value || !value.length;
  const EmptyButton = (
    isEmpty()?
      <IconButton onClick={() => setOpen(true)} disabled={disabled} color="primary" aria-label="upload picture" component="span">
        <LabelOffIcon />
      </IconButton>
      :
      null
  );

  const FullButton = (
    !isEmpty()?
      <IconButton onClick={() => setOpen(true)} disabled={disabled} color="primary" aria-label="upload picture" component="span">
        <LabelIcon />
      </IconButton>
      :
      null
  );

  return <div>
    {EmptyButton}
    {FullButton}
    <ObservationsForm open={open}
                      required={required}
                      onClose={() => setOpen(false)}
                      onSubmit={(e,value) => {
                        onChange(e,value);
                      }}
                      value={value}
                      placeHolder={placeHolder} />
  </div>;
}

Observations.propTypes = {
  id: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Observations;