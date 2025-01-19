-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantDetails" (
    "id" SERIAL NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "contactNum" TEXT,
    "city" TEXT,
    "upiQrUrl" TEXT,
    "WeekendWorking" TEXT DEFAULT '9am-5pm',
    "WeekdaysWorking" TEXT DEFAULT '9am-12am',
    "userId" INTEGER NOT NULL,
    "Logo" TEXT,
    "Instagram" TEXT,
    "Facebook" TEXT,

    CONSTRAINT "RestaurantDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT,
    "bgColor" TEXT,
    "textColor" TEXT,
    "navbarColor" TEXT,
    "restaurantDetailsId" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantDetails_userId_key" ON "RestaurantDetails"("userId");

-- AddForeignKey
ALTER TABLE "RestaurantDetails" ADD CONSTRAINT "RestaurantDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurantDetailsId_fkey" FOREIGN KEY ("restaurantDetailsId") REFERENCES "RestaurantDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
