import { Button, Divider, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import CustomGoogleMap from '../../component/CustomGoogleMap'
import useCustomGoogleMap from './logic/useCustomGoogleMap';

const DataCapturePanel = () => {
  const [nameSuffix, setNameSuffix] = useState('' as string);
  const [imageScale, setImageScale] = useState('19' as string);
  const { handleOnLoad, storeImage, setZoom } = useCustomGoogleMap({ nameSuffix, imageScale })
  const theme = useTheme();
  const matchesUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid container spacing={2} >
      {matchesUp ?
        <Grid item xs={2}>
          <Grid container >

            <Paper style={{ padding: '1rem' }}>
              <Grid item xs={10}>
                <Typography variant="h5">
                  Instructions
                </Typography>
                <Divider style={{ marginBottom: '2rem' }} />
              </Grid>
              <Grid item xs={10}>
                <Typography >
                  The following tool will help you capture satellital images using Google API, with very basic steps:
                </Typography>
                <Typography component={'span'} >
                  <ul>
                    <li>Left Click to Zoom as the image that is going to get capture.</li>
                    <li>Right Click to Save the image.</li>
                  </ul>
                </Typography>
              </Grid>
              <Grid item xs={10} style={{ marginTop: '2rem' }}>
                <Typography variant="h5">
                  Preferences (Optional)
                </Typography>
                <Divider style={{ marginBottom: '2rem' }} />
              </Grid>

              <Grid container item xs={10} >
                <TextField value={nameSuffix} id="outlined-basic" label="Image suffix" variant="outlined" onChange={(e) => setNameSuffix(e.target.value)} />
                <Typography variant="subtitle2">
                  Note: By default, images will always have the coordinates at the beginning.
                </Typography>
              </Grid>
              <Grid container item xs={10} style={{ marginTop: '2rem' }}>
                <TextField value={imageScale} type={'number'} id="outlined-basic" label="Zoom Scale" variant="outlined" onChange={(e) => setImageScale(e.target.value)} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        : <>
          <Typography variant="subtitle2" style={{ marginLeft: '1rem' }}>
            This section is intented for PC.
          </Typography>

        </>}
      {matchesUp ?
        <Grid item xs={10}>
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
          <Grid container item xs={12}>
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