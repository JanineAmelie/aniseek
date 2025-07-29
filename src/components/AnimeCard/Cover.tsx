import React from "react";
import { CardMedia } from "@mui/material";
import styled from "styled-components";
import { AnimeCardFragmentFragment } from "@/__generated__/graphql";

const DEFAULT_HEIGHT = 300;

type CoverProps = {
  coverImage: AnimeCardFragmentFragment["coverImage"];
  title: string;
};

export function Cover({ coverImage, title }: Readonly<CoverProps>) {
  const imageUrl = coverImage?.large || coverImage?.medium;

  return (
    <StyledCardMedia
      image={imageUrl || undefined}
      title={title}
    />
  );
}

const StyledCardMedia = styled(CardMedia)`
  object-fit: cover;
  height: ${DEFAULT_HEIGHT}px;
`;
