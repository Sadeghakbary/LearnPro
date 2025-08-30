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
            {Object.entries(translate.footer.names).map(([key, name]) => (
              <Typography
                key={key}
                component="a"
                href={`/courses/${key.toLowerCase()}`} // لینک فرضی برای هر دوره
                variant="body2"
                sx={{
                  display: "block",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { color: "#60a5fa" },
                }}
              >
                {name}
              </Typography>
            ))}
          </Grid>

          {/* صفحات */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              صفحات
            </Typography>
            {[
              { label: "درباره ما", href: "/about" },
              { label: "تماس با ما", href: "/contact" },
              { label: "سوالات متداول", href: "/faq" },
            ].map((page, index) => (
              <Typography
                key={index}
                component="a"
                href={page.href}
                variant="body2"
                sx={{
                  display: "block",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { color: "#60a5fa" },
                }}
              >
                {page.label}
              </Typography>
            ))}
          </Grid>

          {/* شبکه‌های اجتماعی */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              ما را دنبال کنید
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Telegram />
              </IconButton>
              <IconButton
                component="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <YouTube />
              </IconButton>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Facebook />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* کپی‌رایت */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, opacity: 0.7 }}
        >
          © {new Date().getFullYear()} Learn Pro - تمامی حقوق محفوظ است.
        </Typography>
      </Container>
    </Box>
  );
}
