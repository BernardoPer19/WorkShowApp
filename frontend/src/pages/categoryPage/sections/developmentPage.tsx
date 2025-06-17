import { useState } from "react";
import { featuredProjects } from "../mocks/featuredProjects";
import CategoriesPage from "../categories";
import CTAsection from "../components/SubCategory/CTAsection";
import ProjectGrid from "../components/SubCategory/ProjectGrid";
import TecnologiesCategory from "../components/SubCategory/TecnologiesCategory";
import HeroSection from "../components/SubCategory/HeroSection";
// Mock data for web development projects

export default function WebDevelopmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = featuredProjects.filter(
    (project) =>
      (selectedCategory === "all" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <HeroSection
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          setViewMode={setViewMode}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Popular Frameworks */}
        <TecnologiesCategory/>

        <ProjectGrid
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
          filteredProjects={filteredProjects}
          viewMode={viewMode}
        />

        {/* Categories Section */}
        <CategoriesPage />

        {/* CTA Section */}
        <CTAsection />
      </main>
    </div>
  );
}
