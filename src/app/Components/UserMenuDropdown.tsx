import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { routes } from '../Constants/Constants';
import authService from '../Services/authService';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

export default function UserMenuDropdown() {
    const [isDropdown, setIsDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const logout = async () => {
        try {
            await authService.logout();
            await signOut();
            router.push("/");
            sessionStorage.clear();
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative text-left" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button 
                onClick={() => setIsDropdown((prev) => !prev)} 
                className="flex justify-center items-center pe-1 rounded-md px-0 py-0 text-sm font-semibold text-gray-900 hover:bg-gray-200 opacity-70"
            >
                {isDropdown ? 
                    <MdOutlineKeyboardArrowDown className="-mr-1 h-5 w-5 text-white" /> : 
                    <MdOutlineKeyboardArrowUp className="-mr-1 h-5 w-5 text-white" />
                }
            </button>

            {/* Dropdown Menu */}
            {isDropdown && (
                <div className="absolute right-0 z-10 mt-2 w-28 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md">
                    <div className="py-1">
                        <Link 
                            href={routes.aboutUser} 
                            className="block px-4 py-2 w-full text-center font-bold text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Profile
                        </Link>
                        <button 
                            onClick={logout} 
                            className="block w-full px-4 py-2 text-sm font-bold text-gray-700 text-center hover:bg-gray-100 hover:text-gray-900"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
