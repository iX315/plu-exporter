import { randomUUID } from "crypto"

import { PrismaClient, Prisma } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

const homepageData: Prisma.HomepageCreateInput[] = [
  // Key Value
  {
    key: 'name',
    value: 'Deli-taste'
  },
  {
    key: 'description',
    value: 'Where Every Meal Tells a Story. A family-owned restaurant group rooted in tradition.'
  },
  {
    key: 'address',
    value: 'Downtown, 124 Street'
  },
  {
    key: 'established',
    value: '2004'
  },
  {
    key: 'hero',
    value: 'https://static.funwero.xyz/images/placeholder/hero.jpg'
  },
  {
    key: 'logo',
    value: 'https://static.funwero.xyz/images/placeholder/delitaste.png'
  },
  {
    key: 'phone',
    value: '123 456789'
  },
  {
    key: 'email',
    value: 'foobar@deli-taste.restaurant'
  },
  {
    key: 'instagram',
    value: 'delitaste'
  },
  {
    key: 'twitter',
    value: '@delitaste'
  },
  {
    key: 'youtube',
    value: 'delitaste'
  }
]
const groupData: Prisma.GroupCreateInput[] = [
  { uuid: randomUUID(), name: 'Starters', description: '', language: 'en', page: 1, post: '', pre: '' },
  { uuid: randomUUID(), name: 'Main', description: '', language: 'en', page: 1, post: '', pre: '' },
  { uuid: randomUUID(), name: 'Desserts', description: '', language: 'en', page: 1, post: '', pre: '' }
]
const allergensData: Prisma.AllergenCreateInput[] = [
  { uuid: randomUUID(), id: 1, description: 'Milk', language: 'en', name: 'Lactose' }
]
const productsData: Prisma.ProductCreateInput[] = [
  { uuid: randomUUID(), plu: 1, name: 'Miso Soup', image: '/placeholder/miso.jpeg', price: '7,00 €', group: {connect: { uuid: groupData[0].uuid }}, description: '', details: '', page: 1, size: '', language: 'en' },
  { uuid: randomUUID(), plu: 2, name: 'Braised Short Rib', image: '/placeholder/short-rib.jpg', description: 'Twelve-hour braised beef short rib with creamy polenta, gremolata, and red wine reduction.',  group: {connect: { uuid: groupData[1].uuid }}, details: '', page: 1, size: '', price: '42,00 €', language: 'en' },
  { uuid: randomUUID(), plu: 3, name: 'Whole Grilled Lobster', image: '/placeholder/lobster.jpg', description: 'Maine lobster grilled over wood fire, served with drawn butter, corn on the cob, and coleslaw.',  group: {connect: { uuid: groupData[1].uuid }}, details: '', page: 1, size: '', price: '58,00 €', language: 'en' },
  { uuid: randomUUID(), plu: 4, name: 'Panna cotta', image: '/placeholder/panna-cotta.jpeg', description: '',  group: {connect: { uuid: groupData[2].uuid }}, details: '', page: 1, size: '', price: '12,00 €', allergens: {connect: { uuid: allergensData[0].uuid }}, language: 'en' }
]
const ordersData: Prisma.OrderCreateInput[] = [
  { uuid: randomUUID(), datetime: new Date('01.02.2026 12:10:32'), type: 'ORDER', plu: 2, customer: 'Table 1' },
  { uuid: randomUUID(), datetime: new Date('01.02.2026 12:11:00'), type: 'PROCESSING', plu: 2, customer: 'Table 1' },
  { uuid: randomUUID(), datetime: new Date('01.02.2026 12:11:00'), type: 'SERVED', plu: 2, customer: 'Table 1' },
  { uuid: randomUUID(), datetime: new Date('01.02.2026 12:36:00'), type: 'ORDER', plu: 4, customer: 'Table 2' }
]

async function main() {
  for (const u of homepageData) {
    await prisma.homepage.create({ data: u });
  }
  for (const u of groupData) {
    await prisma.group.create({ data: u });
  }
  for (const u of allergensData) {
    await prisma.allergen.create({ data: u });
  }
  for (const u of productsData) {
    await prisma.product.create({ data: u });
  }
  for (const u of ordersData) {
    await prisma.order.create({ data: u });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
