import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { formatScore } from "@/utils/anime";

type ScoreProps = {
  score?: number | null;
};

export function Score({ score }: Readonly<ScoreProps>) {
  if (!score) return null;

  return <ScoreOverlay>{formatScore(score)}</ScoreOverlay>;
}

const ScoreOverlay = styled(Box)`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${(props) => props.theme.palette.cuteColors.blackOverlay};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.875rem;
  z-index: 2;
`;
