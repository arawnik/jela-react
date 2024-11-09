import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { Language } from '@/models/models';

interface HeaderComponentProps {
  languages: Language[];
  currentLang: string;
}

function Header({ languages, currentLang }: HeaderComponentProps) {
  const { t } = useTranslation('common');

  function onThemeToggle(event: any): void {
    throw new Error('Function not implemented.');
  }

  function onlanguagechange(code: string): void {
    console.log(`change to ${code}`);
    throw new Error('Function not implemented.');
  }

  return (
    <header>
      <nav className="px-3 py-1 text-bg-dark fixed-top main-nav">
        <div className="container container-narrow">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
            {/* Navigation Links */}
            <ul className="nav col-12 col-md-auto justify-content-center my-md-0 text-center text-small">
              <li>
                <Link
                  href="/"
                  className="nav-link text-main-nav"
                >
                  <i className="bi bi-mid bi-fire d-block mb-0"></i>
                  {t('Intro')}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="nav-link text-main-nav"
                >
                  <i className="bi bi-mid bi-building-gear d-block mb-0"></i>
                  {t('Projects')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="nav-link text-main-nav"
                >
                  <i className="bi bi-mid bi-envelope-paper d-block mb-0"></i>
                  {t('Contact me')}
                </Link>
              </li>
            </ul>

            {/* Theme Switch */}
            <ul className="nav col-12 col-md-auto justify-content-center my-md-0 text-center">
              <li>
                <div className="d-flex">
                  <label
                    htmlFor="changeThemeSwitch"
                    className="form-check-label"
                    data-bs-toggle="tooltip"
                    title={t('Light mode')}
                  >
                    <i className="bi bi-mid bi-lightbulb"></i>
                  </label>
                  <div className="form-switch form-check ms-2">
                    <input
                      className="form-check-input"
                      onClick={onThemeToggle}
                      type="checkbox"
                      role="switch"
                      id="changeThemeSwitch"
                      data-bs-toggle="tooltip"
                      title={t('Switch theme')}
                    />
                  </div>
                  <label
                    htmlFor="changeThemeSwitch"
                    className="form-check-label"
                    data-bs-toggle="tooltip"
                    title={t('Dark mode')}
                  >
                    <i className="bi bi-mid bi-moon"></i>
                  </label>
                </div>
              </li>

              {/* Language Switch */}
              <li>
                <div className="d-flex ms-2">
                  {languages.map(
                    ({ code, name }) =>
                      code !== currentLang && (
                        <a
                          key={code}
                          className="ms-2"
                          data-bs-toggle="tooltip"
                          title={t(name)}
                          onClick={(e) => {
                            e.preventDefault();
                            onlanguagechange(code);
                          }}
                        >
                          <Image
                            src={`/img/${code}.svg`}
                            height={26}
                            width={32}
                            alt={code}
                          />
                        </a>
                      )
                  )}
                </div>
              </li>
            </ul>

            {/* Social Media Links */}
            <ul className="nav col-12 col-md-auto justify-content-center my-md-0 text-center">
              <li>
                <a
                  href="https://www.linkedin.com/in/jerejunttila"
                  className="nav-link text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t('LinkedIn profile')}
                >
                  <i className="bi bi-mid bi-linkedin d-block mb-0"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/JereJunttila"
                  className="nav-link text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t('Twitter profile')}
                >
                  <i className="bi bi-mid bi-twitter d-block mb-0"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arawnik"
                  className="nav-link text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t('Github profile')}
                >
                  <i className="bi bi-mid bi-github d-block mb-0"></i>
                </a>
              </li>
              <li>
                <a
                  href="/pdf/CV_JereJunttila.pdf"
                  className="nav-link text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t('Downloadable oldschool CV Pdf')}
                >
                  <i className="bi bi-mid bi-file-earmark-pdf d-block mb-0"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
