import { Button, Divider, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, useContext } from 'react'
import CustomGoogleMap from '../../component/CustomGoogleMap'
import { LanguageContext } from '../MainMenu';
import useCustomGoogleMap from './logic/useCustomGoogleMap';

const Prediction = () => {
  const [imageScale, setImageScale] = useState('19' as string);
  const { handleOnLoad, generatePrediction, setZoom, segmentationImage, classificationResult } = useCustomGoogleMap({ imageScale })
  const theme = useTheme();
  const matchesUp = useMediaQuery(theme.breakpoints.up('md'));
  const language = useContext(LanguageContext);

  return (
    <Grid container spacing={1} >
      <Grid container item xs={12} justifyContent={'center'} style={{ marginTop: '3rem' }}>
        <Grid item xs={3}>
          <Paper>
            <Typography variant="h5" textAlign={'center'}>
              Navigate, click predict and AI system will detect the solar panels in the image.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {matchesUp ?
        <Grid item xs={2}>
          <Paper style={{ padding: '1rem', marginTop: '2vh' }}>
            <Grid container>

              <Grid item xs={10}>
                <Typography variant="h5">
                  Instructions
                </Typography>
                <Divider style={{ marginBottom: '2rem' }} />
              </Grid>
              <Grid item xs={10}>
                <Typography variant='h6' style={{ color: '#476930' }}>
                  {
                    language === 'english' ?
                      <>
                        Important! You can move the map, move the map by holding down the left click and drag the map to a desire location
                      </> : <>
                        ¡Importante! Puedes mover el mapa, mueva el mapa manteniendo presionado el botón izquierdo y arrastre el mapa a la ubicación deseada
                      </>
                  }
                </Typography>
                <br />
                <Typography variant='body1' style={{ color: '#476930' }}>
                  {
                    language === 'english' ?
                      <>
                        If the area doesn't contain a solar panel, the prediction is not going to execute
                      </> : <>
                        Si el área no contiene un panel solar, la predicción no se ejecutará.
                      </>
                  }
                </Typography>
                <br />
                <Typography>
                  {
                    language === 'english' ?
                      <>
                        Instructions
                      </> : <>
                        Instrucciones
                      </>
                  }
                </Typography>
                <Typography component={'span'} >
                  {
                    language === 'english' ?
                      <>
                        <ul>
                          <li>Left Click, to return to the prediction zoom scale</li>
                          <li>Right Click, to start a prediction based on your map view.</li>
                        </ul>
                      </> : <>
                        <ul>
                          <li>Haga clic con el botón izquierdo para volver a la escala de zoom de predicción</li>
                          <li>Haga clic derecho para iniciar una predicción basada en su vista de mapa.</li>
                        </ul>
                      </>
                  }

                </Typography>
              </Grid>
              <Grid item xs={10} style={{ marginTop: '2rem' }}>
                <Typography variant="h5">
                  {
                    language === 'english' ?
                      <>
                        Important
                      </> : <>
                        Importante
                      </>
                  }
                </Typography>
                <Divider style={{ marginBottom: '2rem' }} />
              </Grid>
              <Grid container item xs={10} >
                {
                  language === 'english' ?
                    <>
                      Zoom Scale is disabled, prediction is works only with 19 scale
                    </> : <>
                      Escala de zoom esta deshabilitada, la prediccion solo funciona a escala de 19.
                    </>
                }
              </Grid>
              <Grid container item xs={10} style={{ marginTop: '2rem' }}>
                <TextField disabled value={imageScale} type={'number'} id="outlined-basic" label="Zoom Scale" variant="outlined" onChange={(e) => setImageScale(e.target.value)} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        :
        <Paper style={{ padding: '1rem', marginTop: '2vh' }}>
          <Typography variant="subtitle2" style={{ marginLeft: '1rem' }}>
            Use PC to get more instructions, you can move the map and execute new predictions, if the area doesn't contain a solar panel, the prediction is not going to execute
          </Typography>
        </Paper>
      }
      <Grid container item xs={10}>
        <Grid container item xs={12} sm={5}>
          <Grid item xs={12}>
            <CustomGoogleMap
              handleOnLoad={handleOnLoad}
              clickAction={setZoom}
              rightClickAction={generatePrediction}
              allActions={false}
              imageScale={imageScale} />
          </Grid>
          <Grid container item xs={12} sm={4} >
            <Grid item xs={6} >
              <Button style={{ marginTop: '2rem', marginRight: '1rem' }} size="large" color="info" variant={'contained'} onClick={setZoom}>Zoom</Button>
            </Grid>
            <Grid item xs={6} >
              <Button style={{ marginTop: '2rem' }} size="large" variant={'contained'} color="success" onClick={generatePrediction}>Predict</Button>
            </Grid>
          </Grid>
        </Grid>
        {matchesUp &&
          <Grid item xs={1}>
          </Grid>}
        <Grid item xs={12} sm={5}>
          {classificationResult && (classificationResult === '1' ? <>Solar Panel detected</> : <>Solar Panel not detected</>)}

          {matchesUp ?
            <>    {segmentationImage &&
              <img style={{ width: '100%', height: '70%' }} src={`data:image/jpeg;base64,${segmentationImage}`} alt="predictionImage" />
            } </>
            :
            <>
              {segmentationImage &&
                <img style={{ marginTop: '2rem', width: '80%', height: '80%' }} src={`data:image/jpeg;base64,${segmentationImage}`} alt="predictionImage" />
              }
            </>
          }
        </Grid>
      </Grid>

    </Grid>

  )
}

export default Prediction