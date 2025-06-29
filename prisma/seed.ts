import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@atia.com" },
    update: {},
    create: {
      email: "admin@atia.com",
      password,
      role: "ADMIN",
      name: "Admin User",
    },
  });
  console.log("Admin user created: admin@atia.com / admin123");

  // Create sample events for testing
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Check if events already exist to avoid duplicates
  const existingEvents = await prisma.event.findMany({
    where: {
      title: {
        in: [
          "Conférence Innovation 2024",
          "Workshop Développement Web",
          "Hackathon IA 2023",
          "Meetup Startups",
        ],
      },
    },
  });

  if (existingEvents.length === 0) {
    // Featured upcoming event
    await prisma.event.create({
      data: {
        title: "Conférence Innovation 2024",
        subtitle: "L'avenir de la technologie",
        description:
          "Une conférence majeure sur les dernières innovations technologiques et leurs impacts sur la société.",
        startDate: nextWeek,
        endDate: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
        location: "Centre de Congrès, Tunis",
        attendees: "500+ participants",
        featured: true,
        published: true,
        status: "UPCOMING",
        authorId: adminUser.id,
      },
    });

    // Ongoing event
    await prisma.event.create({
      data: {
        title: "Workshop Développement Web",
        subtitle: "React et Next.js",
        description:
          "Un workshop pratique sur le développement web moderne avec React et Next.js.",
        startDate: yesterday,
        endDate: tomorrow,
        location: "Espace Coworking, Sfax",
        attendees: "50 participants",
        featured: false,
        published: true,
        status: "ONGOING",
        authorId: adminUser.id,
      },
    });

    // Completed event
    await prisma.event.create({
      data: {
        title: "Hackathon IA 2023",
        subtitle: "Intelligence Artificielle",
        description:
          "Un hackathon de 48h sur l'intelligence artificielle et le machine learning.",
        startDate: lastWeek,
        endDate: new Date(lastWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
        location: "Université de Tunis",
        attendees: "200 participants",
        featured: true,
        published: true,
        status: "COMPLETED",
        authorId: adminUser.id,
      },
    });

    // Regular upcoming event
    await prisma.event.create({
      data: {
        title: "Meetup Startups",
        subtitle: "Écosystème startup tunisien",
        description:
          "Un meetup mensuel pour connecter les entrepreneurs et investisseurs.",
        startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        location: "Impact Hub, Tunis",
        attendees: "100 participants",
        featured: false,
        published: true,
        status: "UPCOMING",
        authorId: adminUser.id,
      },
    });

    console.log("Sample events created successfully");
  } else {
    console.log("Sample events already exist, skipping creation");
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
