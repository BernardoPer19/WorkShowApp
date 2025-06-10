-- CreateTable
CREATE TABLE "Categories" (
    "category_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Collection_projects" (
    "collection_projects_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,

    CONSTRAINT "Collection_projects_pkey" PRIMARY KEY ("collection_projects_id")
);

-- CreateTable
CREATE TABLE "Collections" (
    "collection_id" UUID NOT NULL,
    "name_collection" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "createCollection_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "Commets" (
    "commet_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "likes_pkey" PRIMARY KEY ("commet_id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "follewer_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,
    "create_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("follewer_id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "createdLike_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "likes_pkey1" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Project_media" (
    "media:id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Project_media_pkey" PRIMARY KEY ("media:id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "project_id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "demo_url" VARCHAR(200) NOT NULL,
    "createProject_at" TIMETZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Tecnologies" (
    "tecnology_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tecnologies_pkey" PRIMARY KEY ("tecnology_id")
);

-- CreateTable
CREATE TABLE "ProjectTecnology" (
    "project_id" UUID NOT NULL,
    "tecnology_id" UUID NOT NULL,

    CONSTRAINT "ProjectTecnology_pkey" PRIMARY KEY ("project_id","tecnology_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "bio" TEXT DEFAULT '',
    "avatar_url" VARCHAR(200) DEFAULT '',
    "portafolio_url" VARCHAR(200) DEFAULT '',
    "profession" VARCHAR(30),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_projects_collection_id_project_id_key" ON "Collection_projects"("collection_id", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tecnologies_name_key" ON "Tecnologies"("name");

-- AddForeignKey
ALTER TABLE "Collection_projects" ADD CONSTRAINT "Collection_projects_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collections"("collection_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Collection_projects" ADD CONSTRAINT "Collection_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "llaveForanea" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Commets" ADD CONSTRAINT "Commets_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Commets" ADD CONSTRAINT "fkeyCommets" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "follower_id" FOREIGN KEY ("follewer_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "following_id" FOREIGN KEY ("following_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Project_media" ADD CONSTRAINT "Project_media_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTecnology" ADD CONSTRAINT "ProjectTecnology_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTecnology" ADD CONSTRAINT "ProjectTecnology_tecnology_id_fkey" FOREIGN KEY ("tecnology_id") REFERENCES "Tecnologies"("tecnology_id") ON DELETE RESTRICT ON UPDATE CASCADE;
