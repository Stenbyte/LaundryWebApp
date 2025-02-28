import { Box, Tooltip, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function TradeBtn() {
    return (
        <Box
            className='booking-counter-trade-btn'
        >
            <Tooltip
                title="Here you can trade your time slot with another tenants"
                placement="top"
                color="info"
            >
                <InfoIcon />
            </Tooltip>
            <Button color="success" size="small" variant="contained">
                Trade
            </Button>
        </Box>
    )
}