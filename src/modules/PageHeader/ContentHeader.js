import React from "react";
import Grid from "@material-ui/core/Grid/Grid";

const ContentHeader = ({ grids }) => {
  return (
    <Grid container
          style={{
            backgroundColor: '#f2f2f2',
            padding: '10px 20px 0px 20px'
          }}
    >
      {grids.map(grid => (
        <Grid key={grid.id} item xs={grid.breakpoints.xs} md={grid.breakpoints.md} style={grid.style} >
          { grid.content }
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentHeader;