import React from "react";
import { Card, CardMedia } from "@mui/material";
import styled from "styled-components";

type CoverProps = {
  coverImage?: {
    large?: string | null;
    medium?: string | null;
  } | null;
  title: string;
};

export function Cover({ coverImage, title }: Readonly<CoverProps>) {
  const imageUrl = coverImage?.large || coverImage?.medium;

  if (!imageUrl) {
    return null;
  }

  return (
    <CoverCard>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{ height: 400, objectFit: "cover" }}
      />
    </CoverCard>
  );
}

const CoverCard = styled(Card)`
  height: fit-content;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;
