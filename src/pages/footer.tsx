// src/components/Footer.tsx
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, Telegram, YouTube } from "@mui/icons-material";
import Logo from "./navbar/Logo";
import { translate } from "@/localization";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1f2937", color: "#fff", mt: 4, py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          {/* لوگو و توضیحات */}
          <Grid item xs={12} md={4}>
            <Logo />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {translate.footer.detailsFoot}
            </Typography>
          </Grid>

          {/* دوره‌ها */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {translate.footer.courses}
            </Typography>
            {Object.values(translate.footer.names).map((name, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ cursor: "pointer", "&:hover": { color: "#60a5fa" } }}
              >
                {name}
              </Typography>
            ))}
          </Grid>

          {/* صفحات */}
          <Grid item xs={6} md={2}>
            {Object.values(translate.footer.Connectiondetails).map(
              (page, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ cursor: "pointer", "&:hover": { color: "#60a5fa" } }}
                >
                  {page}
                </Typography>
              )
            )}
          </Grid>

          {/* شبکه‌های اجتماعی */}
          <Grid item xs={12} md={4}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              {translate.footer.SocailPage}
            </Typography>
            <Box>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <Telegram />
              </IconButton>
              <IconButton color="inherit">
                <YouTube />
              </IconButton>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
