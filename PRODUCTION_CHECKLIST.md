# Multiverse Production Checklist

Multiverse is currently a static-first public content platform with admin-only management. Keep the public site open: no public auth, no public accounts, no favorites, no user history, and no database requirement.

## Release Gate

- Run `npm run validate:content` before every build.
- Run `npm run build` and confirm all static routes generate successfully.
- Run `npm run smoke:test -- --start --port 3035` after a production build.
- Check `git diff --check` before committing to catch whitespace or conflict-marker issues.

## Public Surface

- Public sections must remain crawlable: Home, Tools, UI, Templates, Prompts, Discover, Fixes, Search, Privacy, Terms.
- Legacy public auth routes should redirect away from user-account flows.
- Public pages should not mention saved libraries, favorites, personal history, or sign-in-only features.
- Detail pages should include useful intro copy, related links, and schema where appropriate without becoming text-heavy.

## Admin Surface

- Keep `/admin` protected and `/admin-login` available.
- Admin write routes should require a valid admin session, use `no-store`, apply rate limits, and reject oversized payloads.
- Cloudinary uploads should stay admin-only and enforce image type and size limits.
- Admin cookies must be secure in production and scoped to admin functionality only.

## SEO

- Each major page needs a unique title, description, canonical URL, Open Graph tags, and Twitter card metadata.
- Keep `robots.txt` and `sitemap.xml` valid after adding or removing routes.
- Prefer static metadata and structured JSON-LD over client-generated SEO.
- Add internal links between related tools, templates, prompts, UI components, and discover pages.

## Performance

- Prefer server components and static rendering for public content.
- Lazy-load heavy studios, previews, and browser-only libraries.
- Avoid shipping admin-only logic in public bundles.
- Keep image previews optimized and responsive.
- Watch high-traffic routes for bundle growth, especially `/tools/[category]/[tool]`, `/ui`, `/templates`, and `/prompts`.

## Privacy And Cookies

- Avoid public tracking cookies unless there is a clear business need.
- If analytics are added, prefer privacy-friendly analytics and document them in `/privacy`.
- Consent banners are unnecessary while the site uses only essential/admin cookies.
- Keep Privacy Policy and Terms updated before enabling ads, sponsorships, or analytics.

## Scale Notes

- The current no-DB model is safe for read-heavy traffic when pages are static and local content is cached.
- Avoid per-request filesystem scans in public routes.
- Do not add runtime search APIs for static content unless they are cached or pre-indexed.
- Move content to a database later through the existing local-store/db facade pattern, not directly from components.
