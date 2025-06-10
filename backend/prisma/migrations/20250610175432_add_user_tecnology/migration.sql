-- CreateTable
CREATE TABLE "UserTecnology" (
    "user_id" UUID NOT NULL,
    "tecnology_id" UUID NOT NULL,

    CONSTRAINT "UserTecnology_pkey" PRIMARY KEY ("user_id","tecnology_id")
);

-- AddForeignKey
ALTER TABLE "UserTecnology" ADD CONSTRAINT "UserTecnology_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTecnology" ADD CONSTRAINT "UserTecnology_tecnology_id_fkey" FOREIGN KEY ("tecnology_id") REFERENCES "Tecnologies"("tecnology_id") ON DELETE RESTRICT ON UPDATE CASCADE;
