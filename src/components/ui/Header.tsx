import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";

export function Header() {
  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Link href="/" passHref>
          <Logo variant="h5" sx={{ flexGrow: 0, mr: 4 }}>
            AniSeek
          </Logo>
        </Link>
      </Toolbar>
    </StyledAppBar>
  );
}

const Logo = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #6366f1, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const StyledAppBar = styled(AppBar)`
  backdrop-filter: blur(8px);
  background: rgba(30, 41, 59, 0.95);
  border-bottom: 1px solid rgba(100, 116, 139, 0.2);
`;
