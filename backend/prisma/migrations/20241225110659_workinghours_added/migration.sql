-- AlterTable
ALTER TABLE "RestaurantDetails" ADD COLUMN     "WeekdaysWorking" TEXT NOT NULL DEFAULT '9am-12am',
ADD COLUMN     "WeekendWorking" TEXT NOT NULL DEFAULT '9am-5pm';
