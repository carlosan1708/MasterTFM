import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from '../MainMenu';
import { GeneralInfo } from './GeneralInfo';
import { ResultsSection } from './ResultsSection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Info = () => {
  const language = useContext(LanguageContext);

  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontSize={{
            lg: 60,
            md: 20,
            sm: 15,
            xs: 20
          }} style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
            {
              language === 'english' ?
                <>
                  General Information</> :
                <>
                  Informacion General</>
            }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <GeneralInfo language={language as string}></GeneralInfo>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography fontSize={{
            lg: 60,
            md: 20,
            sm: 15,
            xs: 20
          }}  style={{ color: '#0c262b' }} sx={{ fontWeight: 'bold' }} >
            {
              language === 'english' ?
                <>
                  Experiments Summary</> :
                <>
                  Resumen de Experimentos</>
            }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ResultsSection language={language as string}></ResultsSection>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Info