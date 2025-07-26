import React from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import { truncateDescription } from "@/utils/anime";

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
  if (!description) return null;

  const processedDescription = truncate
    ? truncateDescription(description, maxLength)
    : description.replace(/<br\s*\/?>/gi, "<br />");

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <DescriptionText
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: processedDescription,
        }}
      />
    </Box>
  );
}

const DescriptionText = styled(Typography)`
  line-height: 1.6;

  & br {
    margin-bottom: 8px;
  }
`;
