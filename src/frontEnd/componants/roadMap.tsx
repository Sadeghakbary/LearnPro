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
    '#E3F2FD',
    '#FFECB3',
    '#C8E6C9',
    '#F8BBD0',
    '#D1C4E9',
    '#FFF9C4',
    '#B2EBF2',
    '#FFCDD2',
  ];
  const darkColors = [
    '#0D1B2A',
    '#1B263B',
    '#415A77',
    '#778DA9',
    '#E0E1DD',
    '#FFFFFF',
    '#A5B3C3',
    '#2F3E52',
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