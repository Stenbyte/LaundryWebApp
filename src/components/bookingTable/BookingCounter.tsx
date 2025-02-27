import { Box, Tooltip, Typography, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function BookingCounter() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                height: "50px",
                width: "100vw",
                margin: '20px 0'
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Number of reservations that can be used per week">
                    <InfoIcon />
                </Tooltip>
                <Typography>Reservations left: 3</Typography>
            </Box>
            <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                <Button color="primary" size="small" variant="contained">Edit</Button>
                <Button color="secondary" size="small" variant="outlined">Cancel</Button>
            </Box>
        </Box>
    );
}
