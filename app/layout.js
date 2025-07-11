import '../public/style.css';

export const metadata = {
  title: 'Badr Eddine BAKENA —  Portfolio',
  description: 'Portfolio of Badr Eddine BAKENA, Developer and Cybersecurity Student ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
} 