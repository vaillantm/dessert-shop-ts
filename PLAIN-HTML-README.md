# Plain HTML, CSS, and JavaScript Version

This project has been converted from React + TypeScript into plain HTML, CSS, and JavaScript.

## Files Structure

```
├── index.html          # Main HTML file with Tailwind CSS
├── app.js             # All application logic in vanilla JavaScript
├── data.json          # Product data
└── public/
    └── images/        # All product images and icons
```

## How to Run

### Option 1: Direct Browser Opening
Simply open `index.html` in your browser. The app will load the product data and work fully.

### Option 2: Using a Local Server (Recommended)

Due to CORS restrictions when loading `data.json`, it's better to use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Features

All original React features have been converted:

- Browse dessert products
- Add items to cart
- Increase/decrease quantities
- Remove items from cart
- View cart total
- Confirm order with modal
- Start new order

## Technical Details

### Conversions Made:

1. **React Components → HTML + JavaScript Functions**
   - `App.jsx` → `index.html` + `app.js`
   - All component logic converted to vanilla JS functions

2. **React State → JavaScript Variables**
   - `useState` → `let` variables
   - State updates trigger `render()` function

3. **React Event Handlers → DOM Event Listeners**
   - `onClick` → `addEventListener('click', ...)`
   - Event delegation for dynamic elements

4. **JSX → Template Strings**
   - All JSX converted to HTML strings with template literals

5. **TypeScript → JavaScript**
   - All type annotations removed
   - Interfaces and types removed
   - Pure JavaScript logic retained

### Styling

- Uses Tailwind CSS via CDN
- All original classes preserved
- Responsive design maintained (mobile + desktop)
- Custom color theme configured in HTML

## No Build Process Required

This is a standalone application:
- No React
- No TypeScript compilation
- No build tools needed
- No npm dependencies required
- Just HTML, CSS, and JavaScript

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript (arrow functions, template literals, etc.)
- CSS Grid and Flexbox
- Fetch API

## Development

To modify the app:

1. Edit `index.html` for structure changes
2. Edit `app.js` for logic changes
3. Edit `data.json` for product data
4. Refresh browser to see changes (no build step needed)
