/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";

const TabsView = (props: any) => {
  const [value, setValue] = useState(props.activeTabs);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number | string
  ) => {
    setValue(newValue.toString());
    console.log(event);
  };

  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={value}>
        <Box>
          <TabList
            data-testId="tab-list"
            TabIndicatorProps={{
              style: {
                backgroundColor: "transparent",
              },
            }}
            onChange={handleChange}
          >
            {props.data.map((e: any) => (
              <Tab
                sx={{
                  borderTop: e.value === value ? "2px solid #ddd" : "",
                  borderLeft: e.value === value ? "2px solid #ddd" : "",
                  borderRight: e.value === value ? "2px solid #ddd" : "",
                  borderBottom: e.value !== value ? "2px solid #ddd" : "",
                }}
                key={e.value}
                label={e.label}
                value={e.value}
              />
            ))}
          </TabList>
        </Box>
        {props.data.map((e: any) => (
          <TabPanel key={e.value} value={e.value}>
            {e.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
export default TabsView;
