import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import JobDescription from './pages/JobDescription'

// --- Import Admin Pages ---
import Companies from './pages/admin/Companies'
import CompanyCreate from './pages/admin/CompanyCreate'
import CompanySetup from './pages/admin/CompanySetup'
import AdminJobs from './pages/admin/AdminJobs'
import PostJob from './pages/admin/PostJob'
import Applicants from './pages/admin/Applicants'

const appRouter = createBrowserRouter([
  // Public Routes
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/description/:id', element: <JobDescription /> },
  { path: '/browse', element: <Browse /> },
  { path: '/profile', element: <Profile /> },

  // --- Admin / Recruiter Routes ---
  { path: '/admin/companies', element: <Companies /> },
  { path: '/admin/companies/create', element: <CompanyCreate /> },
  { path: '/admin/companies/:id', element: <CompanySetup /> },
  { path: '/admin/jobs', element: <AdminJobs /> },
  { path: '/admin/jobs/create', element: <PostJob /> },
  { path: '/admin/jobs/:id/applicants', element: <Applicants /> },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App