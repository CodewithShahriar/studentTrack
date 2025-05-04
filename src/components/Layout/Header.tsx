
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Book, LogOut } from "lucide-react";

const Header: React.FC = () => {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Book size={24} />
          <Link to="/" className="font-bold text-xl">
            StudentTrack
          </Link>
        </div>

        {currentUser ? (
          <div className="flex items-center gap-8">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/students" className="hover:underline">
                        Students
                      </Link>
                    </li>
                    <li>
                      <Link to="/attendance" className="hover:underline">
                        Attendance
                      </Link>
                    </li>
                    <li>
                      <Link to="/results" className="hover:underline">
                        Results
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="opacity-80">Logged in as </span>
                <span className="font-medium">{currentUser.name}</span>
                <span className="text-xs bg-white bg-opacity-20 rounded px-2 py-0.5 ml-2">
                  {isAdmin ? "Admin" : "Student"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hover:bg-white hover:bg-opacity-10"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <Button variant="outline" className="bg-white bg-opacity-10 hover:bg-opacity-20 border-white border-opacity-20">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
