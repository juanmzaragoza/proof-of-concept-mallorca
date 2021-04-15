import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loading.scss';

export const Loading = ({ size = 40 }) => (
    <div className="loading-shading-mui">
      <CircularProgress size={size} className="loading-icon-mui" />
    </div>
);