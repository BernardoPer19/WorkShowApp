import { frameworks } from "./frameworks2";

export const categoryInfo: Record<
    string,
    {
        title: string;
        description: string;
        technologies: { id: string; name: string }[];
    }
> = {
    desarrollo: {
        title: "Desarrollo",
        description:
            "Explora proyectos de desarrollo web, móvil, backend y machine learning. Innovación en código.",
        technologies: frameworks.desarrollo.map((tech) => ({
            id: tech.name,
            name: tech.name,
        })),
    },
    diseño: {
        title: "Diseño",
        description:
            "Descubre proyectos visuales, branding, ilustración y diseño digital que impulsan la creatividad.",
        technologies: frameworks.diseño.map((tech) => ({
            id: tech.name,
            name: tech.name,
        })),
    },
    moda: {
        title: "Moda",
        description:
            "Sumérgete en el mundo de la moda: diseño de colecciones, estilismo, fotografía y tendencias.",
        technologies: frameworks.moda.map((tech) => ({
            id: tech.name,
            name: tech.name,
        })),
    },
    multimedia: {
        title: "Multimedia",
        description:
            "Explora proyectos de video, animación, sonido, podcasting y realidad virtual.",
        technologies: frameworks.multimedia.map((tech) => ({
            id: tech.name,
            name: tech.name,
        })),
    },
};
