import { Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomGoogleMap from './CustomGoogleMap'

const DataCapturePanel = () => {
  const [nameSuffix, setNameSuffix] = useState('' as string);
  const [imageScale, setImageScale] = useState('19' as string);
  const [apiKey, setApiKey] = useState('AIzaSyDC9oyvmBxke35n88ePtQeotnzC3wyQvhY' as string);

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h3">
              Instructions
            </Typography>
            <Divider style={{marginBottom:'2rem'}}/>
          </Grid>
          <Grid item xs={10}>
            <Typography>
              The following tool will help you capture satellital images using Google API, with very basic steps:
            </Typography>
            <Typography component={'span'} >
              <ul>
                <li>Left Click to Zoom as the image that is going to get capture.</li>
                <li>Right Click to Save the image.</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={10}style={{marginTop:'2rem'}}>
          <Typography variant="h5">
              Preferences (Optional)
            </Typography>
            <Divider style={{marginBottom:'2rem'}}/>
          </Grid>
          <Grid container item xs={10} >
            <TextField value={apiKey} id="outlined-basic" label="API Key" variant="outlined" onChange={(e) => setApiKey(e.target.value)}/>
            <Typography variant="subtitle2">
               Important!: To download images you will need a Google API key with restriction enable for Google Map Static, this key will not be stored or sent to any database.
            </Typography>
          </Grid>
          <Grid container item xs={10} >
            <TextField value={nameSuffix} id="outlined-basic" label="Image suffix" variant="outlined" onChange={(e) => setNameSuffix(e.target.value)}/>
            <Typography variant="subtitle2">
               Note: By default, images will always have the coordinates at the beginning.
            </Typography>
          </Grid>
          <Grid container item xs={10} style={{marginTop: '2rem'}}>
            <TextField value={imageScale} type={'number'} id="outlined-basic" label="Zoom Scale" variant="outlined" onChange={(e) => setImageScale(e.target.value)}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <CustomGoogleMap nameSuffix={nameSuffix} imageScale={imageScale} apiKey={apiKey}/>
      </Grid>
    </Grid>

  )
}

export default DataCapturePanel