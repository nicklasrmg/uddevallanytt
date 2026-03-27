import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/" className="text-sm text-accent hover:underline">&larr; Startsidan</Link>

      <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4 mb-6">
        Om Uddevallanytt
      </h1>

      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <p className="text-lg leading-relaxed">
          Uddevallanytt är en lokal nyhetssajt som bevakar Uddevalla med omnejd.
          Vi levererar nyheter, sport, kultur och samhällsbevakning.
        </p>

        <h2 className="font-headline text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          Kontakt
        </h2>
        <p>
          Har du ett nyhetstips eller vill komma i kontakt med redaktionen?
          Mejla oss på <strong>redaktion@uddevallanytt.se</strong>
        </p>
      </div>
    </div>
  );
}
