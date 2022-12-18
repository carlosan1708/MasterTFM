import { Grid, Typography } from '@mui/material';

const iframeClassification = '<iframe src="https://wandb.ai/carlosan1708/Classification-TFM/reports/Classification-Model-Costa-Rica-Solar-Panel--VmlldzozMTcyNDI2" style="border:none;height:1024px;width:100%"></iframe>'; 
const iframeSegmentation = '<iframe src="https://wandb.ai/carlosan1708/Segmentation-TFM/reports/Summary-Solar-Panel-Segmentation--VmlldzoyOTk3NTk0" style="border:none;height:1024px;width:100%"></iframe>'; 

function Iframe(props: { iframe: string; }) {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}

const Info = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
    <Typography>Classification</Typography>
    <Iframe iframe={iframeClassification} />
    </Grid>
    <Grid item xs={12} sm={6}>
    <Typography>Segmentation</Typography>
    <Iframe iframe={iframeSegmentation} />
    </Grid>
    </Grid>
  )
}

export default Info