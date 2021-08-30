import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import { TABLE_HEADING_TYPE, TABLE_FILTER_TYPE } from '@devexpress/dx-grid-core'
import {Getter, Template, Plugin} from '@devexpress/dx-react-core'
import {
  Table,
} from '@devexpress/dx-react-grid-material-ui'

const pluginDependencies = [
  {name: 'Table'},
];

const ACTIONS_COLUMN_TYPE = 'actionsColumnType';

function tableColumnsWithActions(tableColumns, width) {
  return [...tableColumns, {key: ACTIONS_COLUMN_TYPE, type: ACTIONS_COLUMN_TYPE, width: width}];
}

function isHeadingActionsTableCell(tableRow, tableColumn) {
  return tableRow.type === TABLE_HEADING_TYPE && tableColumn.type === ACTIONS_COLUMN_TYPE;
}

function isActionsTableCell(tableRow, tableColumn) {
  return tableRow.type !== TABLE_HEADING_TYPE && tableRow.type !== TABLE_FILTER_TYPE && tableColumn.type === ACTIONS_COLUMN_TYPE;
}

export class ActionsColumn extends React.PureComponent {
  render() {
    const {
      actions,
      width,
      title
    } = this.props;
    const tableColumnsComputed = ({tableColumns}) => tableColumnsWithActions(tableColumns, width);

    return (
        <Plugin
            name="ActionsColumn"
            dependencies={pluginDependencies}
        >
          <Getter name="tableColumns" computed={tableColumnsComputed}/>

          <Template
              name="tableCell"
              predicate={({tableRow, tableColumn}) =>
                  isHeadingActionsTableCell(tableRow, tableColumn)}
          >
            <Table.Cell>{title? title:'Actions Column'}</Table.Cell>
          </Template>
          <Template
              name="tableCell"
              predicate={({tableRow, tableColumn}) => isActionsTableCell(tableRow, tableColumn)}
          >
            {params => (
                <Table.Cell {...params} row={params.tableRow.row}>
                  {actions.map((action,i) => {
                    return (
                        <IconButton key={`${i}`} onClick={() => action.action(params.tableRow.row)}>
                          {action.icon}
                        </IconButton>
                    )

                  })}
                </Table.Cell>
            )}
          </Template>
        </Plugin>
    );
  }
}
ActionsColumn.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    action: PropTypes.func.isRequired
  })).isRequired,
  width: PropTypes.number,
  title: PropTypes.string
};
ActionsColumn.defaultProps = {
  width: 240,
};