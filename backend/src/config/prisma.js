const { PrismaClient } = require("@prisma/client");

// Singleton — dùng chung 1 instance Prisma Client cho toàn bộ ứng dụng, tránh mở quá nhiều connection pool tới database.
const prisma = new PrismaClient();

module.exports = prisma;
