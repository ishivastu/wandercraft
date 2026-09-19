import './globals.css';

export const metadata = {
  title: 'WanderCraft AI - Advanced Trip Planner',
  description: 'AI-powered dynamic trip planner with interactive mapping and tracking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 antialiased">{children}</body>
    </html>
  );
}