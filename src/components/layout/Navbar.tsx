import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Truck } from 'lucide-react';
import { useAppDispatch } from '@/redux/hook';
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import toast from 'react-hot-toast';

const Navbar = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole = userData?.data?.role;
  const isLoggedIn = !!userRole;

  // Navigation links based on role
  const getNavLinks = () => {
    const publicLinks = [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ];

    if (!isLoggedIn) return publicLinks;

    const roleBasedLinks = {
      admin: { href: '/admin/dashboard', label: 'Dashboard' },
      sender: { href: '/sender/dashboard', label: 'Dashboard' },
      receiver: { href: '/receiver/dashboard', label: 'Dashboard' },
    };

    const dashboardLink = roleBasedLinks[userRole as keyof typeof roleBasedLinks];
    return dashboardLink ? [...publicLinks, dashboardLink] : publicLinks;
  };

  const navLinks = getNavLinks();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate('/login');
      toast.success('Logged out successfully');
      setIsMobileMenuOpen(false);
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ParcelDelivery</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to={`/${userRole}/profile`}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t mt-2 pt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="border-t pt-4 mt-2 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to={`/${userRole}/profile`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 text-base font-medium"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-base font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 text-base font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700 text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;