import React from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { truncateDescription } from "@/utils";

type DescriptionProps = {
  description?: string;
  maxLength?: number;
};

const DEFAULT_MAX_LENGTH = 120;

export function Description({
  description,
  maxLength = DEFAULT_MAX_LENGTH,
}: Readonly<DescriptionProps>) {
  if (!description) return null;

  const truncatedDescription = truncateDescription(description, maxLength);

  return (
    <DescriptionText
      variant="body2"
      color="text.secondary"
    >
      {truncatedDescription}
    </DescriptionText>
  );
}

const DescriptionText = styled(Typography)`
  flex-grow: 1;
  margin-bottom: 8px;
`;
