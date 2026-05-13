import { useEffect, useState } from "react";

function SideNav() {
  const [activeSection, setActiveSection] = useState("home");

  const links = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Features", href: "#features", id: "features" },
    { label: "Start", href: "#onboarding", id: "onboarding" },
    { label: "Dashboard", href: "#dashboard", id: "dashboard" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "FAQ", href: "#faq", id: "faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      links.forEach((link) => {
        const section = document.getElementById(link.id);

        if (section) {
          const sectionTop = section.offsetTop - 160;

          if (window.scrollY >= sectionTop) {
            current = link.id;
          }
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 rounded-3xl border border-white/10 bg-black/50 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl xl:block">
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = activeSection === link.id;

          return (
            <a
              key={link.id}
              href={link.href}
              className={`relative block overflow-hidden rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-cyan-300 text-black shadow-[0_0_25px_rgba(34,211,238,0.55)]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 -translate-x-full animate-[shine_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              )}

              <span className="relative z-10">{link.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default SideNav;