"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import styled from "styled-components";
import { text } from "@/constants/text";

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
          {text.notFound.errorCode}
        </ErrorCode>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {text.notFound.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {text.notFound.message}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/")}
          size="large"
        >
          {text.notFound.backButton}
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
