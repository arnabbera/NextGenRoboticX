import { useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import { getFeatureBySlug } from "../data/features";

function upsertMeta(name, content, property = false) {
  const attribute = property ? "property" : "name";
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function FeatureDetailPage() {
  const { featureSlug } = useParams();
  const feature = getFeatureBySlug(featureSlug);

  useEffect(() => {
    if (!feature) return;

    const canonicalUrl = `https://www.nextgenroboticx.com/features/${feature.slug}`;
    const imageUrl = new URL(feature.image, window.location.origin).href;

    document.title = feature.seoTitle;
    upsertMeta("description", feature.metaDescription);
    upsertMeta("robots", "index, follow");
    upsertMeta("og:title", feature.seoTitle, true);
    upsertMeta("og:description", feature.metaDescription, true);
    upsertMeta("og:type", "website", true);
    upsertMeta("og:url", canonicalUrl, true);
    upsertMeta("og:image", imageUrl, true);
    upsertMeta("twitter:card", "summary_large_image");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const structuredData = document.createElement("script");
    structuredData.id = "feature-structured-data";
    structuredData.type = "application/ld+json";
    structuredData.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      name: feature.title,
      description: feature.metaDescription,
      provider: {
        "@type": "EducationalOrganization",
        name: "NextGenRoboticX",
        url: "https://www.nextgenroboticx.com/",
      },
      url: canonicalUrl,
    });
    document.getElementById("feature-structured-data")?.remove();
    document.head.appendChild(structuredData);

    window.scrollTo(0, 0);

    return () => structuredData.remove();
  }, [feature]);

  if (!feature) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Feature not found
          </h1>
          <Link to="/#why-us" className="mt-6 inline-block text-blue-600">
            Return to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/" className="text-xl font-bold text-blue-700 sm:text-2xl">
            NextGenRoboticX
          </Link>

          <Link
            to="/#why-us"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Why Us</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                {feature.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {feature.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                {feature.description}
              </p>
              <a
                href="https://wa.me/919830068336"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Discuss Your Learning Goal
                <ArrowRight size={20} />
              </a>
            </div>

            <img
              src={feature.image}
              alt={`${feature.title} training at NextGenRoboticX`}
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Practical Learning
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Learn through guided, real-world application
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {feature.intro}
              </p>
              <p className="mt-5 leading-8 text-slate-600">
                NextGenRoboticX combines clear concepts, guided implementation,
                troubleshooting and project documentation so that students can
                confidently apply what they learn.
              </p>
            </article>

            <aside className="rounded-3xl bg-slate-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                What you will gain
              </h2>
              <ul className="mt-6 space-y-4">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-slate-700">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-blue-600"
                      size={21}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {feature.mentor && (
          <section className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <aside className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
                  <img
                    src={feature.image}
                    alt={feature.mentor.name}
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <div className="p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                      Founder &amp; Faculty
                    </p>
                    <h2 className="mt-3 text-3xl font-bold">
                      {feature.mentor.name}
                    </h2>
                    <p className="mt-3 leading-7 text-slate-300">
                      {feature.mentor.role}
                    </p>
                  </div>
                </aside>

                <article>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    About Me
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                    Experience that connects theory with practical engineering
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-600">
                    Thank you for taking the time to read this page.
                  </p>
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    {feature.mentor.summary}
                  </p>

                  <div className="mt-10 grid gap-8 md:grid-cols-2">
                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900">
                        Professional Experience
                      </h3>
                      <ul className="mt-5 space-y-3">
                        {feature.mentor.previousRoles.map((item) => (
                          <li key={item} className="flex gap-3 text-slate-600">
                            <CheckCircle2
                              size={20}
                              className="mt-0.5 shrink-0 text-blue-600"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm">
                      <h3 className="text-xl font-bold text-slate-900">
                        Academic Qualifications
                      </h3>
                      <ul className="mt-5 space-y-3">
                        {feature.mentor.qualifications.map((item) => (
                          <li key={item} className="flex gap-3 text-slate-600">
                            <CheckCircle2
                              size={20}
                              className="mt-0.5 shrink-0 text-blue-600"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <article className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Knowledge Areas
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {feature.mentor.knowledgeAreas.map((item) => (
                      <li key={item} className="flex gap-3 leading-7 text-slate-600">
                        <CheckCircle2
                          size={20}
                          className="mt-1 shrink-0 text-blue-600"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Teaching &amp; Mentorship Areas
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {feature.mentor.teachingAreas.map((item) => (
                      <li key={item} className="flex gap-3 leading-7 text-slate-600">
                        <CheckCircle2
                          size={20}
                          className="mt-1 shrink-0 text-blue-600"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              <blockquote className="mt-12 rounded-3xl border-l-4 border-blue-600 bg-blue-50 p-6 text-lg leading-8 text-slate-700 sm:p-8">
                “{feature.mentor.welcome}”
                <footer className="mt-5 font-bold text-slate-900">
                  With best regards,
                  <br />
                  {feature.mentor.name}
                </footer>
              </blockquote>
            </div>
          </section>
        )}

        <section className="bg-blue-600 px-5 py-14 text-center text-white sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Contact NextGenRoboticX for course guidance, project mentoring and
              enrollment information.
            </p>
            <Link
              to="/#contact"
              className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Contact NextGenRoboticX
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
