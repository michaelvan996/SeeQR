import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styled from 'styled-components';
import TableDetails from './TableDetails';
import { AppState, TableInfo } from '../../../types';
import { DBType } from '../../../../backend/BE_types';
import { greyPrimary, greenPrimary } from '../../../style-variables';
import ERTables from '../ERTables/ERTabling';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  curDBType: DBType | undefined;
}
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  background-color: ${greenPrimary};
  margin-bottom: 10px;
`;

const StyledTabs = styled(Tabs)`
  background-color: ${greyPrimary};
  color: white;
  border-radius: 5px;
`;

const TabPanel = ({ children, value, index, curDBType }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-auto-tabpanel-${index}`}
    aria-labelledby={`scrollable-auto-tab-${index}`}
  >
    {value === index && children}
  </div>
);

const a11yProps = (index: any) => ({
  id: `scrollable-auto-tab-${index}`,
  'aria-controls': `scrollable-auto-tabpanel-${index}`,
});

interface TablesTabBarProps {
  tables: TableInfo[];
  selectTable: (table: TableInfo) => void;
  selectedTable: TableInfo | undefined;
  selectedDb: AppState['selectedDb'];
  setERView?: (boolean) => void;
  curDBType: DBType | undefined;
}

const TablesTabs = ({
  tables,
  selectTable,
  selectedTable,
  selectedDb,
  setERView,
  curDBType,
}: TablesTabBarProps) => {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    selectTable(tables[newValue]);
  };

  const tableIndex = tables.findIndex(
    ({ table_name }) => table_name === selectedTable?.table_name
  );

  const [active, setActive] = useState(true);

  const ErView = () => (
    <div>
      {active ? (
        <ERTables
          tables={tables}
          selectedDb={selectedDb}
          curDBType={curDBType}
        />
      ) : (
        <>
          <StyledTabs
            value={tableIndex}
            onChange={handleChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {tables.map(({ table_name: name }, index) => (
              <Tab label={name} {...a11yProps(index)} key={name} />
            ))}
            ;
          </StyledTabs>
          <br />
          <br />
          {tables.map((tableMap, index) => (
            <TabPanel
              value={tableIndex}
              index={index}
              key={tableMap.table_name}
              curDBType={curDBType}
            >
              <TableDetails table={tableMap} />
            </TabPanel>
          ))}
        </>
      )}
    </div>
  );

  const handleView = (e, newActive) => {
    // force at least one selected view
    if (newActive !== null) {
      // set the new view to the currect view
      setActive(newActive);

      // disable the dummy data button when in ER View
      if (setERView) {
        if (active) setERView(newActive);
        else setERView(newActive);
      }
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 300px)' }}>
      <StyledToggleButtonGroup
        value={active}
        exclusive
        onChange={handleView}
        aria-label="active-view"
      >
        <ToggleButton value aria-label="er" className='tables-view-btn'>
          ER diagram
        </ToggleButton>
        <ToggleButton value={false} aria-label="table" className='tables-view-btn'>
          Table
        </ToggleButton>
      </StyledToggleButtonGroup>
      {ErView()}
    </div>
  );
};

export default TablesTabs;
