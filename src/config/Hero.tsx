
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
// Technology Components
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
    TypeScript: TypeScript,
    ReactIcon: ReactIcon,
    NextJs: NextJs,
    PostgreSQL: PostgreSQL,
    NodeJs: NodeJs,
    MongoDB: MongoDB,
    Prisma: Prisma,
    JavaScript: JavaScript,
};

export const heroConfig = {
    // Personal Information
    name: 'Kunal Roy',
    title: ['A Full Stack Web developer.', 'A Design Enthusiast.', 'Small details matter.'],
    avatar: '/assets/logoNew.png',
    banner: '/assets/banner.jpeg',
    role: 'Full Stack web developer and design enthusiast.',
    location: 'New Delhi, India',
    email: 'kunalroy267483@gmail.com',
    phone: '+91 9870429459',
    website: 'https://yonko-portfolio.vercel.app',
    gender: 'He/Him',

    // Description Configuration
    description: {
        template:
            'I build interactive web apps using {skills:0}, {skills:1}, {skills:2} and {skills:3}. With a focus on <b>UI</b> design. Enthusiastic about <b>Three.js</b>, driven by a keen eye for design.',
    },

};
