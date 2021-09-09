import React, {useEffect} from "react";
import ReactGrid from "./index";

/**
 * Render another ReactGrid inside the ReactGrid
 *
 * @param props.row Expanded row
 * @param props.onCancel To collapse the row
 * @param props.onSuccess To collapse the row and reload data
 * @returns {JSX.Element}
 * @constructor
 */
const MasterDetailGrid = React.memo((
  {
    id,
    extraQuery,
    configuration,
    // ReactGrid
    row,
    onCancel = () => {},
    onSuccess = () => {}
  }) => {

  // if none row is selected -> it closes all the expanded
  useEffect(() => {
    !row && onCancel();
  },[row]);

  return <React.Fragment>
    <ReactGrid
      id={id}
      extraQuery={extraQuery}
      configuration={configuration} />
  </React.Fragment>
})

export default MasterDetailGrid;