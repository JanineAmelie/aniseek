"use client";

import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  AutoAwesome as MagicIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import { text } from "@/constants/text";

const StatsCard = styled(Card)`
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 116, 139, 0.2) !important;
  border-radius: 16px !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
  }
`;

type StatItemProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <Box sx={{ flex: { xs: "1 0 100%", md: "1 0 30%" } }}>
    <StatsCard>
      <CardContent sx={{ textAlign: "center" }}>
        {icon}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </StatsCard>
  </Box>
);

export const StatsSection = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 6 }}>
      <StatItem
        icon={
          <TrendingIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
        }
        value={text.stats.animeCount}
        label={text.stats.animeLabel}
      />
      <StatItem
        icon={
          <StarIcon sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />
        }
        value={text.stats.rating}
        label={text.stats.ratingLabel}
      />
      <StatItem
        icon={<MagicIcon sx={{ fontSize: 48, color: "info.main", mb: 2 }} />}
        value={text.stats.recommendations}
        label={text.stats.recommendationsLabel}
      />
    </Box>
  );
};
