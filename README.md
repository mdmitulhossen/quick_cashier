# Quick Cash - Short-term Lending Platform

A modern, responsive web application for short-term lending services in The Bahamas. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Customer Features

- **Loan Application Process**: Multi-step application form with progress tracking
- **Loan Calculator**: Interactive calculator with real-time payment estimates
- **Customer Dashboard**: View loan status, payments, and account information
- **Document Management**: Upload and manage required documents
- **Payment Tracking**: Monitor payment history and upcoming payments
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Features

- **Application Management**: Review and process loan applications
- **Customer Management**: View and manage customer accounts
- **Loan Portfolio**: Monitor active loans and collections
- **Analytics Dashboard**: Business insights and performance metrics
- **KYC/AML Compliance**: Document verification and risk assessment
- **Reporting**: Generate operational and regulatory reports

### Technical Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Form Validation**: React Hook Form with Zod schema validation
- **Authentication**: JWT-based authentication with role-based access
- **Responsive UI**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and validation
- **Accessibility**: WCAG compliant components and navigation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Forms**: React Hook Form, Zod validation
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quick-cash-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   ├── common/          # Shared components (ErrorBoundary, LoadingSpinner)
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # Reusable UI components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
│   ├── admin/           # Admin pages
│   ├── auth/            # Authentication pages
│   ├── customer/        # Customer dashboard pages
│   └── legal/           # Legal pages
├── styles/              # Global styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── main.tsx            # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Components

### Authentication System

- JWT-based authentication
- Role-based access control (Customer/Admin)
- Protected routes
- Session management

### Loan Application Process

- Multi-step form with progress tracking
- Real-time validation
- Document upload functionality
- Responsive design

### Admin Dashboard

- Modular component architecture
- Real-time data visualization
- Comprehensive application management
- KYC/AML compliance tools

### Customer Dashboard

- Loan status tracking
- Payment management
- Document center
- Account settings

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Colors**: Blue primary palette with semantic colors
- **Typography**: System fonts with consistent sizing
- **Spacing**: 4px base unit system
- **Components**: Reusable UI components with consistent styling
- **Icons**: Lucide React icon library

## 🔒 Security Features

- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure authentication
- Role-based access control
- Data encryption (mock implementation)

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Quick Cash
```

## 🧪 Testing

The project includes:

- TypeScript for type safety
- ESLint for code quality
- Comprehensive error handling
- Form validation

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:

- Email: support@quickcash.bs
- Phone: +1 (242) 123-4567

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- Complete loan application process
- Admin dashboard with application management
- Customer dashboard with loan tracking
- Responsive design implementation

---

**Note**: This is a demonstration application. In a production environment, you would need to:

- Implement a backend API
- Add real authentication and authorization
- Integrate with payment processors
- Add real-time notifications
- Implement proper security measures
- Add comprehensive testing
- Set up monitoring and logging
