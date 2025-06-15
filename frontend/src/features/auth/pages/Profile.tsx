import { useState } from "react";
import { Button } from "../../../components/ui/button";

import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";

import { Grid3X3, List } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProjectsUser from "../components/profile/ProjectsUser";
import AboutUser from "../components/profile/AboutUser";
import Collections from "../components/profile/Collections";
import { useProject } from "../../projects/hooks/useProjectsApi";

// Mock user data

// const userProjects = [
//   {
//     id: 1,
//     title: "E-commerce Dashboard Redesign",
//     description:
//       "Complete redesign of an e-commerce admin dashboard with improved UX and modern design patterns.",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "UI/UX Design",
//     likes: 234,
//     comments: 18,
//     views: 1200,
//     tags: ["Dashboard", "E-commerce", "Figma", "UI/UX"],
//     createdAt: "2024-01-15",
//     demoUrl: "https://example.com/demo",
//   },
//   {
//     id: 2,
//     title: "Mobile Banking App",
//     description:
//       "Secure and intuitive mobile banking application with biometric authentication.",
//     image: "/placeholder.svg?height=400&width=300",
//     category: "Mobile Development",
//     likes: 189,
//     comments: 12,
//     views: 890,
//     tags: ["React Native", "Banking", "Security", "Mobile"],
//     createdAt: "2024-01-10",
//     demoUrl: "https://example.com/banking-demo",
//   },
//   {
//     id: 3,
//     title: "Brand Identity Package",
//     description:
//       "Complete branding solution including logo, color palette, and brand guidelines.",
//     image: "/placeholder.svg?height=250&width=400",
//     category: "Branding",
//     likes: 156,
//     comments: 24,
//     views: 670,
//     tags: ["Logo", "Branding", "Identity", "Design"],
//     createdAt: "2024-01-05",
//     demoUrl: "",
//   },
//   {
//     id: 4,
//     title: "SaaS Dashboard Interface",
//     description:
//       "Modern dashboard design for a SaaS analytics platform with data visualization.",
//     image: "/placeholder.svg?height=320&width=400",
//     category: "UI/UX Design",
//     likes: 312,
//     comments: 28,
//     views: 1580,
//     tags: ["SaaS", "Analytics", "Dashboard", "Data Viz"],
//     createdAt: "2023-12-20",
//     demoUrl: "https://example.com/saas-demo",
//   },
// ];

const collections = [
  {
    id: 1,
    name: "UI/UX Projects",
    description: "My best interface design work",
    projectCount: 12,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
  },
  {
    id: 2,
    name: "Mobile Apps",
    description: "Mobile application designs and prototypes",
    projectCount: 8,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
  },
];

export default function ProfilePage() {
  const { currentUser } = useAuthContext();
  const { allProjects } = useProject();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50  m-auto">
      <main className="">
        {/* Profile Header */}
        <ProfileHeader currentUser={currentUser} />

        {/* Content Tabs */}
        <div className="container px-4 py-8">
          <Tabs defaultValue="projects" className="w-full">
            <div className="flex items-center justify-between mb-8 ">
              <TabsList>
                <TabsTrigger value="projects">
                  Proyectos ({(allProjects?.data ? allProjects.data.length - 1 : 0)})
                </TabsTrigger>
                <TabsTrigger value="collections">
                  Colecciones ({collections.length})
                </TabsTrigger>
                <TabsTrigger value="about">Acerca de</TabsTrigger>
              </TabsList>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ProjectsUser viewMode={viewMode} />
            <Collections />
            <AboutUser />
          </Tabs>
        </div>
      </main>
    </div>
  );
}
