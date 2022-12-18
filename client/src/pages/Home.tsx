import { Avatar, Box, Divider, Grid, keyframes, makeStyles, Paper, styled, Typography, useTheme } from '@mui/material'
import solarPanel from '../images/panel.jpg';



export const Home = () => {
  const theme = useTheme();
  
  const sunrise = keyframes`

  0% {
    transform: translate(100px, 200px);
  }
  50% {
    transform: translateX(200px, 300px);
  }
  100% {
    transform: translateX(300px, 400px);
  }
  `;

  const city = keyframes`
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(0);
  }
  `;

    const Sun = styled("div")({
      backgroundImage: 'linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)',
      borderRadius: '50%',
      height: '100px',
      width: '100px',
      animation: `${sunrise} 10s infinite ease`
    });

    const cityStyles = {
      animationName: 'cityscape',
      animationDuration: '20s',
      animationIterationCount: 'infinite',
      height: '300px',
      width: '100%',
    };
  
    const buildingStyles = {
      backgroundColor: '#ddd',
      height: '100px',
      marginBottom: '10px',
      width: '50px',
    };

    const buildings = [];
    for (let i = 0; i < 2; i++) {
      buildings.push(<div className="building" style={buildingStyles}></div>);
    }
  

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} >
     
        <Grid container>
       
          <Grid item xs={12} style={{ marginTop: '3rem' }}>
         
            <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 15,
              xs: 10
            }} >
       
              Welcome! <br />
              <br />
              The main purpose of this application is to serve as a base for studying how many solar panels exist in Costa Rica.
              By knowing how many solar panels exist in a region ,
              we can for example predict the quantity of solar energy being generated or get to know how much is the penetration of this type of green energy in Costa Rica and collaborate with studies that
              are focused on this kind of ecological initiatives.
              <br />
              <br />
              Costa Rica was selected as the area of study for multiple reasons, it's one of the countries in the world that generates most of its energy using renewable  sources and it has great solar potential as shown in studies made by public institutions.
            </Typography>
            <Typography fontSize={{
              lg: 20,
              md: 10,
              sm: 7,
              xs: 5
            }} >
              <br />
              <br />
              Notes: 
              <br />
              Note 1: So far and because of the scope the prediction requires manual intervention of a user (by clicking the region),
              but it's quite close to being adjusted to be automated to detect solar panels in multiple "zones".
              <br />
              Note 2: The following application has been created as part of a final project for a Master Degree in Computer Science, from Universitat Oberta de Catalunya.<br />
              <br />
              Author: Carlos Andres Rodriguez Trigueros
              <br />
              Year: 2022
            </Typography>
           
          </Grid>
          
        </Grid>
      </Grid>
      <Grid item xs={4} >
      <Sun >
      </Sun>
      <Grid container spacing ={2}>
        <Grid item>
      {buildings}
      </Grid>
      <Grid item>
      {buildings}
      </Grid>
      <Grid item>
      {buildings}
      </Grid>
      </Grid>
      </Grid>
    </Grid>

  )
}
