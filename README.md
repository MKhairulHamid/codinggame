# LTU HTML5 Generator for MOODLE LMS

A Next.js application that generates HTML5 code with inline CSS and JavaScript for deployment on MOODLE LMS.

## Student Information

**Important:** Before running the application, update the following files with your actual information:

1. `components/Header.tsx` - Update `STUDENT_NUMBER` constant (line 9)
2. `components/Footer.tsx` - Update `STUDENT_NAME` and `STUDENT_NUMBER` constants (lines 5-6)
3. `app/about/page.tsx` - Update `STUDENT_NAME` and `STUDENT_NUMBER` constants (lines 8-9)

## Features

### ✅ Core Features (Assignment 1 & 2)

- **Responsive Design**: Mobile-friendly with hamburger menu
- **Dark/Light Theme**: Toggle between themes with browser preference detection
- **Cookie Memory**: Remembers the last visited tab
- **Accessibility Compliant**: WCAG standards with ARIA labels and semantic HTML
- **Student Number Display**: Visible in top-left corner of every page

### 📄 Pages

1. **Home Page**: 
   - HTML5 code generator with basic template
   - Copy-to-clipboard functionality
   - Overview of available features

2. **About Page**:
   - Student information display
   - Video tutorial placeholder
   - Project overview and features list
   - Technologies used

3. **Tabs Generator**:
   - Interactive tab configurator
   - Add/remove tabs dynamically
   - Generate HTML5 + inline CSS + JavaScript
   - Copy generated code for MOODLE deployment

4. **Escape Room** (Assignment 2):
   - Manual timer configuration
   - Custom background with escape room theme
   - Multiple coding challenge stages:
     - Stage 1: Format code correctly
     - Stage 2: Debug code
     - Stage 3: Generate numbers 0-1000
     - Stage 4: Data transformation (CSV to JSON)
   - Hint system for each stage
   - Progress tracking
   - Victory/Game Over screens

5. **Coding Races** (Coming Soon):
   - Placeholder page with preview features

6. **Court Room** (Coming Soon):
   - Placeholder page with preview features

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd ltu-html-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ltu-html-generator/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── tabs/                # Tabs generator
│   ├── escape-room/         # Escape room challenge
│   ├── coding-races/        # Coding races (placeholder)
│   ├── court-room/          # Court room (placeholder)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── not-found.tsx        # 404 page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx           # Header with hamburger menu
│   ├── Header.module.css
│   ├── Footer.tsx           # Footer with student info
│   ├── Footer.module.css
│   └── ClientLayout.tsx     # Client-side layout wrapper
├── contexts/                # React contexts
│   └── ThemeContext.tsx     # Theme management
└── public/                  # Static assets
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **CSS Modules**: Scoped component styling
- **React Context API**: State management for themes
- **HTML5**: Modern web standards
- **Accessibility**: WCAG compliant with ARIA labels

## Usage

### Generating HTML5 Code

1. Navigate to any generator page (e.g., Tabs Generator)
2. Configure your options (content, colors, etc.)
3. Click "Generate Code"
4. Copy the generated code using the "Copy" button
5. Paste into a `.html` file or directly into MOODLE
6. The code is self-contained and will work in any browser

### Escape Room Challenge

1. Navigate to the Escape Room page
2. Set your desired timer duration (in minutes)
3. Click "Start" to begin the challenge
4. Complete each coding stage:
   - Read the challenge description
   - Write your solution in the code editor
   - Click "Submit Solution" to check your answer
   - Use hints if you get stuck
5. Complete all stages before time runs out to escape!

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Responsive design for all devices

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Assignment Requirements Checklist

### Part 1 ✅
- [x] Next.js application with create-next-app
- [x] Home page with HTML5 code generator
- [x] About page with student info and video placeholder
- [x] Student number in top-left corner
- [x] Header with hamburger menu
- [x] Dark/Light mode theme toggle
- [x] Footer with copyright, student name, number, and date
- [x] Accessibility compliance
- [x] Cookie-based tab memory
- [x] Tabs page with HTML5 generator
- [x] Placeholder pages (Coding Races, Court Room)

### Part 2 ✅
- [x] Escape Room page
- [x] Manual timer configuration
- [x] Custom background image/theme
- [x] Multiple coding stages:
  - [x] Format code correctly
  - [x] Debug code
  - [x] Generate numbers 0-1000
  - [x] Data transformation

## Notes

- All generated HTML code uses inline CSS (no external CSS classes)
- Generated code is self-contained and MOODLE-ready
- The application uses CSS Modules for component styling (not in generated code)
- Theme preference is saved in localStorage
- Navigation history is saved in cookies

## License

This project is created for educational purposes as part of an LTU assignment.

---

**Student Number**: [Update in source files]  
**Date**: October 2025
