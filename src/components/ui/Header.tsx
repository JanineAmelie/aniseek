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
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.palette.cuteColors.pinkPrimary},
    ${(props) => props.theme.palette.cuteColors.purplePrimary}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const StyledAppBar = styled(AppBar)`
  backdrop-filter: blur(8px);
  background: ${(props) => props.theme.palette.cuteColors.whiteOverlay};
  border-bottom: 1px solid ${(props) => props.theme.palette.cuteColors.pinkSoft};
`;
