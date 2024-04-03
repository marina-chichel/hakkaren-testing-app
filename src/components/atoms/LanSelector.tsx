import { Button } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import UK from "../../assets/UK.png";

function LanSelector() {
  return (
    <Button
      variant="text"
      startIcon={<img src={UK} width={16} alt="UK flag" />}
      endIcon={<ArrowDropDown />}
    >
      EN
    </Button>
  );
}

export default LanSelector;
