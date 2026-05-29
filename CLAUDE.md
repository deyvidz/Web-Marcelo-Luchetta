# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with `--host` (exposes on LAN).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built bundle locally.
- `npm run lint` — ESLint over the whole repo. There is no test runner configured.

The codebase is Spanish-language (UI strings, route paths like `/productos`, `/quien-soy`, code comments). Preserve Spanish when editing user-facing text.

## Architecture

Single-page React 19 SPA that acts as a product catalog for a dental-equipment seller. There is no checkout: the cart generates a pre-filled WhatsApp message instead of charging a card.

### Stack and build

- **Vite 7** with `@vitejs/plugin-react-swc`.
- **Tailwind CSS v4** wired via `@tailwindcss/vite` (no PostCSS, no `tailwind.config.js`). Theme tokens are declared with `@theme { --color-primary: ...; }` inside `src/styles/index.css`, which produces utilities like `bg-primary`, `text-text`, `bg-backgroundb`. Animations come from the `tailwindcss-motion` plugin plus hand-rolled `@keyframes` in `index.css`. When adding new colors/utilities, edit `src/styles/index.css` — don't look for a config file.
- ESLint flat config in `eslint.config.js`. Note the custom rule: unused vars starting with uppercase or `_` are allowed (`varsIgnorePattern: '^[A-Z_]'`).

### Data layer (Firebase Firestore, read-mostly)

`src/services/firebase.js` initializes Firestore. **The Firebase config is hardcoded in source** — there is no `.env`. Treat it as public web client config (Firestore security rules are the gate, not the API key).

Collections used:
- `products` — documents include `name`, `name_lower`, `price`, `image`, `description`, `category`, `brand`, `keywords[]` (lowercase tokens for search), `featured` (boolean).
- `banners` — homepage banner images.
- `contactMessages` — write-only sink for the contact form (`contactService.saveContactMessage`).

`src/services/productService.js` is the single source of Firestore queries. `getProductsWithFilters` is the important one:
1. Tries `where('keywords', 'array-contains' | 'array-contains-any', tokens)` when a search name is provided.
2. Falls back to category/brand-constrained query + client-side `name_lower.includes(needle)` substring filter if the keyword query fails or returns nothing.
   This dual path avoids needing composite Firestore indexes and tolerates products that haven't been keyword-tagged yet. When adding new query helpers, mirror this fallback pattern rather than requiring indexed fields.

### Data fetching hooks

`src/hooks/useProducts.js` exports one hook per query shape (`useProducts`, `useProduct`, `useFeaturedProduct`, `useProductByCategory`, `useSearchProducts`, `useProductsFiltered`). Each returns `{ products | product, loading, error }`. `useProductsFiltered` serializes the filters object via `JSON.stringify` as the effect key and uses a `lastKeyRef` to skip redundant refetches — keep that pattern if you add filters. `useSearchProducts` debounces 500 ms inside the effect via `setTimeout` + cleanup.

### Global state

Two React Contexts wrap the app in `src/App.jsx`:
- **CartContext** (`src/context/CartContext.jsx`) — cart state mirrored to `localStorage` under the key `dentalproCart`. Exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getTotalItems`, `getTotalPrice`. Consume via the `useCart` hook in `src/hooks/useCart.js` (the hook lives outside the context file so Fast Refresh doesn't complain).
- **ToastContext** (`src/context/ToastContext.jsx`) — toast queue, rendered as a stacked overlay. Use `const { showToast } = useToast()`.

### Routing and pages

`react-router-dom` v7 with routes defined inline in `App.jsx`. Route → page mapping:
- `/` → `Home` (hero, featured carousel, banners, category grid, CTA)
- `/productos` → `Products` — filters live in URL search params (`?categoria=&marca=&nombre=`) and drive `useProductsFiltered`. `SearchBar` is on this page (not in the NavBar).
- `/productos/:id` → `ProductPage`
- `/contacto` → `Contact` (uses `react-hook-form`, writes to `contactMessages`)
- `/quien-soy` → `About`
- `/carrito` → `Cart` — "checkout" builds a `https://wa.me/<phone>?text=...` URL with the pedido formatted in plain text and opens it in a new tab. Phone number is hardcoded in `Cart.jsx`.

`ScrollToTop` (`src/components/ui/ScrollToTop.jsx`) is mounted inside `<Router>` to reset scroll on navigation.

### Component layout

- `src/components/layout/` — `NavBar`, `Footer`, `SearchBar`. NavBar contains routing links and cart badge; it does **not** contain the search input (search lives on `Products`).
- `src/components/features/` — domain widgets: `ProductCard`, `ProductList`, `ProductCarousel`, `CartModal`, `Banner`, `Card`/`CardList`/`GridCard`/`GridLayout` (homepage grids), `Loading` / `BannerSkeleton` (loading states).
- `src/components/ui/` — reusable primitives (`Toast`, `ScrollToTop`).

### Icons

`src/icons/IconLibrary.jsx` exports a single `Icons` object whose properties are SVG-returning function components: `<Icons.Whatsapp className="..." />`, `<Icons.ArrowIcon />`, etc. Always add new icons to this object — there are no per-icon files.

### Utilities

`src/utils/formatters.js` → `formatPrice(n)` returns ARS-formatted currency via `Intl.NumberFormat('es-AR')` with zero decimals. Use it for any price rendering.

## Conventions to know

- **Tailwind theme colors are tokenized** (`primary`, `secondary`, `accent`, `text`, `background`, `backgroundb`, `backgroundc`, `gray`, `white`). Prefer these over raw color utilities so the global palette can be retuned in `index.css`.
- **All money flows through `formatPrice`** — don't re-implement formatting.
- **Search depends on `name_lower` and `keywords[]` fields** on each product doc. If you add a new product field that should be searchable, populate `keywords` accordingly; otherwise the substring fallback on `name_lower` is the only safety net.
- **No backend writes to `products`** from the app — admin/data entry happens directly in Firestore.
