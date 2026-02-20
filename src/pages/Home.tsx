import { SeoHead } from '@components/features/SeoHead';

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <SeoHead title="Accueil" description="Bienvenue sur notre site." />
      <h1 className="text-4xl font-bold">Hello.</h1>
    </section>
  );
}
