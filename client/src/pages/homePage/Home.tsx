import { Avatar, Grid, keyframes, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import VillaIcon from '@mui/icons-material/Villa';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HouseIcon from '@mui/icons-material/House';
import './Plants.css';
import peopleSolar from '../../images/peopleSolar.png';
import { LanguageContext } from '../MainMenu';
import { useContext } from 'react';

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

  const matchesUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchesUpSm = useMediaQuery(theme.breakpoints.up('md'));
  const manyHouses = (length: number) => { return Array.from({ length: length }, (_, i) => i + 1) };
  const manyUrbanAreas = (length: number) => { return (Array.from({ length: length }, (_, i) => i + 1)) };

  const randomNumber = () => { return Math.floor(Math.random() * 10) };

  const language = useContext(LanguageContext);

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
          {matchesUpMd &&
            <Grid container spacing={1}>
              <Sun >
              </Sun>
              <>
                <> {manyHouses(2).map((index) => {
                  return (
                    generateRandomIcons(index)
                  )
                })} </>

              </>
            </Grid>
          }
          <Grid container >
            {matchesUpMd &&
              <Grid container item xs={5} sm={5} style={{ padding: '2rem' }} >
                <Avatar variant={"rounded"} alt="The image" src={peopleSolar} style={{
                  width: '100%',
                  height: '100%',
                }} />
                <Typography fontSize={{
                  xs: 10
                }} style={{ color: 'black' }}  >
                  Image by rawpixel.com<br />
                </Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6} style={{ padding: '2rem' }} >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography fontSize={{
                  lg: 60,
                  md: 20,
                  sm: 20,
                  xs: 20
                }} fontFamily={'Segoe UI'} style={{ color: 'rgb(173, 230, 185)' }} sx={{ fontWeight: 'bold' }} >
                  {
                    language === 'english' ?
                      <>
                        The machine learning tool that was made to facilitate studies on the usage of solar panels in Costa Rica<br />
                      </> :
                      <>
                        La herramienta de machine learning que facilita  estudios en el uso de paneles solares
                      </>
                  }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {!matchesUpMd && <>
            <Grid container>
              <Sun >
              </Sun>
            </Grid>
            <Grid container item xs={12} sm={5} style={{ padding: '2rem' }} >
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
          </>
          }
          <Grid container style={{ marginTop: '3rem' }} spacing={1}>
            <Grid item xs={12}></Grid>
            <>
              {matchesUpSm &&
                <>{manyHouses(20).map((index) => {
                  return (
                    generateRandomIcons(index)
                  )
                })} </>}
            </>

          </Grid>
        </Grid>
      </Grid>
      {matchesUpMd &&
        <>
          <div className="plants">
            <div className="plant">
              <div className="leave"></div>
            </div>
            <div className="plant plant2">
              <div className="leave leave2"></div>
            </div>
            <div className="plant plant3">
            </div>
          </div>
          <div className="plants2">
            <div className="plant">
              <div className="leave"></div>
            </div>
            <div className="plant plant2">
              <div className="leave leave2"></div>
            </div>
            <div className="plant plant3">
            </div>
          </div>
          <div className="plants3">
            <div className="plant">
              <div className="leave"></div>
            </div>
            <div className="plant plant2">
              <div className="leave leave2"></div>
            </div>
            <div className="plant plant3">
            </div>
          </div>
        </>
      }
    </Grid>

  )
}
