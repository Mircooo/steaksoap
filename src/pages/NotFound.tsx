import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-6xl font-bold opacity-10">404</p>
      <p className="opacity-50">Page introuvable.</p>
      <Link to={ROUTES.HOME} className="underline underline-offset-4 opacity-70 hover:opacity-100">
        Retour à l'accueil
      </Link>
    </section>
  );
}
