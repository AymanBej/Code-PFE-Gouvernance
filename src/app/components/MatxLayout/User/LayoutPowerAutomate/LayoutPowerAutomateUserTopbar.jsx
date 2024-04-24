import { memo } from "react";
import { Link } from "react-router-dom";
import { Box, styled, Avatar, Hidden, MenuItem, IconButton } from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";

import { Span } from "app/components/Typography";
import { MatxMenu, MatxSearchBox } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { topBarHeight } from "app/utils/constant";

import { PowerSettingsNew } from "@mui/icons-material";
import HelpIcon from "@mui/icons-material/Help";


// STYLED COMPONENTS

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 50,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 54,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const LayoutPowerAutomateUserTopbar = () => {
  const { user } = useAuth();

  return (
    <TopbarRoot>
      <TopbarContainer>
      <Box display="flex" alignItems="center" sx={{ gap: "150px" }}>
          <Link to="/accueil">
            <img width={"30%"} src="/assets/images/logos/Slogan.png" alt="" />
          </Link>
          <MatxSearchBox />
        </Box>

        <Box display="flex" alignItems="center" sx={{ gap: "15px" }}>
          <Link to="/aide">
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Link>
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown></Hidden>
                <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />

                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>
                  <strong>{user.name}</strong>
                </Span>
              </UserMenu>
            }
          >
            <StyledItem>
              <AccountCircleIcon style={{ margin: "2%" }} />
              <Link to="/profil">
                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>Profil</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <PowerSettingsNew style={{ margin: "2%" }} />
              <Link to="/auth">
                <Span style={{ fontFamily: "DM Sans", fontSize: "15px" }}>Déconnexion</Span>
              </Link>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(LayoutPowerAutomateUserTopbar);
