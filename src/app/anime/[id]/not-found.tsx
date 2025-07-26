"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import styled from "styled-components";

export default function NotFound() {
  const router = useRouter();

  return (
    <Container
      maxWidth="md"
      sx={{ py: 8 }}
    >
      <CenteredContent>
        <ErrorCode
          variant="h1"
          color="primary"
        >
          404
        </ErrorCode>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Anime Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          The anime you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          size="large"
        >
          Back to Home
        </Button>
      </CenteredContent>
    </Container>
  );
}

const CenteredContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ErrorCode = styled(Typography)`
  font-size: 8rem;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 6rem;
  }
`;
