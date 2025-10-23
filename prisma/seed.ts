import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing stages
  await prisma.stage.deleteMany();
  console.log('✅ Cleared existing stages');

  // Seed stages from the frontend code
  const stages = [
    {
      order: 1,
      title: 'Stage 1: Format Code Correctly',
      description: 'Fix the indentation and formatting of this JavaScript code',
      type: 'code-format',
      challenge: 'function hello(){console.log("Hello");return true;}',
      solution: 'function hello() {\n  console.log("Hello");\n  return true;\n}',
      hint: 'Add proper line breaks and indentation (2 spaces)',
    },
    {
      order: 2,
      title: 'Stage 2: Click Image to Debug Code',
      description: 'Debug the code below to fix the error',
      type: 'debug',
      challenge: 'const sum = (a, b) => { return a - b; }',
      solution: 'const sum = (a, b) => { return a + b; }',
      hint: 'The function should add, not subtract',
    },
    {
      order: 3,
      title: 'Stage 3: Generate Numbers',
      description: 'Write code to generate all numbers from 0 to 1000',
      type: 'generate-numbers',
      challenge: '',
      solution: 'for (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}',
      hint: 'Use a for loop from 0 to 1000',
    },
    {
      order: 4,
      title: 'Stage 4: Data Transformation',
      description: 'Convert CSV data to JSON format',
      type: 'data-transform',
      challenge: 'name,age,city\nJohn,25,NYC\nJane,30,LA',
      solution: '[{"name":"John","age":"25","city":"NYC"},{"name":"Jane","age":"30","city":"LA"}]',
      hint: 'Parse CSV and create an array of objects',
    },
  ];

  for (const stage of stages) {
    await prisma.stage.create({
      data: stage,
    });
    console.log(`✅ Created stage: ${stage.title}`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

