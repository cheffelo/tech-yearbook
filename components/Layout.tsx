import {
  Affix,
  AppShell,
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
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <AppShell
        header={
          <Header height={50} style={{ background: "rgb(228,228,228)" }}>
            <Container size="xl">
              <Link href="/" passHref>
                <a style={{ textDecoration: "none", color: "black" }}>
                  <Title order={1}>WE ARE TECH</Title>
                </a>
              </Link>
            </Container>
          </Header>
        }
        footer={
          <Footer height={80} style={{ backgroundColor: "rgb(222,222,222)" }}>
            <Divider />
            <Container size="xl" p="lg">
              <Text size="xs">This is a footer</Text>
            </Container>
          </Footer>
        }
        styles={{
          main: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f0f0f0",
          },
          root: { display: "flex", flexDirection: "column", flex: 1 },
          body: { display: "flex", flexDirection: "column", flex: 1 },
        }}
        fixed={false}
      >
        <motion.div style={{ flexGrow: "1", paddingBottom: "2rem" }} layout>
          <Container size="xl">{children}</Container>
        </motion.div>

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
    </AnimatePresence>
  );
};

export default Layout;
