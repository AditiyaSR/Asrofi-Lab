import { db } from './src/lib/db';

async function main() {
  try {
    const user = await db.adminUser.findFirst();
    if (user) {
        console.log('Testing session creation for', user.id);
        const sessionToken = "test-token" + Date.now();
        const session = await db.session.create({
            data: {
                sessionToken,
                userId: user.id,
                expires: new Date(Date.now() + 86400 * 1000)
            }
        });
        console.log("Session created successfully:", session.id);
        // cleanup test session
        await db.session.delete({ where: { id: session.id } });
        console.log("Session cleaned up");
    }
  } catch (error) {
    console.error('Database connection or query failed:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
