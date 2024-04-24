import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/authentification/NotFound")));
const Authentification = Loadable(lazy(() => import("app/views/authentification/Auth")));
// const JwtRegister = Loadable(lazy(() => import("app/views/authentification/JwtRegister")));
// const ForgotPassword = Loadable(lazy(() => import("app/views/authentification/ForgotPassword")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
// Home Page
const AccueilAdmin = Loadable(lazy(() => import("app/views/accueil/AccueilAdmin")));
const Calendar = Loadable(lazy(() => import("app/views/calendrier/Calendrier")));
const Profil = Loadable(lazy(() => import("app/views/profil/Profil")));
const Help = Loadable(lazy(() => import("app/views/aide/Aide")));
const AccueilUser = Loadable(lazy(() => import("app/views/accueil/AccueilUser")));

const UsersTab = Loadable(lazy(() => import("app/views/utilisateurs/UsersTab")));
const DemandeTab = Loadable(lazy(() => import("app/views/demandes/DemandeTab")));

const routes = [
  // session pages route
  { path: "/auth", element: <Authentification/> },
  // { path: "/session/signup", element: <JwtRegister /> },
  // { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "/session/404", element: <NotFound /> },

  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      // accueil route
      { path: "/accueil", element: <AccueilAdmin />, auth: authRoles.admin },
      { path: "/calendrier", element: <Calendar />, auth: authRoles.admin },
      { path: "/profil", element: <Profil />, auth: authRoles.admin },
      { path: "/aide", element: <Help />, auth: authRoles.admin },
      { path: "/accueiluser", element: <AccueilUser />, auth: authRoles.admin },
      { path: "/utilisateurs", element: <UsersTab />, auth: authRoles.admin },
      { path: "/demandes", element: <DemandeTab />, auth: authRoles.admin }


    


    ]
  },

  { path: "/", element: <Navigate to="/auth" /> }, // Redirection vers la page de connexion
  { path: "*", element: <NotFound /> }
];

export default routes;
