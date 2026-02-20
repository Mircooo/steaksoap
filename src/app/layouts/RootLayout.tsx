import { Outlet } from 'react-router-dom';

/* ─── RootLayout ─────────────────────────────────────────────
   Wrapper commun à toutes les pages.
   Placer ici : Header, Footer, navigation globale, etc.

   Outlet = la page active s'affiche ici.
   ─────────────────────────────────────────────────────────── */
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
