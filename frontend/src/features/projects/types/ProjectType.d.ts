export interface ProjectTypes {
    project_id:       string;
    title:            string;
    description:      string;
    user_id:          string;
    category_id:      string;
    demo_url:         string;
    createProject_at: Date;
    duration:         string;
    descCorta:        string;
    images:           string[];
    tecnologies:      string[];
    users:            Users;
    categories:       Categories;
}

export interface Categories {
    name: string;
}

export interface Users {
    username:        string;
    lastname:        string;
    email:           string;
    bio:             string;
    name:            string;
    profession:      string;
    avatar_url:      string;
    userTecnologies: string[];
}
