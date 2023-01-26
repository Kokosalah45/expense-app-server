import { PrismaClient } from '@prisma/client';
import { report, reportType } from '../src/expense-reports/reportsTypes';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const hashPassword = async (password: string, generatedSalt: string) =>
  await bcrypt.hash(password, generatedSalt);

const generateReport = (source: string, amount: number) => {
  const type: reportType = Math.random() > 0.2 ? 'INCOME' : 'EXPENSE';
  return { source, amount, type };
};
async function main() {
  // const userPass: string[] = ['1234', '12345', '123456', '1234567', '12345678'];
  // const generatedSalt = await bcrypt.genSalt(10);
  // const hashedPasswords = await Promise.all([
  //   hashPassword(userPass[0], generatedSalt),
  //   hashPassword(userPass[1], generatedSalt),
  //   hashPassword(userPass[2], generatedSalt),
  //   hashPassword(userPass[3], generatedSalt),
  //   hashPassword(userPass[4], generatedSalt),
  // ]);
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       email: 'koko@de7ka.com',
  //       name: 'Kerolous',
  //       password: hashedPasswords[0],
  //     },
  //     {
  //       email: 'mrmr@de7ka.com',
  //       name: 'Nardin',
  //       password: hashedPasswords[1],
  //     },
  //     { email: 'meme@de7ka.com', name: 'Amged', password: hashedPasswords[2] },
  //     { email: 'amona@de7ka.com', name: 'Eman', password: hashedPasswords[3] },
  //     {
  //       email: 'mermer@de7ka.com',
  //       name: 'Mariam',
  //       password: hashedPasswords[4],
  //     },
  //   ],
  // });
  const userIds = await prisma.user.findMany({ select: { id: true } });
  const data = [
    { ...generateReport('youtube', 7500), userId: userIds[0].id },
    { ...generateReport('waiter', 3500), userId: userIds[1].id },
    { ...generateReport('freelancing', 2000), userId: userIds[2].id },
    { ...generateReport('webdev job', 6000), userId: userIds[3].id },
    { ...generateReport('shawerma', 6000), userId: userIds[4].id },
    { ...generateReport('drugs', 2200), userId: userIds[0].id },
    { ...generateReport('twitch', 7342), userId: userIds[1].id },
    { ...generateReport('ecommerce', 6753), userId: userIds[2].id },
    { ...generateReport('control room', 2222), userId: userIds[3].id },
    { ...generateReport('body care', 2222), userId: userIds[4].id },
  ];
  console.log(data);
  await prisma.expense.createMany({
    data,
  });

  console.log(userIds);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
