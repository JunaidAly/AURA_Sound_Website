import "../styles/index.css";
export const metadata = {
  icons: { icon: "/icon.svg" },
  metadataBase: new URL("https://aurawebsite-two.vercel.app"),
  title: "AURA — Sound, beautifully considered.",
  description:
    "Explore AURA: a premium audio website concept with interactive 3D visuals, thoughtful design and immersive motion. Built by Junaid Ali.",
  openGraph: {
    title: "AURA — Sound, beautifully considered.",
    description: "An interactive premium audio concept by Junaid Ali.",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
