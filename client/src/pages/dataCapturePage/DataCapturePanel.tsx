import { Button, Divider, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, useContext } from 'react'
import CustomGoogleMap from '../../component/CustomGoogleMap'
import { LanguageContext } from '../MainMenu';
import useCustomGoogleMap from './logic/useCustomGoogleMap';

const DataCapturePanel = () => {
  const [nameSuffix, setNameSuffix] = useState('' as string);
  const [imageScale, setImageScale] = useState('19' as string);
  const { handleOnLoad, storeImage, setZoom } = useCustomGoogleMap({ nameSuffix, imageScale })
  const theme = useTheme();
  const matchesUp = useMediaQuery(theme.breakpoints.up('md'));
  const language = useContext(LanguageContext);

  return (
    <Grid container spacing={2} >
       <Grid container item xs={12} justifyContent={'center'} style={{ marginTop: '3rem' }}>
       <Grid item xs={12} sm={3}>
          <Paper>
            <Typography variant="h5" textAlign={'center'}>
              Navigate and download, to create a data set of images from Google
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {matchesUp ?
        <Grid item xs={2}>
          <Grid container >

            <Paper style={{ padding: '1rem', marginTop: '2vh' }}>
              <Grid item xs={10}>
                <Typography variant="h5">
                  Instructions
                </Typography>
                <Divider style={{ marginBottom: '2rem' }} />
              </Grid>
              <Grid item xs={10}>
                <Typography variant='h6' style={{ color: '#0c262b' }}>
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
                <Typography >
                  {
                    language === 'english' ?
                      <>
                        The following tool will help you capture satellite images using Google API, with very basic steps:
                      </> : <>
                        La siguiente herramienta te ayudará a capturar imágenes satelitales usando la API de Google, con pasos muy básicos:
                      </>
                  }

                </Typography>
                <Typography component={'span'} >
                  {
                    language === 'english' ?
                      <>
                        <ul>
                          <li>Left Click, to return to the prediction zoom scale</li>
                          <li>Right Click to Save the image.</li>
                        </ul>
                      </> : <>
                        <ul>
                          <li>Haga clic con el botón izquierdo para volver a la escala de zoom de predicción</li>
                          <li>Haga clic derecho para guardar la imagen.</li>
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
                        Preferences (Optional)
                      </> : <>
                        Preferencias (Opcional)
                      </>
                  }
                </Typography>
                <Divider style={{ marginBottom: '2rem' }} />
              </Grid>

              <Grid container item xs={10} >
                <TextField value={nameSuffix} id="outlined-basic" label="Image suffix" variant="outlined" onChange={(e) => setNameSuffix(e.target.value)} />
                <Typography variant="subtitle2">
                  {
                    language === 'english' ?
                      <>
                        Note: By default, images will always have the coordinates as part of the name
                      </> : <>
                        Nota: Por defecto, las imágenes siempre tendrán las coordenadas como parte del nombre
                      </>
                  }
                </Typography>
              </Grid>
              <Grid container item xs={10} style={{ marginTop: '2rem' }}>
                <TextField value={imageScale} type={'number'} id="outlined-basic" label="Zoom Scale" variant="outlined" onChange={(e) => setImageScale(e.target.value)} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        : <>
        <Grid item xs={12} sm={3}>
          <Paper>
          <Typography variant="subtitle2" style={{ marginLeft: '1rem' }}>
            {
              language === 'english' ?
                <>
                  This section is intented to be use in a computer.
                </> : <>
                  Esta sección está diseñada para ser utilizada en una computadora.
                </>
            }
          </Typography>
          </Paper>
          </Grid>
        </>}
      {matchesUp ?
        <Grid item xs={10} style={{ marginTop: '2vh'}}>
          <CustomGoogleMap
            handleOnLoad={handleOnLoad}
            clickAction={setZoom}
            rightClickAction={storeImage}
            allActions={true}
            imageScale={imageScale} />
          <Button style={{ marginTop: '2rem', marginRight: '1rem' }} size="large" color="info" variant={'contained'} onClick={setZoom}>Default Zoom</Button>
          <Button style={{ marginTop: '2rem' }} size="large" variant={'contained'} color="success" onClick={storeImage}>Download Image</Button>
        </Grid> :
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <CustomGoogleMap
              handleOnLoad={handleOnLoad}
              clickAction={setZoom}
              rightClickAction={storeImage}
              allActions={true}
              imageScale={imageScale} />
          </Grid>
          <Grid container item xs={12} justifyContent="flex-start">
            <Grid item xs={6}>
              <Button style={{ marginTop: '2rem', marginRight: '1rem' }} size="large" color="info" variant={'contained'} onClick={setZoom}>Zoom</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{ marginTop: '2rem' }} size="large" variant={'contained'} color="success" onClick={storeImage}>Save Image</Button>
            </Grid>
          </Grid>
        </Grid>
      }

    </Grid>

  )
}

export default DataCapturePanel