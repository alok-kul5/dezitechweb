const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#05070d]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <p className="font-medium text-white">© {year} Dezitech Engineering</p>
        <div className="flex flex-wrap gap-4">
          <a href="/privacy" className="transition hover:text-white">
            Privacy
          </a>
          <a href="/terms" className="transition hover:text-white">
            Terms
          </a>
          <a href="mailto:info@dezitechengineering.com" className="transition hover:text-white">
            info@dezitechengineering.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
