import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { stripHtmlAndTruncate, stripHtmlToText } from "@/utils";

type DescriptionProps = {
  description?: string | null;
  truncate?: boolean;
  maxLength?: number;
};

export function Description({
  description,
  truncate = false,
  maxLength = 150,
}: Readonly<DescriptionProps>) {
  if (!description) {
    return null;
  }

  // Strip HTML and get plain text - much safer!
  const plainTextDescription = truncate
    ? stripHtmlAndTruncate(description, maxLength)
    : stripHtmlToText(description);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Description
      </Typography>
      <DescriptionText variant="body1">{plainTextDescription}</DescriptionText>
    </Box>
  );
}

const DescriptionText = styled(Typography)`
  line-height: 1.6;

  & br {
    margin-bottom: 8px;
  }
`;
