
# Denium Hub

A dark, editorial-style e-commerce frontend for a denim brand, built with React + Vite.

This project includes:
- Product listing and filtering
- Product detail with size/fit selection
- Cart management with localStorage persistence
- Checkout UI flow
- Responsive layout and animated interactions

## Tech Stack

- React 18
- Vite 6
- React Router (`react-router-dom` v7)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (`motion/react`) for animations
- Lucide React for icons
- Radix UI primitives + custom UI components

## Project Structure

```text
src/
  app/
    App.jsx                    # Router + global layout + Cart provider
    components/
      Navbar.jsx
      Footer.jsx
      ProductCard.jsx
      sections/                # Home page sections
      ui/                      # Reusable UI primitives
    context/
      CartContext.jsx          # Cart state and cart actions
    data/
      products.js              # Static product catalog + fit categories
    pages/
      Home.jsx
      Shop.jsx
      ProductDetail.jsx
      Cart.jsx
      Checkout.jsx
      About.jsx
      Contact.jsx
      NotFound.jsx
  styles/
    index.css                  # Global style entry
    fonts.css
    tailwind.css
    theme.css
  main.jsx                     # App bootstrap + ErrorBoundary
```

## Routing

Defined in `src/app/App.jsx`:

- `/` -> Home
- `/shop` -> Shop
- `/shop/:category` -> Shop by category/gender URL segment
- `/product/:id` -> Product details
- `/cart` -> Cart
- `/checkout` -> Checkout
- `/about` -> About page
- `/contact` -> Contact page
- `*` -> Not Found

## Core Features

### 1) Product Catalog & Discovery

- Product data is currently static (`src/app/data/products.js`)
- Shop page supports:
  - Sorting (featured, price ascending/descending, newest, best selling)
  - Gender filter
  - Fit filter
  - Category filter
  - Grid/list view switch

### 2) Product Detail Experience

- Supports waist/length or size selection based on product type
- Quantity selector
- Add-to-cart integration with selected size
- Wishlist toggle UI
- Gallery + technical specs + related products

### 3) Cart State & Persistence

Cart state is managed in `src/app/context/CartContext.jsx`:

- `addToCart(product, size, qty)`
- `removeFromCart(productId, size)`
- `updateQuantity(productId, size, quantity)`
- `clearCart()`
- Derived totals:
  - `totalItems`
  - `totalPrice`

Persistence behavior:
- Cart is stored in `localStorage` under key: `denim-hub-cart`
- Cart state survives page refresh/browser reopen

### 4) Cart & Checkout Flow

- Cart page includes:
  - Quantity controls
  - Remove item
  - Promo code support (`DENIM20`, `HUB10`, `NEWMEMBER15`)
  - Shipping/tax/discount summary
- Checkout page includes:
  - Shipping form
  - Payment method selection (COD/Card UI)
  - Order summary and total calculation

## Design System Notes

- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Dark-first visual language with strong red accent
- Utility + inline style mix for exact editorial look
- Reusable UI primitives in `src/app/components/ui`

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (recommended)

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build in `dist/`

## Configuration

`vite.config.js` includes:

- React plugin
- Tailwind CSS Vite plugin
- Alias: `@` -> `./src`

Example:

```js
import x from "@/app/components/...";
```

## Data Model (Current)

Products in `products.js` include fields like:

- `id`, `name`, `fit`, `price`, `originalPrice`
- `image`, `category`, `gender`
- `colors`, `sizes`, `waistSizes`, `lengths`
- `description`, `specs`
- `isNew`, `isSale`, `rating`, `reviews`

This is mock/static data and can be replaced by API-backed data later.

## Extending the Project

### Hook up a backend

Replace static data and context actions with API calls:

- Product list/details from a products API
- Cart operations from authenticated cart endpoints
- Checkout submission to order API

### Improve production readiness

- Add input validation and form error handling
- Add tests (unit + integration)
- Add analytics/events around conversion funnel
- Add auth and user accounts

## Known Limitations

- No backend integration yet (catalog/cart are frontend-managed)
- No automated tests configured yet
- Checkout currently demonstrates UI flow, not a real payment integration

## Credits

- Original visual inspiration:  
  https://www.figma.com/design/W1CuaFY9b2lh550ZYk2gBk/Dark-Mode-E-commerce-Homepage
  
