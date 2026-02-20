import { SeoHead } from '@components/features/SeoHead';
import { ROUTES } from '@constants/routes';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      <SeoHead title="404" description="Page introuvable." noIndex />
      <p className="text-6xl font-bold opacity-10">404</p>
      <p className="opacity-50">Page introuvable.</p>
      <Link to={ROUTES.HOME} className="underline underline-offset-4 opacity-70 hover:opacity-100">
        Retour à l&#39;accueil
      </Link>
    </section>
  );
}
