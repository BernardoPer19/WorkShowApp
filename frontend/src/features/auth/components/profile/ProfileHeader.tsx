import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Share,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { UserType } from "../../schema/AuthSchema";

const userData = {
  social: {
    github: "mariagarcia",
    linkedin: "maria-garcia-design",
    twitter: "maria_designs",
  },
};

interface Props {
  currentUser: UserType | undefined;
}

function ProfileHeader({ currentUser }: Props) {
  return (
    <div>
      <div className="bg-white border-b">
        <div className=" px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage
                  src={currentUser?.avatar_url || "/placeholder.svg"}
                />
                <AvatarFallback className="text-2xl">
                  {currentUser?.name}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {currentUser?.email} | {currentUser?.profession}
                  </h1>
                  <p className="text-muted-foreground mb-2">
                    @{currentUser?.username}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Se unió en {currentUser?.created_at}</span>
                    </div>
                  </div>
                </div>
                {/* Compartir perfil */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-2 mb-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" />
                            Compartir Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>Reportar Usuario</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 max-w-2xl">
                {currentUser?.bio}
              </p>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser?.tecnologies.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mb-6">
                {currentUser?.portafolio_url && (
                  <Link
                    to={currentUser?.portafolio_url}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Globe className="h-4 w-4" />
                    Sitio Web
                  </Link>
                )}
                {userData.social.github && (
                  <Link
                    to={`https://github.com/${userData.social.github}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                )}
                {userData.social.linkedin && (
                  <Link
                    to={`https://linkedin.com/in/${userData.social.linkedin}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Link>
                )}
                {userData.social.twitter && (
                  <Link
                    to={`https://twitter.com/${userData.social.twitter}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
