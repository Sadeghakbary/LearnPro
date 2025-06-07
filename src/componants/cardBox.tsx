import { useEffect, useRef, useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { translate } from '@/localization'

export default function CardBox() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState(1)
  const [isRTL, setIsRTL] = useState(false)

  const cardWidth = 300
  const cardGap = 16

  // تشخیص جهت صفحه (RTL یا LTR)
  useEffect(() => {
    const dir =
      document.documentElement.getAttribute('dir') || document.body.getAttribute('dir') || 'ltr'
    setIsRTL(dir.toLowerCase() === 'rtl')
  }, [])

  // تعیین تعداد کارت‌های قابل نمایش داینامیک
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const cardsThatFit = Math.floor(containerWidth / (cardWidth + cardGap))
      setVisibleCards(cardsThatFit || 1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // اسکرول دستی
  const handleScroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const offset = (cardWidth + cardGap) * visibleCards
    const scrollDir = isRTL
      ? dir === 'left'
        ? offset
        : -offset
      : dir === 'left'
        ? -offset
        : offset
    scrollRef.current.scrollBy({ left: scrollDir, behavior: 'smooth' })
  }

  // اسکرول خودکار هر ۴ ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return
      const container = scrollRef.current
      const scrollAmount = (cardWidth + cardGap) * visibleCards
      const maxScroll = container.scrollWidth - container.clientWidth

      // مقدار اسکرول فعلی با توجه به جهت صفحه
      const currentScroll = isRTL ? maxScroll - container.scrollLeft : container.scrollLeft

      if (currentScroll + scrollAmount >= maxScroll) {
        // برگشت به ابتدا (ابتدای ریل در RTL و LTR فرق داره)
        container.scrollTo({ left: isRTL ? maxScroll : 0, behavior: 'smooth' })
      } else {
        // اسکرول به جلو یا عقب
        container.scrollBy({
          left: isRTL ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [visibleCards, isRTL])

  return (
    <>
      <Typography sx={{ mt: 8, ml: 5, fontWeight: 'bold', fontSize: '1.5rem' }}>
        {translate.cardBox.Courses}
      </Typography>

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          mt: 2,
          px: 2,
          gap: 1,
          direction: isRTL ? 'rtl' : 'ltr', // مهم برای RTL
        }}
      >
        {/* دکمه چپ */}
        <IconButton onClick={() => handleScroll('left')} aria-label='scroll left'>
          <ChevronLeft />
        </IconButton>

        {/* ریل کارت‌ها */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            gap: `${cardGap}px`,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            flex: 1,
          }}
        >
          {translate.cardBox.cardData.map((card) => (
            <Card
              key={card.id}
              sx={{
                minWidth: `${cardWidth}px`,
                flex: '0 0 auto',
              }}
            >
              <CardMedia component='img' height='140' image={card.img} alt={card.title} />
              <CardContent>
                <Typography gutterBottom variant='h6'>
                  {card.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* دکمه راست */}
        <IconButton onClick={() => handleScroll('right')} aria-label='scroll right'>
          <ChevronRight />
        </IconButton>
      </Box>
    </>
  )
}
