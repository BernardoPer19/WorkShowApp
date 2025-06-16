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
import { useSave } from "../../projects/hooks/useSave";


export default function ProfilePage() {
  const { currentUser } = useAuthContext();
  const { userProject } = useProject();
  const { savedProjects } = useSave();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  return (
    <div className="  flex flex-col justify-center items-center min-h-screen bg-gray-50  m-auto">
      <main className="min-w-[1280px] container">
        {/* Profile Header */}
        <ProfileHeader currentUser={currentUser} />

        {/* Content Tabs */}
        <div className="container px-4 py-8 ">
          <Tabs defaultValue="projects" className="w-full">
            <div className="flex items-center justify-between mb-8 ">
              <TabsList>
                <TabsTrigger value="projects">
                  Proyectos ({userProject?.data ? userProject.data.length : 0})
                </TabsTrigger>
                <TabsTrigger value="collections">
                  Guardados ({savedProjects ? savedProjects.length : 0})
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
            <AboutUser currentUser={currentUser} />
          </Tabs>
        </div>
      </main>
    </div>
  );
}
