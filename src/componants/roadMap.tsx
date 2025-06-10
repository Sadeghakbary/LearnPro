import { translate } from '@/localization'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function RoadMap() {
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
    '#0D47A1',
    '#FFA000',
    '#2E7D32',
    '#C2185B',
    '#4527A0',
    '#F9A825',
    '#00796B',
    '#B71C1C',
  ]
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'
  const colors = isLight ? lightColors : darkColors

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }} color="secondary">
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
          const textColor = isLight ? 'text.secondary' : '#f1f1f1'
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
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {step.title}
                </Typography>
                <Typography variant="body2">
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}
