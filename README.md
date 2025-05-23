# 🎓 studentTrack

**studentTrack** is a web application similar to a campus result keeper system. It allows **faculty** to input class test marks, assignment scores, mid-term and final exam results and manage student **attendance**. Students can log in to **view their individual marks, grades, and CGPA**.

The system includes a **login feature** for both faculty and students:
- Faculty can log in to **add/edit marks and attendance** for each course they handle.
- Students log in with their ID and password to **securely view** all of their academic details.

The application automatically **calculates grades and CGPA** based on the entered marks for each student, per course, streamlining academic record-keeping.

---

## 🚀 Features

- Faculty login and student login system
- Enter and manage:
  - Class test marks
  - Assignments
  - Mid-term & final exam scores
  - Attendance records
- Auto-calculation of:
  - Grades
  - CGPA
- Secure access to student data
- Clean, responsive user interface



---

## 🚀 Future Implement

- Add and manage student profiles
- One-click export to Excel/PDF of all results 
- Notification system to alert students about: Low attendance, Upcoming exams/assignments, Faculty notices
- Performance analytics dashboard with GPA trends
- Download results and attendance reports in PDF
- All-semester tracking of performance

---

## 🛠 Tech Stack

### Programming Languages:
- **TypeScript** - The primary programming language used throughout the application
- **HTML/JSX** - For structuring the UI components
- **CSS** - Used via Tailwind CSS utility classes

### Frontend Framework:
- **React** - The core UI library
- **React Router** - For client-side routing (evidenced by the <Navigate>, useParams, and route components)

### Build Tools:

- **Vite** - Modern build tool and development server

### Styling:

- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Component library built on top of Radix UI components

### State Management:
- React Context API - Used for managing auth state in AuthContext.tsx
- React Query - For data fetching and server state management

### UI Components:
- **Radix UI** - Unstyled, accessible UI components
- **Lucide React** - Icon library
- **Recharts** - For data visualization

### Form Management:
- React Hook Form - For form state management and validation

### Data Validation:
- **Zod** - For schema validation

### Notification System:
- **Sonner** - Toast notification library

---

## 📁 Folder Structure (Overview)

```
studentTrack/
├── public/               # Static assets
├── src/                  # Application source code
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
├── tailwind.config.ts    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
└── bun.lockb             # Bun lockfile
```

---

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed globally
- A modern browser

### Installation

```bash
bun install
```

### Development Server

```bash
bun run dev
```

### Build for Production

```bash
bun run build
```

---

## 👨‍💻 Author

**Abid Shahriar**  
📚 CSE Student, Metropolitan University  
🌐 [Portfolio](https://shahriardev.netlify.app)  
🐙 [GitHub](https://github.com/CodewithShahriar)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

> ⚠️ This project is still under development. Contributions and feedback are welcome!
