import { Typography } from '@mui/material'
import React from 'react'

export const MoreInfo = () => {
  return (
    <>
    <Typography fontSize={{
          lg: 20,
          md: 10,
          sm: 7,
          xs: 5
      }}>
          By knowing how many solar panels exist in a region ,
          we can for example predict the quantity of solar energy being generated or get to know how much is the penetration of this type of green energy in Costa Rica and collaborate with studies that
          are focused on this kind of ecological initiatives.
          <br />
          <br />
          Costa Rica was selected as the area of study for multiple reasons, it's one of the countries in the world that generates most of its energy using renewable  sources and it has great solar potential as shown in studies made by public institutions.
     
              <br />
              <br />
              Notes:
              <br />
              Note 1: So far and because of the scope the prediction requires manual intervention of a user (by clicking the region),
              but it's quite close to being adjusted to be automated to detect solar panels in multiple "zones".
              <br />
              Note 2: The following application has been created as part of a final project for a Master Degree in Computer Science, from Universitat Oberta de Catalunya.<br />
              <br />
              </Typography></>
  )
}
