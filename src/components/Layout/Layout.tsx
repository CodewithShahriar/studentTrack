
import React from "react";
import Header from "./Header";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {currentUser && (
        <footer className="bg-gray-50 py-4 border-t">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} StudentTrack. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
