import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Compare as CompareIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import { useComparison } from "@/hooks/useComparison";
import { useMyList } from "@/hooks/useMyList";

const StyledAppBar = styled(AppBar)`
  backdrop-filter: blur(8px);
  background: rgba(30, 41, 59, 0.95) !important;
  border-bottom: 1px solid rgba(100, 116, 139, 0.2);
`;

const Logo = styled(Typography)`
  font-weight: 700;
  background: linear-gradient(45deg, #6366f1, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const NavButton = styled(Button)<{ $isActive?: boolean }>`
  color: ${(props) => (props.$isActive ? "#6366f1" : "#cbd5e1")} !important;
  font-weight: ${(props) => (props.$isActive ? "600" : "500")} !important;
  margin: 0 4px !important;

  &:hover {
    background-color: rgba(99, 102, 241, 0.1) !important;
    color: #6366f1 !important;
  }
`;

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { comparisonList } = useComparison();
  const { myList } = useMyList();

  const [mobileMenuAnchor, setMobileMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Browse",
      href: "/browse",
      icon: <SearchIcon />,
    },
    {
      label: "Trending",
      href: "/trending",
      icon: <TrendingIcon />,
    },
    {
      label: "Top Rated",
      href: "/top-rated",
      icon: <StarIcon />,
    },
    {
      label: "My List",
      href: "/my-list",
      icon: <FavoriteIcon />,
      badge: myList.length > 0 ? myList.length : undefined,
    },
    {
      label: "Compare",
      href: "/compare",
      icon: <CompareIcon />,
      badge: comparisonList.length > 0 ? comparisonList.length : undefined,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Link href="/" passHref>
          <Logo variant="h5" sx={{ flexGrow: 0, mr: 4 }}>
            AniQuest
          </Logo>
        </Link>

        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <NavButton
                  startIcon={
                    item.badge ? (
                      <Badge badgeContent={item.badge} color="secondary">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )
                  }
                  $isActive={isActive(item.href)}
                >
                  {item.label}
                </NavButton>
              </Link>
            ))}
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }} />
        )}

        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                  },
                },
              }}
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    handleMobileMenuClose();
                  }}
                  selected={isActive(item.href)}
                >
                  <ListItemIcon>
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="secondary">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};
