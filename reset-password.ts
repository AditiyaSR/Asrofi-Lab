import { db } from './src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  try {
    const user = await db.adminUser.findFirst();
    if (user) {
      const newHash = await bcrypt.hash('password', 10);
      await db.adminUser.update({
        where: { id: user.id },
        data: { password: newHash }
      });
      console.log('Password reset successfully to: password');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await db.$disconnect();
  }
}
main();
