import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserInfoQuery, useLogoutMutation } from "@/redux/features/auth.api";
import { useAppDispatch } from "@/redux/hook";  
import { authApi } from "@/redux/features/auth.api";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggler";  
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";

const role = {
  Admin: "ADMIN",
  Sender: "SENDER", 
  Receiver: "RECEIVER"
};

const navigationLinks = [
  { href: "/", label: "Home", role: "Publish" },
  { href: "/about", label: "About", role: "Publish" },
  { href: "/contact", label: "Contact Us", role: "Publish" },
  {href:"/track-parcel", label:"Track Parcel", role:"Publish"},
];

// Types for MobileMenuPortal props
interface MobileMenuPortalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredLinks: Array<{ href: string; label: string; role: string }>;
  isLinkActive: (href: string) => boolean;
  isLoggedIn: boolean;
  userRole: string | undefined;
  handleLogout: () => Promise<void>;
}

// Mobile Menu Component
function MobileMenuPortal({ 
  isOpen, 
  onClose, 
  filteredLinks, 
  isLinkActive, 
  isLoggedIn, 
  userRole, 
  handleLogout 
}: MobileMenuPortalProps) {
  if (!isOpen) return null;

  const handleLogoutClick = async () => {
    await handleLogout();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Menu Content */}
      <div className="absolute top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <nav className="p-2">
          <ul className="flex flex-col">
            {filteredLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.href}
                  className={`block px-4 py-2 rounded-lg font-medium ${
                    isLinkActive(link.href) 
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" 
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth buttons */}
        <div className="p-4 border-t">
          {isLoggedIn ? (
            <div className="space-y-2">
              <Button asChild size="sm" className="w-full">
                <Link to={`/${userRole?.toLowerCase()}/myprofile`} onClick={onClose}>
                  My Profile
                </Link>
              </Button>
              <Button onClick={handleLogoutClick} size="sm" className="w-full">
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/login" onClick={onClose}>Sign In</Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link to="/register" onClick={onClose}>Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Navbar() {
  const { data: userData } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userRole = userData?.data?.role;
  const isLoggedIn = !!userRole;

  // ✅ Logout handler
  const handleLogout = async (): Promise<void> => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate("/login");
      toast.success("Successfully logged out.");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // ✅ Filter navigation by role
  const filteredLinks = navigationLinks.filter(
    (link) => link.role === "Publish" || link.role === userRole
  );

  // ✅ Active link style
  const isLinkActive = (href: string): boolean =>
    href === "/" ? location.pathname === href : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-white/70 via-gray-50/80 to-blue-50/80 dark:from-gray-950/80 dark:to-blue-950/90 backdrop-blur-md shadow-sm px-2 md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between">
        
        {/* ===== Left Section - Logo & Navigation ===== */}
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          
          {/* 🔹 Simple mobile menu button */}
          <Button
            className="group size-9 md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* 🔹 Logo */}
          <Link to={"/"} className="flex items-center gap-2 flex-shrink-0">
            <span className="rounded-full bg-gradient-to-br from-orange-400 via-yellow-300 to-blue-400 p-1">
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <path
                  d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C0 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 0 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z"
                  fill="#FF4D00"
                ></path>
              </svg>
            </span>
            <span className="font-bold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-300 dark:to-blue-500">
               SwiftParcel
            </span>
          </Link>

          {/* 🔹 Desktop Navigation - Center aligned */}
          <div className="flex-1 flex justify-center max-md:hidden">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {filteredLinks.map((link, i) => (
                  <NavigationMenuItem key={i}>
                    <NavigationMenuLink
                      asChild
                      className={`px-3 py-2 rounded-lg font-medium transition-all ${
                        isLinkActive(link.href)
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-muted-foreground hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-blue-950/40"
                      }`}
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* ===== Right Section - User Actions ===== */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <ModeToggle />
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="max-md:hidden text-sm">
                <Link to={`/${userRole?.toLowerCase()}/myprofile`}>My Profile</Link>
              </Button>
              <Button 
                onClick={handleLogout} 
                size="sm" 
                variant="outline"
                className="text-sm"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Portal menu */}
      <MobileMenuPortal
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        filteredLinks={filteredLinks}
        isLinkActive={isLinkActive}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        handleLogout={handleLogout}
      />
    </header>
  );
} 


// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ModeToggle } from "./ModeToggler";  
// import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth.api";
// import { useAppDispatch } from "@/redux/hook";
// import { role } from "@/constants/role";
// import { Menu, X } from "lucide-react";
// import toast from "react-hot-toast";

// const navigationLinks = [
//   { href: "/", label: "Home", role: "Publish" },
//   { href: "/about", label: "About", role: "Publish" },
//   { href: "/contact", label: "Contact Us", role: "Publish" },
//   { href: "/admin", label: "Dashboard", role: role.Admin },
//   { href: "/sender", label: "Dashboard", role: role.Sender },
//   { href: "/receiver", label: "Dashboard", role: role.Receiver },
// ];

// export default function Navbar() {
//   const { data: userData } = useUserInfoQuery(undefined);
//   const [logout] = useLogoutMutation();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const userRole = userData?.data?.role;
//   const isLoggedIn = !!userRole;

//   // ✅ Logout handler
//   const handleLogout = async () => {
//     try {
//       await logout(undefined).unwrap();
//       dispatch(authApi.util.resetApiState());
//       navigate("/login");
//       toast.success("Successfully logged out.");
//     } catch (err) {
//       console.error("Logout failed:", err);
//       toast.error("Failed to log out. Please try again.");
//     }
//   };

//   // ✅ Filter navigation by role
//   const filteredLinks = navigationLinks.filter(
//     (link) => link.role === "Publish" || link.role === userRole
//   );

//   // ✅ Active link style
//   const isLinkActive = (href: string) =>
//     href === "/" ? location.pathname === href : location.pathname.startsWith(href);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-white/70 via-gray-50/80 to-blue-50/80 dark:from-gray-950/80 dark:to-blue-950/90 backdrop-blur-md shadow-sm px-2 md:px-6">
//       <div className="container mx-auto flex h-16 items-center justify-between">
//         {/* ===== Left Section ===== */}
//         <div className="flex items-center gap-4">
//           {/* 🔹 Mobile Menu */}
//           <Popover open={menuOpen} onOpenChange={setMenuOpen}>
//             <PopoverTrigger asChild>
//               <Button
//                 className="group size-9 md:hidden"
//                 variant="ghost"
//                 size="icon"
//                 aria-label={menuOpen ? "Close menu" : "Open menu"}
//               >
//                 {menuOpen ? (
//                   <X className="h-6 w-6 transition-all" />
//                 ) : (
//                   <Menu className="h-6 w-6 transition-all" />
//                 )}
//               </Button>
//             </PopoverTrigger>

//             <PopoverContent align="start" className="w-52 p-0 md:hidden">
//               <nav>
//                 <ul className="flex flex-col">
//                   {filteredLinks.map((link, i) => (
//                     <li key={i}>
//                       <Link
//                         to={link.href}
//                         className={`block px-4 py-2 rounded-lg font-medium transition-all ${
//                           isLinkActive(link.href)
//                             ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
//                             : "hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-700 dark:text-gray-200"
//                         }`}
//                         onClick={() => setMenuOpen(false)}
//                       >
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>

//               <div className="flex flex-col gap-2 p-3 border-t mt-2">
//                 {isLoggedIn ? (
//                   <>
//                     <Button asChild size="sm" className="w-full">
//                       <Link to={`/${userRole}/myprofile`}>My Profile</Link>
//                     </Button>
//                     <Button onClick={handleLogout} size="sm" className="w-full">
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button asChild variant="ghost" size="sm" className="w-full">
//                       <Link to="/login">Sign In</Link>
//                     </Button>
//                     <Button asChild size="sm" className="w-full">
//                       <Link to="/register">Get Started</Link>
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </PopoverContent>
//           </Popover>

//           {/* 🔹 Logo */}
//           <Link to={"/"} className="flex items-center gap-2">
//             <span className="rounded-full bg-gradient-to-br from-orange-400 via-yellow-300 to-blue-400 p-1">
//               <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
//                 <path
//                   d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C0 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 0 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z"
//                   fill="#FF4D00"
//                 ></path>
//               </svg>
//             </span>
//             <span className="font-bold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-300 dark:to-blue-500">
//               Logisti Core
//             </span>
//           </Link>

//           {/* 🔹 Desktop Navigation */}
//           <NavigationMenu className="max-md:hidden ml-8">
//             <NavigationMenuList className="gap-2">
//               {filteredLinks.map((link, i) => (
//                 <NavigationMenuItem key={i}>
//                   <NavigationMenuLink
//                     asChild
//                     className={`px-3 py-2 rounded-lg font-medium transition-all ${
//                       isLinkActive(link.href)
//                         ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
//                         : "text-muted-foreground hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-blue-950/40"
//                     }`}
//                   >
//                     <Link to={link.href}>{link.label}</Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>

//         {/* ===== Right Section ===== */}
//         <div className="flex items-center gap-2">
//           <ModeToggle />
//           {isLoggedIn ? (
//             <>
//               <Button asChild size="sm" className="max-md:hidden text-sm">
//                 <Link to={`/${userRole}/myprofile`}>My Profile</Link>
//               </Button>
//               <Button onClick={handleLogout} size="sm" className="text-sm">
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button asChild variant="ghost" size="sm" className="text-sm">
//                 <Link to="/login">Sign In</Link>
//               </Button>
//               <Button asChild size="sm" className="text-sm">
//                 <Link to="/register">Get Started</Link>
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
