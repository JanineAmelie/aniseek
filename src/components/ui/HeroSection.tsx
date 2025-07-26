"use client";

import React from "react";
import { Box, Container, Fade } from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import { text } from "@/constants/text";

export function HeroSection() {
  return (
    <StyledHeroSection>
      <FullWidthImageContainer>
        <Fade in timeout={1200}>
          <Image
            src="/banner.jpg"
            alt="Anime Banner"
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
        </Fade>
      </FullWidthImageContainer>
      <HeroOverlay>
        <Container maxWidth="lg">
          <HeroContent>
            <Fade in timeout={1000}>
              <Box>
                <HeroTitle>{text.hero.title}</HeroTitle>
                <HeroSubtitle>{text.hero.subtitle}</HeroSubtitle>
              </Box>
            </Fade>
          </HeroContent>
        </Container>
      </HeroOverlay>
    </StyledHeroSection>
  );
}

// Custom styled components
const HeroTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.palette.cuteColors.cream},
    ${(props) => props.theme.palette.cuteColors.pinkLight},
    ${(props) => props.theme.palette.cuteColors.purpleLight}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  margin: 0;
  text-align: center;
  text-shadow: 0 4px 8px ${(props) => props.theme.palette.cuteColors.softShadow};
  filter: drop-shadow(
    0 2px 4px ${(props) => props.theme.palette.cuteColors.softShadow}
  );
`;

const HeroSubtitle = styled.h2`
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  color: ${(props) => props.theme.palette.cuteColors.cream};
  margin-bottom: 2rem;
  font-weight: 400;
  margin-top: 1rem;
  text-align: center;
  text-shadow: 0 2px 4px
    ${(props) => props.theme.palette.cuteColors.blackOverlay};
  opacity: 0.95;
`;

const StyledHeroSection = styled(Box)`
  min-height: 30vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const FullWidthImageContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const HeroOverlay = styled(Box)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.palette.cuteColors.blackOverlay} 0%,
    rgba(0, 0, 0, 0.4) 50%,
    ${(props) => props.theme.palette.cuteColors.blackOverlay} 100%
  );

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.palette.cuteColors.pinkOverlay} 0%,
      rgba(218, 112, 214, 0.2) 50%,
      rgba(255, 179, 230, 0.2) 100%
    );
    z-index: -1;
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
`;
