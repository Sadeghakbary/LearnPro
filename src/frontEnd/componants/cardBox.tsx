import { translate } from '@/localization';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardBox() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollAmount = 260;
  const cardData = translate.cardBox.cardData;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const changeHandler = (value: number) => {
    navigate(`/courses/${value}`);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', padding: 2 }}>
      <Typography variant="h6" mb={4} sx={{ color: 'text.secondary' }}>
        {translate.cardBox.courses}
      </Typography>
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 20,
          backgroundColor: 'background.paper',
          boxShadow: 1,
          '&:hover': { backgroundColor: 'grey.200' },
          mt: 10
        }}
        aria-label="Scroll Left"
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={scrollRight}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 20,
          backgroundColor: 'background.paper',
          boxShadow: 1,
          '&:hover': { backgroundColor: 'grey.200' },
          mt: 10
        }}
        aria-label="Scroll Right"
      >
        <ChevronRightIcon />
      </IconButton>
      <Box sx={{ overflow: 'initial' }}>
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 2,
            paddingX: 1,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingTop: 6,
          }}
        >
          {cardData.map((card) => (
            <Card
              key={card.id}
              onClick={() => changeHandler(card.id)}
              sx={{
                maxWidth: 350,
                minHeight: 300,
                flexShrink: 0,
                boxShadow: 3,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.05)', boxShadow: 20, transition: 'all 0.3s ease' },
                mt: 5
              }}
            >
              <Box sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden' }}>
                <CardMedia component="img" height="140" image={card.img} alt={card.title} />
              </Box>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}