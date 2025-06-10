import { translate } from '@/localization'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function RoadMap() {
  const theme = useTheme()
  const steps = translate.roadMap.steps

  const lightColors = [
    '#E3F2FD', // light blue
    '#FFECB3', // light yellow
    '#C8E6C9', // light green
    '#F8BBD0', // light pink
    '#D1C4E9', // light purple
    '#FFF9C4', // light lemon
    '#B2EBF2', // light cyan
    '#FFCDD2', // light red
  ]

  const darkColors = [
    '#0D47A1', // dark blue
    '#FFA000', // dark amber
    '#2E7D32', // dark green
    '#C2185B', // dark pink/red
    '#4527A0', // dark purple
    '#F9A825', // dark yellow
    '#00796B', // dark teal
    '#B71C1C', // dark red
  ]

  // انتخاب آرایه رنگ بر اساس حالت تم
  const colors = theme.palette.mode === 'light' ? lightColors : darkColors

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
          // رنگ پس‌زمینه کارت با چرخه در آرایه رنگ‌ها
          const bgColor = colors[index % colors.length]
          // رنگ متن متناسب با رنگ پس‌زمینه (برای خوانایی)
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
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {step.title}
                </Typography>
                <Typography variant="body2">{step.description}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}
