import { translate } from '@/localization'
import { Box, Typography, Card, CardContent } from '@mui/material'

export default function RoadMap() {
  const steps = translate?.roadMap?.steps ?? [];

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }} color="secondary">
        {translate?.roadMap?.title || 'Road Map'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 10,
          pb: 8,
        }}
      >
        {steps.length > 0 ? steps.map((step, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 200,
              flexShrink: 0,
              bgcolor: '#f5f5f5',
              borderLeft: '5px solid #2E9EFF',
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </CardContent>
          </Card>
        )) : (
          <Typography color="text.secondary">No roadmap steps available.</Typography>
        )}
      </Box>
    </Box>
  )
}
