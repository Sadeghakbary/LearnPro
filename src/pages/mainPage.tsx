import CardBox from '@/componants/cardBox'
import HomePage from '@/pages/HomePage'
import { Grid2 } from '@mui/material'

export default function MainPage() {
  return (
    <>
      <HomePage />
      <Grid2 display={'flex'}>
        <CardBox />
      </Grid2>
    </>
  )
}
