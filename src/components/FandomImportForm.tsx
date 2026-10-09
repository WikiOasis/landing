"use client";

import { ArrowRight, CircleAlert } from "lucide-react";
import { FormEvent, useId, useRef, useState } from "react";

// Special:FandomImport reads `wiki` (the fandom.com subdomain) and an optional
// `lang` (the language path, e.g. "es" for starwars.fandom.com/es/). Without
// JavaScript the form still submits, with `wiki` set to whatever was typed.
export const FANDOM_IMPORT_URL =
  "https://meta.wikioasis.org/wiki/Special:FandomImport";

const SUBDOMAIN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const LANGUAGE = /^[a-z]{2,3}(?:-[a-z]{2,4})?$/;

// Accepts a bare name ("starwars"), a host ("starwars.fandom.com") or a URL
// pasted from the address bar ("https://starwars.fandom.com/es/wiki/Yoda").
export function parseFandomWiki(
  input: string
): { wiki: string; lang?: string } | null {
  const [host, firstSegment = ""] = input
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    .split(/[/?#]/);
  const labels = host.replace(/\.(?:fandom\.com|wikia\.com|wikia\.org)$/, "").split(".");

  // Older addresses put the language first: es.starwars.wikia.com
  const [wiki, subdomainLang] =
    labels.length === 2 && LANGUAGE.test(labels[0])
      ? [labels[1], labels[0]]
      : [labels.join("."), undefined];

  if (!SUBDOMAIN.test(wiki)) return null;

  const lang = subdomainLang ?? (LANGUAGE.test(firstSegment) ? firstSegment : undefined);
  return lang ? { wiki, lang } : { wiki };
}

export function fandomImportHref(input: string) {
  const parsed = parseFandomWiki(input);
  if (!parsed) return null;

  const url = new URL(FANDOM_IMPORT_URL);
  url.searchParams.set("wiki", parsed.wiki);
  if (parsed.lang) url.searchParams.set("lang", parsed.lang);
  return url.toString();
}

const PLACEHOLDER = "yourwiki";

export default function FandomImportForm() {
  const inputId = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Hide the suffix once someone pastes a full address, so it doesn't read
  // "starwars.fandom.com.fandom.com".
  const showSuffix = !/[./]/.test(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!value.trim()) {
      setError("Type your wiki’s address first, like yourwiki.fandom.com.");
      inputRef.current?.focus();
      return;
    }

    const href = fandomImportHref(value);
    if (!href) {
      setError("That doesn’t look like a Fandom address. Try the part before .fandom.com.");
      inputRef.current?.focus();
      return;
    }

    window.location.assign(href);
  }

  return (
    <form action={FANDOM_IMPORT_URL} method="get" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 text-left ring-button-text ring-offset-2 ring-offset-panel sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:bg-surface sm:p-1.5 sm:shadow-lg sm:shadow-black/10 sm:has-[input:focus]:ring-2">
        <label
          htmlFor={inputId}
          className="flex min-w-0 flex-1 cursor-text items-center rounded-full bg-surface px-5 py-3.5 text-lg text-body shadow-lg shadow-black/10 ring-button-text ring-offset-2 ring-offset-panel has-[input:focus]:ring-2 sm:bg-transparent sm:py-2 sm:shadow-none sm:has-[input:focus]:ring-0"
        >
          <span className="sr-only">
            Your Fandom wiki’s address, the part before .fandom.com
          </span>
          <span className="inline-grid min-w-0 max-w-full">
            <span
              aria-hidden
              className="invisible col-start-1 row-start-1 overflow-hidden whitespace-pre"
            >
              {value || PLACEHOLDER}
            </span>
            <input
              ref={inputRef}
              id={inputId}
              name="wiki"
              type="text"
              size={1}
              inputMode="url"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder={PLACEHOLDER}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="col-start-1 row-start-1 w-full min-w-0 bg-transparent font-medium text-body placeholder:font-normal placeholder:text-body/45 focus:outline-none"
            />
          </span>
          {showSuffix && (
            <span aria-hidden className="shrink-0 text-body/70">
              .fandom.com
            </span>
          )}
        </label>

        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-surface px-6 py-3.5 text-base font-medium text-body transition-opacity hover:opacity-90 focus:outline-none focus-visible:focus-ring sm:bg-panel sm:py-3 sm:text-button-text"
        >
          Import my wiki
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>

      <p
        id={errorId}
        aria-live="polite"
        className="mb-2 mt-3 min-h-[1.5rem] text-sm font-medium text-button-text"
      >
        {error && (
          <>
            <CircleAlert size={16} aria-hidden className="mr-1.5 inline-block align-[-3px]" />
            {error}
          </>
        )}
      </p>
    </form>
  );
}
