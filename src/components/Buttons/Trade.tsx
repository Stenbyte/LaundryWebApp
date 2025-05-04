import { Box, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { GenericButton } from "./GenericButton";

export function TradeBtn() {
  return (
    <Box className="booking-counter-trade-box">
      <Tooltip
        title="Here you can trade your time slot with another tenants"
        placement="top"
        className="infoIcon"
      >
        <InfoIcon />
      </Tooltip>
      <GenericButton className="tradeBtn">Trade</GenericButton>
    </Box>
  );
}
