type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Salom UI ~ (WIP)',
    description: 'UI library built with shadcn registry.',
    link: '#',
    video: '/void.webp',
    id: 'project3',
  },
  {
    name: 'Mentora AI',
    description: 'Smart AI tutor for effective learning.',
    link: 'https://mentoraai.vercel.app',
    video: '/mentora.webp',
    id: 'project3',
  },
  {
    name: 'Pentesting Notes',
    description:
      'Web vulnerabilities, exploitation and defense guide.',
    link: 'https://pentest.nosirjonov.uz/docs/category/http-asoslari-va-parametrlarni-boshqarish/',
    video: '/pennotes.webp',
    id: 'project1',
  },
  {
    name: 'Parametric 2D drawing',
    description: 'Build with Konvajs',
    link: 'https://parametric-2d-drawing.vercel.app/',
    video: '/2d.webp',
    id: 'project2',
  },
]

export const ALLPROJECTS: Project[] = [
  {
    name: 'Salom UI ~ (WIP)',
    description: 'UI library built with shadcn registry.',
    link: 'https://salom.nosirjonov.uz',
    video: '/void.webp',
    id: 'project3',
  },
  {
    name: 'Mentora AI',
    description: 'Smart AI tutor for effective learning.',
    link: 'https://mentoraai.vercel.app',
    video: '/mentora.webp',
    id: 'project3',
  },
  {
    name: 'Pentesting Notes',
    description:
      'Web vulnerabilities, exploitation and defense guide.',
    link: 'https://pentesting-notes.vercel.app/docs/category/http-asoslari-va-parametrlarni-boshqarish/',
    video: '/pennotes.webp',
    id: 'project1',
  },
  {
    name: 'Parametric 2D drawing',
    description: 'Build with Konvajs',
    link: 'https://parametric-2d-drawing.vercel.app/',
    video: '/2d.webp',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Own projects and freelancing',
    title: 'Web pentester & Frontend engineer',
    start: '2025',
    end: 'Present',
    link: 'https://github.com/acadbek',
    id: 'work0000',
  },
  {
    company: 'Ustudy by Uzinfocom',
    title: 'Frontend mentor',
    start: '2025',
    end: 'Present',
    link: 'https://b2bmarket.uz',
    id: 'work000',
  },
  {
    company: 'B2B Market',
    title: 'Frontend engineer',
    start: '2025',
    end: '2025',
    link: 'https://b2bmarket.uz',
    id: 'work00',
  },
  {
    company: 'Blaze ERP',
    title: 'Frontend engineer',
    start: '2024',
    end: '2024',
    link: 'https://blaze.uz',
    id: 'work0',
  },
  {
    company: "Najot Ta'lim",
    title: 'Frontend mentor',
    start: '2022',
    end: '2023',
    link: 'https://najottalim.uz',
    id: 'work1',
  },
  {
    company: 'Codetech.io',
    title: 'Frontend Developer',
    start: '2022',
    end: '2022',
    link: 'https://google.com',
    id: 'work2',
  },
  {
    company: 'UIC Group',
    title: 'Frontend Developer',
    start: '2021',
    end: '2022',
    link: 'https://uic.group',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description:
      'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
  {
    uid: 'blog-1',
    title: "SQL Injection vulnerabilities [O'zbek tilida]",
    description: 'Identify and test SQL Injection vulnerabilities in Node.js websites.',
    link: '/blog/sql-injection-vulnerabilities',
  },
  {
    title: "SSRF [O'zbek tilida]",
    description: "Understand SSRF, exploitation techniques, detection methods, and practical mitigation strategies.",
    link: "/blog/ssrf",
    uid: "blog-0"
  },
  {
    title: "All posts [O'zbek tilida]",
    description: "Hands-on pentesting tutorials, tools and tips",
    link: "https://pentesting-notes.vercel.app/docs/category/http-asoslari-va-parametrlarni-boshqarish",
    uid: "blog--0"
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/acadbek',
  },
  {
    label: 'X',
    link: 'https://x.com/acadb3k',
  },
  {
    label: 'Bsky',
    link: 'https://bsky.app/profile/asadbe.bsky.social',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/asadnosirov/',
  },
]

export const EMAIL = 'ibnnumon@gmail.com'
