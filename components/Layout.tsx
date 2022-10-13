import {
  AppShell,
  Box,
  Breadcrumbs,
  Divider,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { Icon3dRotate, IconMoodNerd } from "@tabler/icons";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
      fixed={false}
    >
      <div>{children}</div>
    </AppShell>
  );
};

export default Layout;
