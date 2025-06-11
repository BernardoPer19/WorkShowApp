import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

import { TabsContent } from "../../../../components/ui/tabs";

import { Calendar, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import type { UserType } from "../../schema/AuthSchema";

interface Props {
  currentUser?: UserType | undefined;
}

function AboutUser({ currentUser }: Props) {
  return (
    <div>
      <TabsContent value="about">
        <div className="max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Acerca de {currentUser?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Biografía</h3>
                <p className="text-muted-foreground">{currentUser?.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser?.tecnologies.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Información de Contacto</h3>
                <div className="space-y-2">
                  {currentUser?.portafolio_url && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Link
                        to={currentUser?.portafolio_url}
                        className="text-primary hover:underline"
                      >
                        {currentUser?.portafolio_url}
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Miembro desde {currentUser?.created_at}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
}

export default AboutUser;
