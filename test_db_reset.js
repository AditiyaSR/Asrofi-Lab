const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAndTest() {
  const hash = await bcrypt.hash('admin123', 10);
  console.log('Generated new hash:', hash);
  const user = await prisma.adminUser.update({
    where: { email: 'admin@asrofi.lab' },
    data: { password: hash }
  });
  console.log('User updated:', user.email);
  
  // Test it immediately
  const match = await bcrypt.compare('admin123', user.password);
  console.log('Password match now:', match);
}
resetAndTest().finally(() => prisma.$disconnect());
