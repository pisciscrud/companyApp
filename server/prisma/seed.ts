import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const seeder = new PrismaClient();

const bootstrap = async () => {
  try {
    const hash = await bcrypt.hash('password', 5);

    await seeder.user.create({
      data: {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: hash,
      },
    });
  } catch (error: any) {
    console.error(error);
  } finally {
    await seeder.$disconnect();
  }
};

bootstrap();
