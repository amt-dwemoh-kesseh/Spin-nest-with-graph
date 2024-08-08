-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "note" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
