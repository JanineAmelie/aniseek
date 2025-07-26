"use client";

import React from "react";
import { Box, Container, Typography, Fade } from "@mui/material";
import styled from "styled-components";
import { text } from "@/constants/text";

const StyledHeroSection = styled(Box)`
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(236, 72, 153, 0.1) 50%,
    rgba(59, 130, 246, 0.1) 100%
  );
  min-height: 60vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 20%,
        rgba(99, 102, 241, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(236, 72, 153, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 60%,
        rgba(59, 130, 246, 0.2) 0%,
        transparent 50%
      );
    z-index: 0;
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  text-align: center;
`;

export const HeroSection = () => {
  return (
    <StyledHeroSection>
      <Container maxWidth="lg">
        <HeroContent>
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 800,
                  background:
                    "linear-gradient(45deg, #6366f1, #ec4899, #06b6d4)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                {text.hero.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.2rem", md: "1.8rem" },
                  color: "text.secondary",
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                {text.hero.subtitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  color: "text.secondary",
                  mb: 6,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                {text.hero.description}
              </Typography>
            </Box>
          </Fade>
        </HeroContent>
      </Container>
    </StyledHeroSection>
  );
};
