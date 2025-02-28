import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { TradeBtn } from "../Buttons/Trade";
import { EditBtn } from "../Buttons/Edit";
import { CancelBtn } from "../Buttons/Cancel";

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
                <EditBtn />
                <CancelBtn />
            </Box>
            <TradeBtn />
        </Box>
    );
}
