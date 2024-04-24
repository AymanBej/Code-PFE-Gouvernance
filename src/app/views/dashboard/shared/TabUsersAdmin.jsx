import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Link } from "react-router-dom";
// Material UI Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFF"
    }
  },
  typography: {
    fontFamily: "DM Sans"
  }
});

const TabUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("authToken");

        const url =
          "https://graph.microsoft.com/Beta/users?$select=displayName,mail,companyName,userType,department,jobTitle,mobilePhone,userPrincipalName";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        const fetchedData = await response.json();
        // Update avatar URL for each user
        const usersWithAvatar = await Promise.all(
          fetchedData.value.map(async (user) => {
            const avatarResponse = await fetch(
              `https://graph.microsoft.com/Beta/users/${user.userPrincipalName}/photos/48x48/$value`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );
            if (avatarResponse.ok) {
              const blob = await avatarResponse.blob();
              const avatarUrl = URL.createObjectURL(blob);
              return { ...user, avatar: avatarUrl };
            } else {
              // Set default avatar URL
              return {
                ...user,
                avatar:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
              };
            }
          })
        );
        setData(usersWithAvatar);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "employee",
        header: "",
        columns: [
          {
            accessorKey: "displayName",
            id: "name",
            header: "Nom & Prénom",
            enableClickToCopy: true,
            size: 250,
            Cell: ({ row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: "50%" }}
                />
                <span>{row.original.displayName}</span>
              </Box>
            )
          },
          {
            accessorKey: "mail",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 100
          },
          {
            accessorKey: "companyName",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Société",
            size: 100
          },

          {
            accessorKey: "jobTitle",
            enableClickToCopy: true,
            header: "Métier",
            size: 100
          }
        ]
      }
    ],
    []
  );

  const paginationData = useMemo(() => data.slice(0, 7), [data]); // Limiter les données à seulement les 5 premiers utilisateurs
  const table = useMaterialReactTable({
    columns,
    data: paginationData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    enableGrouping: false,
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActions: false,
    enableRowSelection: false,
    enablePagination: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"]
      }
    },

    renderTopToolbar: ({}) => {
      return (
        <Toolbar>
          <Typography variant="h6">Liste des utilisateurs</Typography>
          <Link to="/utilisateurs">
            <IconButton>
              <Tooltip title="Voir plus" placement="top">
                <RemoveRedEyeIcon color="primary" />
              </Tooltip>
            </IconButton>
          </Link>
        </Toolbar>
      );
    }
  });

  return (
    <div style={{ marginBottom: "2%" }}>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <MaterialReactTable table={table} columns={columns} data={data} />
      )}
    </div>
  );
};

const UsersTab = () => (
  <ThemeProvider theme={theme}>
    <div style={{ fontFamily: "DM Sans" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabUsers />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default UsersTab;
