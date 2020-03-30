import { ReactNode } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import UserContext from "../contexts/UserContext";

import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: theme.spacing(8)
  }
}));

export default function Page(props: Props) {
  const classes = useStyles();

  return (
    <>
      <Meta />
      <UserContext>
        <Header />
        <Container fixed maxWidth="md">
          {props.children}
        </Container>
        <div className={classes.footer}>
          <Footer />
        </div>
      </UserContext>
    </>
  );
}
