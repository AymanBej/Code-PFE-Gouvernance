import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Card,
  Table,
  Avatar,
  styled,
  TableRow,
  useTheme,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  fontFamily: "DM Sans"
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "8px 12px",
  fontFamily: "DM Sans",
  fontSize: "13px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function TabDemandeAdmin() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const StyledParagraph = styled("p")({
    cursor: "pointer",
    fontFamily: "DM Sans",
    fontSize: "15px",
    "&:hover": {
      color: "#0d5195" // Assurez-vous que primary est une couleur valide dans votre thème Material-UI
    }
  });
  const cellStyle = {
    fontFamily: "DM Sans, sans-serif"
  };

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Liste des demandes</Title>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle} colSpan={1} sx={{ px: 2 }}>
                Nom & Prénom
              </TableCell>

              <TableCell style={cellStyle} colSpan={1} sx={{ px: 0 }} align="center">
                Date
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }} align="center">
                Priorité
              </TableCell>

              <TableCell style={cellStyle} colSpan={1} sx={{ px: 0 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={1} sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={product.imgUrl} />
                    <StyledParagraph>{product.name}</StyledParagraph>
                  </Box>
                </TableCell>

                <TableCell style={cellStyle} align="center" colSpan={1} sx={{ px: 0 }}>
                  {product.date}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="center" colSpan={1}>
                  {product.priority === "high" && <Small bgcolor={bgError}>Haute</Small>}
                  {product.priority === "medium" && <Small bgcolor={bgSecondary}>Moyenne</Small>}
                  {product.priority === "low" && <Small bgcolor={bgPrimary}>Basse</Small>}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="center" colSpan={1}>
                  <IconButton>
                    <Tooltip title="Accepter" placement="top">
                      <DoneIcon style={{ color: "#09b66d" }} />
                    </Tooltip>
                  </IconButton>

                  <IconButton>
                    <Tooltip title="Rejeter" placement="top">
                      <ClearIcon color="error" />
                    </Tooltip>
                  </IconButton>
                  <Link to ="/demandes">
                    <IconButton>
                      <Tooltip title="Voir détails" placement="top">
                        <RemoveRedEyeIcon color="primary" />
                      </Tooltip>
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}

const userList = [
  {
    imgUrl: "/assets/images/face-2.png",
    name: "Maxwel Duran",
    date: "23/02/2023",
    priority: "high" // Ajoutez une propriété de priorité pour chaque utilisateur
  },
  {
    imgUrl: "/assets/images/face-3.png",
    name: "Ons Fakhfakh",
    date: "01/02/2024",
    priority: "medium" // Ajoutez une propriété de priorité pour chaque utilisateur
  },
  {
    imgUrl: "/assets/images/face-4.png",
    name: "Ayman Bejaoui",
    date: "10/05/2023",
    priority: "high" // Ajoutez une propriété de priorité pour chaque utilisateur
  },
  {
    imgUrl: "/assets/images/face-1.png",
    name: "Yassine Laabidi",
    date: "02/04/2023",
    priority: "medium" // Ajoutez une propriété de priorité pour chaque utilisateur
  },
  {
    imgUrl: "/assets/images/face-3.jpg",
    name: "Oussema Siala",
    date: "22/02/2024",
    priority: "low" // Ajoutez une propriété de priorité pour chaque utilisateur
  }
];
