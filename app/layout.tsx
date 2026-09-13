import type { Metadata } from "next";
import "@free-fonts/lxgw-wenkai-gb";
import "./globals.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "《吹糖人》数字交互装置",
  description: "以呼吸为笔，以手势为刀，在数字交互中重续吹糖人非遗技艺的生命。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
