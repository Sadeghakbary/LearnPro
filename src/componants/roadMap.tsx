import { translate } from '@/localization'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAppSelector } from '@/redux/store'
import { selectTheme } from '@/redux/slices/themeSlice'

export default function RoadMap() {
  const theme = useTheme()
  const steps = translate.roadMap.steps
  const { mode } = useAppSelector(selectTheme)

  const lightColors = [
    '#E3F2FD',
    '#FFECB3',
    '#C8E6C9',
    '#F8BBD0',
    '#D1C4E9',
    '#FFF9C4',
    '#B2EBF2',
    '#FFCDD2',
  ]

  const darkColors = [
    '#0D1B2A',
    '#1B263B',
    '#415A77',
    '#778DA9',
    '#E0E1DD',
    '#FFFFFF',
    '#A5B3C3',
    '#2F3E52',
  ]

  const isLight = mode === 'light'
  const colors = isLight ? lightColors : darkColors

  return (
    <>
      <Typography sx={{display : 'grid' , p : 5 ,fontVariant : 'full-width'}}>{translate.roadMap.title}</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        {steps.slice(0, 4).map((step, index) => {
          const bgColor = colors[index % colors.length]
          const textColor = theme.palette.getContrastText(bgColor)

          return (
            <Card
              key={index}
              sx={{
                width: 300,
                height: 130,
                bgcolor: bgColor,
                color: textColor,
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 55,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Typography variant='subtitle2' fontWeight='bold' fontSize={14}>
                  {step.title}
                </Typography>
                <Typography variant='caption'>{step.description}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </>
  )
}
