import { Avatar , Divider, Grid, Typography } from '@mui/material'
import solarPanel from '../images/panel.jpg';
export const Home = () => {
  return (
    <Grid container
      direction="column"
      justifyContent="center"
    style={{ height: '40vh' }}>
        <Grid item xs={1} style={{marginTop: '8rem'}}>
        <Avatar variant={"rounded"} alt="The image" src={solarPanel} style={{
    width: '90%',
    height: '100%',
  }} />
        </Grid>
      <Grid item xs={12}>
        <Grid container style={{marginTop: '4rem'}}>
          <Typography variant={'h1'}>Costa Rica, Solar Panel Software Detector</Typography>
        </Grid>
        <Divider></Divider>
        <Grid item xs={12} style={{marginTop: '8rem'}}>
          <Typography component={'span'} variant={'h4'} >
            Justification: The following application has been created as part of a final project for a Master Degree in Computer Science, from Universitat Oberta de Catalunya. <br></br>Author: Carlos Andres Rodriguez Trigueros
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
