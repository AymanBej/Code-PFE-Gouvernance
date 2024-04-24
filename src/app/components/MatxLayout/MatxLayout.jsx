import { MatxSuspense } from "app/components";
import useSettings from "app/hooks/useSettings";
import {LayoutTeamsUser, LayoutSharePointUser, LayoutPowerAutomateUser, LayoutAccueilAdmin, LayoutSharePointAdmin, LayoutExchangeAdmin, LayoutTeamsAdmin,LayoutPowerAutomateAdmin,LayoutAccueilUser,LayoutExchangeUser } from "./index"; 

export default function MatxLayout(props) {
  const { settings } = useSettings();
  let Layout;

  // Utilisez settings.activeLayout pour déterminer le layout à utiliser
  if (settings.activeLayout === "layoutAccueilAdmin") {
    Layout = LayoutAccueilAdmin.layoutAccueilAdmin;
  } 
  else if (settings.activeLayout === "layoutAccueilUser") {
    Layout = LayoutAccueilUser.layoutAccueilUser;
  }else if (settings.activeLayout === "layoutSharePointAdmin") {
    Layout = LayoutSharePointAdmin.layoutSharePointAdmin;
  } else if (settings.activeLayout === "layoutExchangeAdmin") {
    Layout = LayoutExchangeAdmin.layoutExchangeAdmin;
  } else if (settings.activeLayout === "layoutTeamsAdmin") {
    Layout = LayoutTeamsAdmin.layoutTeamsAdmin;
  }
  else if (settings.activeLayout === "layoutPowerAutomateAdmin") {
    Layout = LayoutPowerAutomateAdmin.layoutPowerAutomateAdmin;
  } else if (settings.activeLayout === "layoutExchangeUser") {
    Layout = LayoutExchangeUser.layoutExchangeUser;
  }
  else if (settings.activeLayout === "layoutPowerAutomateUser") {
    Layout = LayoutPowerAutomateUser.layoutPowerAutomateUser;
  }
  else if (settings.activeLayout === "layoutSharePointUser") {
    Layout = LayoutSharePointUser.layoutSharePointUser;
  }
  else if (settings.activeLayout === "layoutTeamsUser") {
    Layout = LayoutTeamsUser.layoutTeamsUser;
  }
  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
}
