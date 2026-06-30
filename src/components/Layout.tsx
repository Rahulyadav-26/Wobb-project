import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { savedProfiles } = useListStore();

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl mt-2">{title}</h1>}
        </div>
        <Link to="/list" className="text-blue-600 hover:underline flex items-center gap-2">
          My List
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
            {savedProfiles.length}
          </span>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
