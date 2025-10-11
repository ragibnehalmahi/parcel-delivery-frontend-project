import FAQ from "@/pages/FAQ"
import About from "@/pages/About"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import HelpCenter from "@/pages/HelpCenter"
import TermsOfService from "@/pages/TermsOfService"
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public Routes
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'careers',
        element: <Careers/>,
      },
      {
        path: 'terms',
        element: <TermsOfService/>
      },
      {
        path: 'faq',
        element: <FAQ/>,
      },
      {
        path: 'help',
        element: <HelpCenter/>
      },
      {
        path: 'tracking/:trackingId?',
        element: <Tracking />,
      },

      // Authentication Routes
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      }]

      // Protected Routes - Admin
       