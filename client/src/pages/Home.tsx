import { Avatar , Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import solarPanel from '../images/panel.jpg';
export const Home = () => {
  return (
    <Grid container spacing={3}>
    <Grid item xs ={4} >
          <Avatar variant={"rounded"} alt="The image" src={solarPanel} style={{
      width: '100%',
      height: '100%',
    }} />
        </Grid>
        <Grid item xs ={8} >
        <Grid container>
        <Grid item xs ={12} >
          <Typography variant='h2'>Costa Rica, Solar Panel Detector</Typography>
          <Divider></Divider>
        </Grid>
        <Grid item xs={12} style={{marginTop: '8rem'}}>
          <Typography  variant='h4' >
            The following application has been created as part of a final project for a Master Degree in Computer Science, from Universitat Oberta de Catalunya. <br></br>Author: Carlos Andres Rodriguez Trigueros
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    </Grid>

  )
}
