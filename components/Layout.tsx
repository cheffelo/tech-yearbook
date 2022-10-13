import { AppShell } from "@mantine/core";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell
      styles={{
        root: {
          background:
            "linear-gradient(0deg, rgba(230,230,230,0) 0%, rgba(248,248,248,1) 50%)",
        },
      }}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
