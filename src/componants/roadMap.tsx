import { translate } from '@/localization'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function RoadMap() {
  const theme = useTheme()
  const steps = translate.roadMap.steps

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

  const colors = theme.palette.mode == 'light' ? lightColors ? darkColors : lightColors :darkColors
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant='h6' sx={{ mb: 2 }} color='secondary'>
        {translate.roadMap.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 4,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {steps.map((step, index) => {
          const bgColor = colors[index % colors.length]
          const textColor = theme.palette.getContrastText(bgColor)

          return (
            <Card
              key={step.id}
              sx={{
                minWidth: 200,
                flexShrink: 0,
                bgcolor: bgColor,
                borderLeft: `5px solid ${bgColor}`,
                boxShadow: 3,
                color: textColor,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
                display : 'grid' ,
                justifyContent : 'center' ,
                
              }}
            >
              <CardContent>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {step.title}
                </Typography>
                <Typography variant='body2'>{step.description}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}
