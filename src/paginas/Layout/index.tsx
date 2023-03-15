import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box>
              <Link component={RouterLink} to="/admin/restaurants">
                <Button sx={{ my: 2, color: "white" }}>Restaurants</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurants/new">
                <Button sx={{ my: 2, color: "white" }}>
                  Create Restaurant
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Paper sx={{ p: 4 }}>{children}</Paper>
        </Container>
      </Box>
    </>
  );
}
