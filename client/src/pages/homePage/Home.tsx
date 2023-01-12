import { Button, Grid, Paper, Typography } from '@mui/material'

import { LanguageContext } from '../MainMenu';
import { useContext, useState } from 'react';
import background from '../../images/background2.jpg'; // Import using relative path
import { useNavigate } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useSpring, animated } from '@react-spring/web'


export const Home = () => {

  const language = useContext(LanguageContext);



  const navigate = useNavigate()
  const [displayBox1, setDisplayBox1] = useState(false);
  const [displayBox2, setDisplayBox2] = useState(false);
  const [displayBox3, setDisplayBox3] = useState(false);
  const [displayBox4, setDisplayBox4] = useState(false);

  setTimeout(() => {
    setDisplayBox1(true);
  }, 1000);
  setTimeout(() => {
    setDisplayBox2(true);
  }, 3000);
  setTimeout(() => {
    setDisplayBox3(true);
  }, 5000);

  setTimeout(() => {
    setDisplayBox4(true);
  }, 7000);

  const fadeProps1 = useSpring({
    from: { opacity: 0, transform: 'translateX(-20%)' },
    to: {
      opacity: displayBox1 ? 1 : 0,
      transform: displayBox1 ? 'translateX(0%)' : 'translateX(-100%)',
    },
    config: { duration: 2000 },
  });

  const fadeProps2 = useSpring({
    from: { opacity: 0, transform: 'translateX(-20%)' },
    to: {
      opacity: displayBox2 ? 1 : 0,
      transform: displayBox2 ? 'translateX(0%)' : 'translateX(-100%)',
    },
    config: { duration: 2000 },
  });

  const fadeProps3 = useSpring({
    from: { opacity: 0, transform: 'translateX(-20%)' },
    to: {
      opacity: displayBox3 ? 1 : 0,
      transform: displayBox3 ? 'translateX(0%)' : 'translateX(-100%)',
    },
    config: { duration: 2000 },
  });

  const fadeProps4 = useSpring({
    from: { opacity: 0,transform: 'translateY(100%)' },
    to: {
      opacity: displayBox4 ? 1 : 0,
      transform: displayBox4 ? 'translateY(0%)' : 'translateY(100%)',
    },
    config: { duration: 3000 },
  });

  const handleClick = () => {
    navigate('/dataPrediction')
  }

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundRepeat: "repeat",
      }}
    >

      <Grid item xs={1}></Grid>
      <Grid item xs={10} style={{ marginTop: '18vh', height: '1rem' }}>
        <Typography fontSize={{
          lg: 60,
          md: 20,
          sm: 20,
          xs: 20
        }} align='center' style={{ color: 'white' }} sx={{ fontWeight: 'bold' }} >
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
      <Grid item xs={1}></Grid>
      <Grid container justifyContent={'center'}
        spacing={5} style={{ padding: '3rem', marginTop: '22vh' }}>
       
          <Grid item sm={3} >
          <animated.div style={fadeProps1}>
            <Paper style={{ background: 'rgba(204, 204, 204, 0.5)' }}>
              <Typography fontSize={{
                lg: 30,
                md: 20,
                sm: 20,
                xs: 20
              }} align='center' style={{ color: '#FFF8DC' }} sx={{ fontWeight: 'bold' }} >
                {
                  language === 'english' ?
                    <>
                      More than 400 images used for training
                      <br />
                    </> :
                    <>
                      Más de 400 imágenes usadas en entrenamiento
                    </>
                }
              </Typography>
            </Paper>
            </animated.div>
          </Grid>
       
        <Grid item sm={3} >
        <animated.div style={fadeProps2}>
          <Paper style={{ background: 'rgba(204, 204, 204, 0.5)' }}>
            <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 20,
              xs: 20
            }} align='center' style={{ color: '#FFF8DC' }} sx={{ fontWeight: 'bold' }} >
              {
                language === 'english' ?
                  <>
                    2 machine learning models, Classification and Semantic segmentation
                    <br />
                  </> :
                  <>
                    2 modelos de aprendizaje automatico, Clasificacion y Segmentacion semantica
                  </>
              }
            </Typography>
          </Paper>
          </animated.div>
        </Grid>
        <Grid item sm={3} >
        <animated.div style={fadeProps3}>
          <Paper style={{ background: 'rgba(204, 204, 204, 0.5)' }}>
        
            <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 20,
              xs: 20
            }} align='center' style={{ color: '#FFF8DC' }} sx={{ fontWeight: 'bold' }} >
              {
                language === 'english' ?
                  <>
                    Serverless architecture and Google Maps API
                    <br />
                  </> :
                  <>
                    Arquitectura serverless y Google Maps API
                  </>
              }
            </Typography>
           
          </Paper>
          </animated.div>
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'} >
        <Grid item xs={1} >
        <animated.div style={fadeProps4}>

          <Button onClick={handleClick}>
            <PlayCircleIcon style={{ fontSize: '10vh', color: 'white' }} ></PlayCircleIcon>
          </Button>
          </animated.div>
        </Grid>
      </Grid>

    </Grid>

  )
}
