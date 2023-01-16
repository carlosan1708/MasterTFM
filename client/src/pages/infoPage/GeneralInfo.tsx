import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


export const GeneralInfo = (props: { language: string }) => {
  const { language } = props
  return (
    <Grid container item xs={12} alignItems={"center"} justifyContent={'center'}>
      <Grid container item xs={12} >
        <Card>
          <CardContent>
            <Typography fontSize={{
              lg: 30,
              md: 20,
              sm: 15,
              xs: 20
            }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
              {
                language === 'english' ?
                  <>
                    UOC - Final Master Degree work.  <br /> Date: January 2023 <br />
                  </> :
                  <>
                    UOC - Trabajo final de Master.  <br /> Fecha: Enero 2023 <br />
                  </>}
            </Typography>
            <Typography fontSize={{
              xs: 20
            }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold', marginTop: 'rem' }} >
              {
                language === 'english' ?
                  <>
                    <br />
                    The work was based on the development of a supervised machine learning tool, which allows the detection of solar panels using satellite images of Costa Rica, Central America. <br />
                    The intention of this tool is to provide an instrument that, through the detection of solar panels, enables studies in this area, where these, for example, have objectives such as: knowing the adaptation of solar panels in the aforementioned country or calculating the amount of energy produced using Mercator projections, among others.
                    To achieve this work, a data set was created and manually processed, differentiating the solar panels from different images that contained them. Likewise, images were captured with and without solar panels, this with the aim of allowing the generation of machine learning models, one of a technique called segmentation and another of classification to achieve the main functionality of the application, which is the detection. <br />
                    At the level of results, quite good metrics were achieved at the classification level, therefore the application is capable of discerning whether there is a solar role in a geographical area, and in terms of showing exactly where the solar panel is located, they were achieved. Acceptable metrics for the scope of the project, without being excellent, given that the data set used was small.<br />
                    Once with the generated models, a software architecture was implemented that would allow the detection of solar panels through an interactive map, an architecture based on Google Cloud Platform and that allows it to be easily adjusted to different needs.<br />
                  </> :
                  <>
                    <br />
                    El trabajo se basó en la elaboración de una herramienta de aprendizaje automático de tipo supervisado, que permite la detección de paneles solares utilizando imágenes satelitales de Costa Rica, Centroamérica. <br />
                    La intención de esta herramienta es la de facilitar un instrumento que, a través de la detección de paneles solares, posibilite estudios de esta área, donde estos por ejemplo tengan objetivos como: conocer la adaptación de paneles solares en el país ya mencionado o calcular la cantidad de energía producida utilizando proyecciones de Mercator, entre otros.
                    Para lograr este trabajo, se creó un conjunto de datos y se procesó el mismo de forma manual, diferenciando los paneles solares de diferentes imágenes que los contuvieran. Así mismo se capturaron imágenes con y sin paneles solares,
                    esto con el objetivo de permitir la generación de modelos de machine learning, uno de una técnica llamada segmentación y otro de clasificación a fin de lograr acabo la funcionalidad principal de la aplicación, que es la detección.<br />
                    A nivel de resultados, se lograron métricas bastante buenas a nivel de clasificación, por ende, la aplicación es capaz de discernir si hay o no un papel solar en un área geográfica, y en cuanto a mostrar exactamente donde se encuentra el panel solar, se lograron métricas aceptables para el alcance del proyecto, sin estar ser excelentes, dado que el conjunto de datos con el que se conto fue pequeño.<br />
                    Una vez con los modelos generados se implementó una arquitectura software que permitiese a través de un mapa interactivo la detección de paneles solares, arquitectura basada en Google Cloud Platform y que permite fácilmente ajustarse a diferentes necesidades.<br />
                  </>
              }
            </Typography>
          </CardContent>
        </Card>

      </Grid>
      <Grid container sx={{ marginTop: '3rem' }} spacing={2}  >
        <Grid container item sm={4} xs={12} >
          <Card sx={{ display: 'flex', width: '100%', height: '20vh' }}>
            <Grid item xs={6}>
              <CardContent>
                <Typography fontSize={{
                  lg: 30,
                  md: 20,
                  sm: 15,
                  xs: 20
                }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
                  {
                    language === 'english' ?
                      <>
                        University</> :
                      <>
                        Universidad</>
                  }
                </Typography>
                <Typography fontSize={{
                  lg: 20,
                  md: 10,
                  sm: 7,
                  xs: 5
                }} sx={{color: "black"}}>
                  Universitat Oberta de Catalunya
                </Typography>

              </CardContent>

              <CardActions>
                <Button variant={'contained'} target="_blank" href="https://www.uoc.edu/portal/es/index.html">Website</Button>
              </CardActions>
            </Grid>
            <Grid item xs={6}>
              <CardMedia
                sx={{ height: '15rem', objectFit: "contain" }}
                image={'https://www.uoc.edu/portal/system/modules/edu.uoc.presentations/resources/img/branding/logo-uoc-default.png'}
                title="UOC logo"
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={1} xs={12}>

        </Grid>
        <Grid container item sm={3} xs={12} direction="column">
        <Grid item xs={3} >
              <CardContent >
                <Typography fontSize={{
                  lg: 30,
                  md: 20,
                  sm: 15,
                  xs: 20
                }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
                  {
                    language === 'english' ?
                      <>
                        Credits</> :
                      <>
                        Creditos</>
                  }
                </Typography>
                <br></br>
                <Typography fontSize={{
                  lg: 20,
                  md: 10,
                  sm: 7,
                  xs: 5
                }} sx={{color: "black"}}>
                   {
                    language === 'english' ?
                      <>
                      Guidance: Dr. Carlos Gaitan Poyatos, Spain </> :
                      <>
                      Direccion: Dr. Carlos Gaitan Poyatos, Spain </>
                  }
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={3} >
              <CardContent >
                <Typography fontSize={{
                  lg: 30,
                  md: 20,
                  sm: 15,
                  xs: 20
                }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
                  {
                    language === 'english' ?
                      <>
                        Source Code</> :
                      <>
                        Codigo Fuente</>
                  }
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant={'contained'} target="_blank" href="https://github.com/carlosan1708/MasterTFM">Github Repository</Button>
              </CardActions>
            </Grid>
        
        </Grid>
        <Grid container item sm={4} xs={12}>
          <Card sx={{ display: 'flex', width: '100%', height: '25vh' }}>
            <Grid item xs={6}>
              <CardContent >
                <Typography fontSize={{
                  lg: 30,
                  md: 20,
                  sm: 15,
                  xs: 20
                }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
                  {
                    language === 'english' ?
                      <>
                        Author</> :
                      <>
                        Autor</>
                  }
                </Typography>
                <Typography fontSize={{
                  lg: 20,
                  md: 10,
                  sm: 7,
                  xs: 5
                }} sx={{color: "black"}}>
                   Carlos Andres Rodriguez Trigueros
                   <br></br>
                  Sr Full Stack Developer
                  <br></br>
                   Costa Rica
                </Typography>

              </CardContent>
              <CardActions>
                <Button target="_blank" variant={'contained'} href="https://github.com/carlosan1708">Github</Button>
                <Button target="_blank" variant={'contained'} href="https://www.linkedin.com/in/carlosan1708/">LinkedIn</Button>
              </CardActions>
            </Grid>
            <Grid item xs={6}>
              <CardMedia
                sx={{ height: '15rem' }}
                image="https://avatars.githubusercontent.com/u/15173842?s=400&u=000a7b4559a714fb1767381da89e8f4855e23b8c&v=4"
                title="green iguana"
              />


            </Grid>
          </Card>

        </Grid>
      </Grid>
    </Grid>
  );
}