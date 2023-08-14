import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/material";
import "../common/CheckBox.css";

interface CheckBoxProps {
  color: string;
}
const CheckBox = ({ color }: CheckBoxProps) => {
  const [value, setValue] = useState(false);
  return (
    <Box>
      <Box
        data-testId="box"
        className="checkbox-parent"
        sx={{
          backgroundColor: color,
        }}
        onClick={() => {
          setValue(!value);
        }}
      >
        {value ? <DoneIcon className="done-icon" /> : null}
      </Box>
    </Box>
  );
};

export default CheckBox;
