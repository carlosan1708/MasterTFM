import { Grid, Typography } from "@mui/material"

const iframeClassification = '<iframe src="https://wandb.ai/carlosan1708/Classification-TFM/reports/Classification-Model-Costa-Rica-Solar-Panel--VmlldzozMTcyNDI2" style="border:none;height:1024px;width:100%"></iframe>';
const iframeSegmentation = '<iframe src="https://wandb.ai/carlosan1708/Segmentation-TFM/reports/Summary-Solar-Panel-Segmentation--VmlldzoyOTk3NTk0" style="border:none;height:1024px;width:100%"></iframe>';

function Iframe(props: { iframe: string; }) {
    return (<div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }} />);
}

export const ResultsSection = (props: { language: string }) => {
    const { language } = props
    return (
        <Grid container item xs={12}>
            <Grid item xs={12} sx={{ marginBottom: '2rem' }}>
                <Typography fontSize={{
                    lg: 30,
                    md: 20,
                    sm: 15,
                    xs: 20
                }}  style={{ color: '#476930' }} sx={{ fontWeight: 'bold' }} >
                    {
                        language === 'english' ?
                            <>
                                The following is a summary of the experiments performed to reach the machine learning model</> :
                            <>
                                El siguiente es un resumen de los experimentos realizados para llegar al modelo de aprendizaje automático</>
                    }
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} >
                <Typography fontSize={{
                    lg: 30,
                    md: 15,
                    sm: 10,
                    xs: 10
                }}  style={{ color: '#476930' }} sx={{ fontWeight: 'bold' }} >
                    {
                        language === 'english' ?
                            <>
                                Classification</> :
                            <>
                                Clasificacion</>
                    }
                </Typography>
                <Iframe iframe={iframeClassification} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography fontSize={{
                    lg: 30,
                    md: 15,
                    sm: 10,
                    xs: 10
                }}  style={{ color: '#476930' }} sx={{ fontWeight: 'bold' }} >
                    {
                        language === 'english' ?
                            <>
                                Semantic Segmentation</> :
                            <>
                                Segmentacion Semantica</>
                    }
                </Typography>
                <Iframe iframe={iframeSegmentation} />
            </Grid>
        </Grid>
    )
}