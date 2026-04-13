# RoarHomes Admin Panel

A modern React admin dashboard for managing RoarHomes properties, bookings, and users.

## Features

- **Dashboard Overview**: Real-time statistics and metrics
- **Revenue Analytics**: Interactive charts showing revenue trends
- **Recent Activity**: Track latest bookings, listings, and user registrations
- **Booking Management**: View and manage recent reservations
- **Modern UI**: Built with TailwindCSS and responsive design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the admin panel.

## Technologies Used

- **React 18**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **Chart.js**: Interactive data visualization
- **React Router**: Client-side routing
- **Iconify**: Comprehensive icon library

## Project Structure

```
roaradmin/
src/
  components/
    AdminDashboard.js    # Main dashboard component
  App.js                 # Main app component with routing
  index.js               # App entry point
  index.css              # Global styles and Tailwind setup
public/
  index.html             # HTML template
```

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Customization

The dashboard uses a custom color scheme defined in `tailwind.config.js`:
- Primary: Blue (#2563eb)
- Secondary: Dark slate (#1e293b)
- Tertiary: Green (#10b981)
- Background: Light gray (#f8fafc)

You can modify these colors in the Tailwind config to match your brand.
