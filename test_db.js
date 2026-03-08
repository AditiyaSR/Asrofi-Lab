const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function test() {
  const user = await prisma.adminUser.findUnique({ where: { email: 'admin@asrofi.lab' } });
  console.log('User:', user);
  if (user) {
    const match = await bcrypt.compare('admin123', user.password);
    console.log('Password match:', match);
  }
}
test().finally(() => prisma.$disconnect());
