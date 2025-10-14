# Country Data Interface - React

A modern React reimplementation of the Country Data Interface application. This app provides a searchable, interactive interface for exploring data about countries and regions of the world.

## Features

- 🔍 **Search Functionality**: Search countries by name, native name, country codes (ISO 3166-1), currency codes, or translations
- 🗺️ **Interactive Maps**: View country locations and borders using Leaflet and OpenStreetMap
- 🚩 **Country Flags**: Display SVG flags for all countries
- 📊 **Detailed Information**: Access comprehensive data including:
  - Names (common, official, native, translations)
  - ISO codes (alpha-2, alpha-3, numeric)
  - Languages
  - Geography (region, capital, coordinates, area, borders)
  - Calling codes, currencies, and top-level domains
- 📱 **Responsive Design**: Mobile-friendly interface that works on all devices

## Tech Stack

- **React 18** - Modern React with Hooks
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **React Leaflet** - Interactive maps
- **Custom CSS** - Bootstrap-inspired styling without the framework bloat

## Prerequisites

Before running this application, you need:

- Node.js (version 16 or higher recommended)
- npm or yarn package manager

## Installation

1. Navigate to the react-app directory:
```bash
cd react-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`.

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
react-app/
├── public/              # Static assets (served from ../web/data)
├── src/
│   ├── components/      # Reusable React components
│   │   ├── CountrySummary.jsx
│   │   ├── Footer.jsx
│   │   ├── MapView.jsx
│   │   └── Navbar.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useCountries.js
│   ├── pages/          # Page components
│   │   ├── About.jsx
│   │   ├── CountryDetail.jsx
│   │   └── CountryIndex.jsx
│   ├── utils/          # Utility functions
│   │   └── searchUtils.js
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Key Components

### Pages

- **CountryIndex**: Main page with search functionality and country grid
- **CountryDetail**: Detailed view of a single country with all information
- **About**: Information about the application and data sources

### Components

- **Navbar**: Navigation bar with links
- **Footer**: Footer with copyright information
- **CountrySummary**: Card component showing country summary
- **MapView**: Interactive map component using Leaflet

### Custom Hooks

- **useCountries**: Fetches all countries data
- **useCountry**: Fetches single country by cca3 code
- **useGeoData**: Fetches GeoJSON data for map visualization

## Data Sources

All country data is courtesy of [Mohammed Le Doze's countries project](https://github.com/mledoze/countries) on GitHub.

The application uses:
- `countries.json` - Complete country data
- `flags/*.svg` - SVG flag files
- `geo/*.geo.json` - GeoJSON boundary data

## Differences from Original

This React version improves upon the original AngularJS application with:

- ⚡ **Better Performance**: Faster loading and rendering with modern React
- 🎨 **Modern Syntax**: Uses React Hooks and functional components
- 📦 **Smaller Bundle**: No heavy framework dependencies
- 🛠️ **Better Developer Experience**: Vite for instant hot module replacement
- ♿ **Improved Accessibility**: Better semantic HTML and keyboard navigation

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Page**: Create a new component in `src/pages/` and add a route in `App.jsx`
2. **New Component**: Add to `src/components/` and import where needed
3. **New Hook**: Create in `src/hooks/` for reusable data fetching logic
4. **Styling**: Add component-specific CSS files or modify global styles in `index.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Site design is copyright (c) 2014-2024 Peter Thompson.

## Credits

- Original AngularJS version: [Peter Thompson](https://github.com/petert82/country-data-interface)
- Country data: [mledoze/countries](https://github.com/mledoze/countries)
- React reimplementation: 2024

## Contact

For questions or suggestions, please contact peter.thompson@dunelm.org.uk or open an issue on GitHub.

