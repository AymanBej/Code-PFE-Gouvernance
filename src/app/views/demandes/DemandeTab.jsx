import { useMemo } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import { IconButton, Tooltip } from "@mui/material";

//MRT Imports
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Breadcrumb } from "app/components";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Importez le ThemeProvider et createTheme

//Material UI Imports
import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

//Mock Data
import { data } from "./data";
const theme = createTheme({
  palette: {
    background: {
      default: "#FFF" // Définissez la couleur de fond par défaut sur blanc
    }
  },
  typography: {
    fontFamily: "DM Sans" // Définissez la police par défaut sur DM Sans
  }
});

const Example = () => {
  const columns = useMemo(
    () => [
      {
        id: "employee", //id used to define `group` column
        header: "",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Nom & Prénom",
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
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
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            )
          },
          {
            accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 350
          },
          {
            accessorKey: "salary",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Priorité",
            size: 250,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() < 50_000
                      ? theme.palette.error.dark
                      : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem"
                })}
              >
                {cell.getValue()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </Box>
            )
          },

          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: "startDate",
            header: "Start Date",
            filterVariant: "date",
            filterFn: "lessThan",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px"
              }
            }
          },
          {
            accessorKey: "actions",
            header: "Actions",
            filterVariant: "autocomplete",

            size: 150,
            Cell: () => (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton>
                  <Tooltip title="Accepter" placement="top">
                    <DoneIcon style={{ color: "#09b66d" }} />
                  </Tooltip>
                </IconButton>

                <IconButton>
                  <Tooltip title="Rejeter" placement="top">
                    <ClearIcon color="error" />
                  </Tooltip>{" "}
                </IconButton>
              </Box>
            )
          }
        ]
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined"
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined"
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr"
        }}
      >
        <Box marginLeft={"20%"}>
          <img
            alt="avatar"
            height={150}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              position: "sticky"
            }}
          >
            <Typography variant="subtitle1">
              <strong>Nom du site:</strong> {row.original.nomSite}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Société de l'utilisateur:</strong> {row.original.société}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Type du site:</strong> {row.original.typeDuSite}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Métier de l'utilisateur:</strong> {row.original.jobTitle}
            </Typography>
            <Typography variant="subtitle1">
              <strong> Description du site:</strong> {row.original.descriptionDuSite}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Numéro de l'utilisateur:</strong> {row.original.salary}
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  });

  return (
    <div style={{ marginBottom: "5%" }}>
      {" "}
      {/* Ajoute une marge en bas de 20px */}
      <MaterialReactTable table={table} />
    </div>
  );
};

//Date Picker Imports - these should just be in your Context Provider

const ExampleWithThemeProvider = () => (
  <ThemeProvider theme={theme}>
    {" "}
    {/* Utilisez le ThemeProvider et passez le thème créé */}
    <div style={{ margin: "auto", width: "85%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Utilisateurs" }]} />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Example />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);
export default ExampleWithThemeProvider;
