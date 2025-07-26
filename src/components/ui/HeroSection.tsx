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
              objectPosition: "center 30%",
            }}
          />
        </Fade>
      </FullWidthImageContainer>
      <HeroOverlay>
        <Container maxWidth="lg">
          <HeroContent>
            <Fade in timeout={1000}>
              <TitleWrapper>
                <TopTitle>{text.hero.subtitle}</TopTitle>
                <HeroTitle data-text={text.hero.title}>
                  {text.hero.title}
                </HeroTitle>
              </TitleWrapper>
            </Fade>
          </HeroContent>
        </Container>
      </HeroOverlay>
    </StyledHeroSection>
  );
}

// Custom styled components
const TitleWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  transform: skew(0, -10deg);
`;

const TopTitle = styled.div`
  order: 1;
  text-align: center;
  display: block;
  color: #fff;
  font-size: clamp(1rem, 4vw, 1.5rem);
  margin-bottom: 1rem;
  padding-right: 2rem;
`;

const HeroTitle = styled.div`
  order: 2;
  color: #fde9ff;
  font-weight: 900;
  font-size: 120px;
  line-height: 0.75em;
  text-align: center;
  text-shadow: 3px 1px 1px #ff69b4, 2px 2px 1px #da70d6, 4px 2px 1px #ffb3e6,
    3px 3px 1px #b19cd9, 5px 3px 1px #ff69b4, 4px 4px 1px #da70d6,
    6px 4px 1px #ffb3e6, 5px 5px 1px #b19cd9, 7px 5px 1px #ff69b4,
    6px 6px 1px #da70d6, 8px 6px 1px #ffb3e6, 7px 7px 1px #b19cd9,
    9px 7px 1px #ff69b4;
  position: relative;

  &:before {
    content: attr(data-text);
    position: absolute;
    text-shadow: 2px 2px 1px #ff69b4, -1px -1px 1px #da70d6,
      -2px 2px 1px #dda0dd, 1px -1px 1px #ffb347;
    z-index: 1;
  }
`;

const StyledHeroSection = styled(Box)`
  min-height: 40vh;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(255, 250, 245, 0.3) 40%,
      rgba(255, 240, 245, 0.6) 70%,
      ${(props) => props.theme.palette.cuteColors.cream} 85%,
      ${(props) => props.theme.palette.cuteColors.pinkBlush} 100%
    );
    pointer-events: none;
    z-index: 3;
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
`;
