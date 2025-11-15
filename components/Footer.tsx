const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <p className="font-medium text-gray-800">© {year} Dezitech Engineering</p>
        <div className="flex flex-wrap gap-4">
          <a href="/privacy" className="transition hover:text-gray-900">
            Privacy
          </a>
          <a href="/terms" className="transition hover:text-gray-900">
            Terms
          </a>
          <a href="mailto:info@dezitechengineering.com" className="transition hover:text-gray-900">
            info@dezitechengineering.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
