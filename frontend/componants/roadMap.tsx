import { translate } from '@/localization';
import { Box, Typography, Card, CardContent, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@/redux/store';
import { selectTheme } from '@/redux/slices/themeSlice';
import { memo } from 'react';


interface RoadMapStep {
  title: string;
  description: string;
}

const getColorByIndex = (index: number, isLight: boolean): string => {
  const lightColors = [
    '#E3F2FD', // Light blue
    '#BBDEFB', // Lighter blue
    '#90CAF9', // Light blue medium
    '#64B5F6', // Blue
    '#42A5F5', // Medium blue
    '#2196F3', // Darker blue
    '#E1F5FE', // Very light cyan
    '#F8F9FF', // White with blue tint
  ];
  const darkColors = [
    '#0d1b2a', // Dark blue
    '#1b263b', // Dark blue-gray
    '#415a77', // Medium blue-gray
    '#778da9', // Light blue-gray
    '#c9daea', // Very light blue
    '#e0e1dd', // Light gray
    '#a5b3c3', // Medium gray-blue
    '#2f3e52', // Dark gray-blue
  ];
  const colors = isLight ? lightColors : darkColors;
  return colors[index % colors.length];
};

const RoadMap = () => {
  const theme = useTheme();
  const { mode } = useAppSelector(selectTheme);
  const isLight = mode === 'light';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const gridColumns = isMobile ? 1 : isTablet ? 2 : 4;
  const steps: RoadMapStep[] = translate.roadMap.steps;

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          display: 'grid',
          p: 5,
          fontVariant: 'full-width',
          textAlign: 'center',
        }}
      >
        {translate.roadMap.title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {steps.map((step, index) => {
          const bgColor = getColorByIndex(index, isLight);
          const textColor = theme.palette.getContrastText(bgColor);

          return (
            <Card
              key={index}
              sx={{
                width: { xs: '100%', sm: 300, md: 350 },
                height: 130,
                bgcolor: bgColor,
                color: textColor,
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 5,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold" fontSize={14}>
                  {step.title}
                </Typography>
                <Typography variant="caption">{step.description}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default memo(RoadMap);