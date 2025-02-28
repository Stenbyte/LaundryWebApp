import { Box, Tooltip, Typography, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "../../App.css";

export function BookingCounter() {
    return (
        <Box className="booking-counter-mainBox">
            <Box className="booking-counter-resesrvation">
                <Tooltip
                    title="Number of reservations that can be used per week"
                    color="info"
                    placement="top-start"
                >
                    <InfoIcon />
                </Tooltip>
                <Typography>Reservations left: 3</Typography>
            </Box>
            <Box className="booking-counter-edit-cancel-btn">
                <Button color="primary" size="small" variant="contained">
                    Edit
                </Button>
                <Button color="secondary" size="small" variant="outlined">
                    Cancel
                </Button>
            </Box>
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
        </Box>
    );
}
