import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
  <Box>
    <Grid>
      <Box>
        <Typography variant="h5"
          style={{
            fontSize:"45px",
            alignItems:"center",
            display:"flex",
            justifyContent:"center",
            height:"80vh"
          }}>
            Welcome to Admin Panel
        </Typography>
      </Box>
    </Grid>
  </Box>
  );
}

