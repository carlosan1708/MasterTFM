import { Avatar, Grid, keyframes, Paper, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import VillaIcon from '@mui/icons-material/Villa';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HouseIcon from '@mui/icons-material/House';
import './Plants.css';
import peopleSolar from '../../images/peopleSolar.png';

export const Home = () => {

  const theme = useTheme();

  const sunrise = keyframes`
  0% {
    transform: translate(-100vw, -20vh);
  }
  25% {
    transform: translate(2vw, 10vh );
  }
  50% {
    transform: translate(10vw, 5vh );
  }
  75% {
    transform: translate(70vw, -5vh);
  }
  90% {
    transform: translate(90vw, -5vh);
  }
  100% {
    transform: translate(200vw, 1vh);
  }
  `;

  const Sun = styled("div")({
    backgroundImage: 'linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%)',
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    animation: `${sunrise} 10s infinite ease`
  });

  const matchesUp = useMediaQuery(theme.breakpoints.up('md'));
  const manyHouses = (length: number) => { return Array.from({ length: length }, (_, i) => i + 1) };
  const manyUrbanAreas = (length: number) => { return (Array.from({ length: length }, (_, i) => i + 1)) };

  const randomNumber = () => { return Math.floor(Math.random() * 10) };

  const houses = [<MapsHomeWorkIcon fontSize="large" />,
  <VillaIcon fontSize="large" />,
  <HouseIcon fontSize="large" />,
  <OtherHousesIcon fontSize="large" />,
  <HolidayVillageIcon fontSize="large" />,
  ]
  const generateRandomIcons = (index: number) => {
    return (
      <Grid item xs={1} key={`${index}M0`}>
        <>
          {manyUrbanAreas(randomNumber()).map(() => {
            return (<> {houses[randomNumber()]} </>)
          })}

        </>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Grid container>
          {matchesUp ?
            <Grid container spacing={1}>
              <Sun >
              </Sun>
              <>
                <>    {manyHouses(3).map((index) => {
                  return (
                    generateRandomIcons(index)
                  )
                })} </>

              </>
            </Grid>
            :
            <Grid container spacing={1}>
              <Sun >
              </Sun>
            </Grid>
          }
          <Grid container justifyContent={'center'} alignItems={'center'}>
          
          <Grid container item xs={5} style={{ padding: '2rem'}} >
            <Avatar variant={"rounded"} alt="The image" src={peopleSolar} style={{
              width: '100%',
              height: '100%',
            }} />
            <Typography fontSize={{
                xs: 10
              }} style={{ color: 'rgb(173, 230, 185)' }}  >
                Image by rawpixel.com<br />
              </Typography>
          </Grid>
          <Grid item xs={5} style={{ padding: '2rem', marginLeft: '2vw' }} >
            <Paper elevation={24} style={{ padding: '3rem', backgroundColor: 'rgba(144, 202, 249, 0.16)' }} >
              <Typography fontSize={{
                lg: 30,
                md: 20,
                sm: 15,
                xs: 20
              }} style={{ color: 'rgb(173, 230, 185)' }} sx={{ fontWeight: 'bold' }} >
                 The machine learning tool was made to facilitate studies on the usage of solar panels in Costa Rica<br />
              </Typography>
            </Paper>
          </Grid>
          </Grid>
          <Grid container style={{ marginTop: '3rem' }} spacing={1}>
            <>
              {!matchesUp ? <>  {manyHouses(10).map((index) => {
                return (
                  generateRandomIcons(index)
                )
              })} </> :
                <>    {manyHouses(35).map((index) => {
                  return (
                    generateRandomIcons(index)
                  )
                })} </>}
            </>
          </Grid>
        </Grid>
      </Grid>
      {matchesUp ?
        <>
          <div className="plants">
            <div className="plant">
              <div className="leave"></div>
              <div className="pot"></div>
            </div>
            <div className="plant plant2">
              <div className="leave leave2"></div>
              <div className="pot pot2"></div>
            </div>
            <div className="plant plant3">
              <div className="pot pot2 pot3">
                <div className="stem"></div>
              </div>
            </div>
          </div>
          <div className="plants">
            <div className="plant">
              <div className="leave"></div>
              <div className="pot"></div>
            </div>
            <div className="plant plant2">
              <div className="leave leave2"></div>
              <div className="pot pot2"></div>
            </div>
            <div className="plant plant3">
              <div className="pot pot2 pot3">
                <div className="stem"></div>
              </div>
            </div>
          </div>
          <div className="plants2">
            <div className="plant">
              <div className="leave"></div>
              <div className="pot"></div>
            </div>
            <div className="plant plant2">
              <div className="leave leave2"></div>
              <div className="pot pot2"></div>
            </div>
            <div className="plant plant3">
              <div className="pot pot2 pot3">
                <div className="stem"></div>
              </div>
            </div>
          </div>
          <div className="plants3">
            <div className="plant">
              <div className="leave"></div>
              <div className="pot"></div>
            </div>
          </div>
        </> : <div className="plants3">
          <div className="plant">
            <div className="leave"></div>
            <div className="pot"></div>
          </div>
        </div>
      }
    </Grid>

  )
}
