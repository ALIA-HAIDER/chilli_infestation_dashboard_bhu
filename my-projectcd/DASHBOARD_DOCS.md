# Chilli Infestation Dashboard

A comprehensive dashboard for managing chilli plant disease requests with admin authentication and database management.

## Features

- **Admin Authentication**: Secure login system for administrators
- **Dashboard Overview**: Statistics and overview of all plant disease requests
- **Request Management**: View, filter, and search through plant disease requests
- **Detailed View**: Individual request details with images and solutions
- **Responsive Design**: Works on desktop and mobile devices

## Demo Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Database Schema

The application uses the following data structure for plant disease requests:

### PlantRequest Interface
```typescript
interface PlantRequest {
  id: string;              // Unique identifier
  picture: string;         // URL to plant image
  disease: string;         // Identified disease name
  solution: string;        // Suggested treatment solution
  createdDate: string;     // ISO date string
  location: string;        // Farm/field location
  status: 'pending' | 'reviewed' | 'resolved';  // Request status
  severity: 'low' | 'medium' | 'high';          // Disease severity
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date formatting
- **Vite** for build tooling

## Dashboard Features

### Statistics Cards
- Total requests count
- Pending requests
- Reviewed requests
- Resolved requests
- High severity alerts

### Request Table
- Searchable by ID, disease, or location
- Filterable by status and severity
- Sortable columns
- Image thumbnails
- Status indicators
- Action buttons

### Request Details Modal
- Full-size plant image
- Complete disease information
- Suggested solutions
- Location and timing details
- Status and severity indicators

## Future Enhancements

- Real database integration (PostgreSQL/MySQL)
- User role management
- Image upload functionality
- Reporting and analytics
- Email notifications
- Mobile app version
- API integration for disease detection

## File Structure

```
src/
├── components/
│   ├── Login.tsx          # Admin login component
│   └── Dashboard.tsx      # Main dashboard component
├── data/
│   └── mockData.ts        # Sample data and credentials
├── types/
│   └── index.ts           # TypeScript interfaces
├── App.tsx                # Main application component
├── App.css                # Application styles
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
