import { useState } from "react";
import { categories } from "./mocks/categories";
import HeroSection from "./components/Category/HeroSection";
import CategoriesGrid from "./components/Category/CategoriesGrid";
import ProjectsByCategory from "./components/Category/ProjectsByCategory";
  
export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />

        <CategoriesGrid filteredCategories={filteredCategories} />

        {/* Featured Projects by Category */}
        <ProjectsByCategory />
      </main>
    </section>
  );
}
