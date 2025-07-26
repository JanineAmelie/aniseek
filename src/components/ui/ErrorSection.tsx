"use client";

import React from "react";
import {
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

type ErrorSectionProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorSection({
  title = "Oops! Something went wrong",
  message = "We couldn't load the anime data. Please try again.",
  onRetry,
}: Readonly<ErrorSectionProps>) {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorTitle variant="h6">{title}</ErrorTitle>
      <ErrorMessage variant="body2">{message}</ErrorMessage>
      {onRetry && (
        <RetryButton
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          Try Again
        </RetryButton>
      )}
    </ErrorContainer>
  );
}

const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: ${({ theme }) => theme.palette.error.main};
`;

const ErrorTitle = styled(Typography)`
  margin: 16px 0 8px 0;
  font-weight: 600;
`;

const ErrorMessage = styled(Typography)`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.palette.text.secondary};
  max-width: 400px;
`;

const RetryButton = styled(Button)`
  text-transform: none;
`;
