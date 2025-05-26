-- CreateTable
CREATE TABLE "categories" (
    "category_d" UUID NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_d")
);

-- CreateTable
CREATE TABLE "collection_projects" (
    "collection_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,

    CONSTRAINT "collection_projects_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "collections" (
    "collection_id" UUID NOT NULL,
    "name_collection" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "createCollection_at" UUID NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("collection_id")
);

-- CreateTable
CREATE TABLE "commets" (
    "commet_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6),

    CONSTRAINT "likes_pkey" PRIMARY KEY ("commet_id")
);

-- CreateTable
CREATE TABLE "follows" (
    "follewer_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,
    "create_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("follewer_id")
);

-- CreateTable
CREATE TABLE "likes" (
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "createdLike_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "likes_pkey1" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "project_media" (
    "media_:id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "project_media_pkey" PRIMARY KEY ("media_:id")
);

-- CreateTable
CREATE TABLE "projects" (
    "project_id" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "demo_url" VARCHAR(200) NOT NULL,
    "createProject_at" TIMETZ(6) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "bio" TEXT DEFAULT '',
    "avatar_url" VARCHAR(200) DEFAULT '',
    "portafolio_url" VARCHAR(200) DEFAULT '',
    "profession" VARCHAR(30),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "collection_projects" ADD CONSTRAINT "collection_projects_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("collection_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_projects" ADD CONSTRAINT "collection_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "llaveForanea" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "commets" ADD CONSTRAINT "commets_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "commets" ADD CONSTRAINT "fkeyCommets" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follower_id" FOREIGN KEY ("follewer_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "following_id" FOREIGN KEY ("following_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_media" ADD CONSTRAINT "project_media_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_d") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
