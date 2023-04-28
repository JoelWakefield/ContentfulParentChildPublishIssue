import * as React from "react"
import { 
  Container, 
  Grid, 
  Typography 
} from "@mui/material"

const NotFoundPage = () => (
  <Container maxWidth="xl">
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h1">404: Not Found</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          You just hit a route that doesn&#39;t exist... the sadness.
        </Typography>
      </Grid>
    </Grid>
  </Container>
)

export default NotFoundPage
