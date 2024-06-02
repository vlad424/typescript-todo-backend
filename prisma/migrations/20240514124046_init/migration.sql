-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IArrayTasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "IArrayTasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ITask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "iArrayTasksId" INTEGER,

    CONSTRAINT "ITask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ILists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ILists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateCreate" TEXT NOT NULL,
    "dateAt" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "IListsId" INTEGER,

    CONSTRAINT "IList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "IArrayTasks" ADD CONSTRAINT "IArrayTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ITask" ADD CONSTRAINT "ITask_iArrayTasksId_fkey" FOREIGN KEY ("iArrayTasksId") REFERENCES "IArrayTasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ILists" ADD CONSTRAINT "ILists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IList" ADD CONSTRAINT "IList_IListsId_fkey" FOREIGN KEY ("IListsId") REFERENCES "ILists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
