import {
  Affix,
  AppShell,
  Box,
  Button,
  Container,
  Divider,
  Footer,
  Header,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons";

import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <AppShell
      header={
        <Box p="lg">
          <Header height={60} style={{ background: "transparent" }}>
            <Link href="/" passHref>
              <a style={{ textDecoration: "none", color: "black" }}>
                <Title order={1}>WE ARE TECH</Title>
              </a>
            </Link>
          </Header>
          <Divider />
        </Box>
      }
      footer={
        <Footer height={80} style={{ backgroundColor: "rgb(222,222,222)" }}>
          <Divider />
          <Container p="lg">
            <Text size="xs">This is a footer</Text>
          </Container>
        </Footer>
      }
      fixed={false}
      styles={{
        main: { display: "flex", flexDirection: "column" },
        root: { display: "flex", flexDirection: "column", flex: 1 },
        body: { display: "flex", flexDirection: "column", flex: 1 },
      }}
    >
      <div style={{ flexGrow: "1" }}>{children}</div>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
};

export default Layout;
