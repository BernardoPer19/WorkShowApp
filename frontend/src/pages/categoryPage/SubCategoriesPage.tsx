import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectGrid from "./components/SubCategory/ProjectGrid";
import TecnologiesCategory from "./components/SubCategory/TecnologiesCategory";
import HeroSection from "./components/SubCategory/HeroSection";
import { projectsByCategory } from "./mocks/featuredProjects2";
import CTAsection from "./components/Category/CTAsection";
import { categoryInfo } from "./mocks/CategoryInfo";

export default function SubCategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const normalizedCategoryName = categoryName?.toLowerCase() || "desarrollo";

  const currentCategoryInfo =
    categoryInfo[normalizedCategoryName] || categoryInfo["desarrollo"];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "newest">("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const allProjectsForCategory =
    projectsByCategory[normalizedCategoryName] || [];

  const filteredProjects = allProjectsForCategory
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .sort((a, b) => {
      if (sortBy === "popular") return b.likes - a.likes;
      return 0;
    });

  useEffect(() => {
    setSearchQuery("");
    setSortBy("popular");
    setViewMode("grid");
  }, [normalizedCategoryName]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <HeroSection
          category={currentCategoryInfo.title}
          descriptionCategory={currentCategoryInfo.description}
          tecnologiesAndTools={currentCategoryInfo.technologies}
          selectedCategory={normalizedCategoryName}
          sortBy={sortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setSortBy={(option: string) => {
            if (option === "popular" || option === "newest") setSortBy(option);
          }}
          setSelectedCategory={() => {}}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <TecnologiesCategory
          category={normalizedCategoryName}
        />

        <ProjectGrid
          setSearchQuery={setSearchQuery}
          setSelectedCategory={() => {}}
          filteredProjects={filteredProjects}
          viewMode={viewMode}
        />

        <CTAsection />
      </main>
    </div>
  );
}
