import { useEffect, useRef, memo } from "react";
import { ThemeProvider, useMediaQuery, Box, styled, useTheme } from "@mui/material";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";

import useSettings from "app/hooks/useSettings";

import LayoutTeamsUserTopbar from "./LayoutTeamsUserTopbar";
import LayoutTeamsUserSidenav from "./LayoutTeamsUserSidenav";

import Footer from "app/components/Footer";
import { MatxSuspense } from "app/components";
import SidenavTheme from "app/components/MatxTheme/SidenavTheme/SidenavTheme";

import { sidenavCompactWidth, sideNavWidth } from "app/utils/constant";



// STYLED COMPONENTS

const LayoutTeamsUserRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between"
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: "100%",
  position: "relative",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column"
}));

const LayoutContainer = styled(Box)(({ width, open }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: width,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginRight: open ? 50 : 0
}));

const LayoutTeamsUser = () => {
  const { settings, updateSettings } = useSettings();
  const { layoutTeamsUserSettings, secondarySidebar } = settings;
  const topbarTheme = settings.themes[layoutTeamsUserSettings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav }
  } = layoutTeamsUserSettings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;

      case "compact":
        return sidenavCompactWidth;

      default:
        return "0px";
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layoutTeamsUserSettings.leftSidebar.mode;
    if (settings.layoutTeamsUserSettings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layoutTeamsUserSettings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <LayoutTeamsUserRoot className={layoutClasses}>
      {showSidenav && sidenavMode !== "close" && (
        <SidenavTheme>
          <LayoutTeamsUserSidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} open={secondarySidebar.open}>
        {layoutTeamsUserSettings.topbar.show && layoutTeamsUserSettings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <LayoutTeamsUserTopbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layoutTeamsUserSettings.topbar.show && !layoutTeamsUserSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTeamsUserTopbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {!settings.perfectScrollbar && (
          <ContentBox>
            {layoutTeamsUserSettings.topbar.show && !layoutTeamsUserSettings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <LayoutTeamsUserTopbar />
              </ThemeProvider>
            )}

            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>

    </LayoutTeamsUserRoot>
  );
};

export default memo(LayoutTeamsUser);
