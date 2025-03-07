'use client';

import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/globals';

const Container = styled.div`
  min-height: 100vh;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => theme.colors.primary.light} 0%,
    transparent 70%
  );

  @media (prefers-color-scheme: dark) {
    background: radial-gradient(
      circle at center,
      ${({ theme }) => theme.colors.primary.dark}10 0%,
      transparent 70%
    );
  }
`;

const Main = styled.main`
  max-width: 7xl;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Main>
          {children}
        </Main>
      </Container>
    </ThemeProvider>
  );
} 