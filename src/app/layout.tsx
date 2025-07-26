"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import { theme } from "@/lib/theme";
import { apolloClient } from "@/lib/apollo-client";
import { Header } from "@/components/ui/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              {children}
            </StyledThemeProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
