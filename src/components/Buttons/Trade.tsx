import { Box, Tooltip, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function TradeBtn() {
    return (
        <Box
            className='booking-counter-trade-box'
        >
            <Tooltip
                title="Here you can trade your time slot with another tenants"
                placement="top"
                color="info"
            >
                <InfoIcon />
            </Tooltip>
            <Button size="small" className="tradeBtn">
                Trade
            </Button>
        </Box>
    )
}