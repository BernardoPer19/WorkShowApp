import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

import { TabsContent } from "../../../../components/ui/tabs";

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

function Collections() {
  return (
    <div>
      {" "}
      <TabsContent value="collections">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={collection.coverImage || "/placeholder.svg"}
                  alt={collection.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{collection.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{collection.projectCount} proyectos</span>
                  <Button variant="ghost" size="sm">
                    Ver Colección
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
}

export default Collections;
