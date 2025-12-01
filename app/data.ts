type Project = {
  name: string
  description: string
  link: string
  src: string
  id: string,
  srcCode: string
  srcCodePrivate?: boolean
  previewImg: string
  isOnline?: boolean,
  videoSvgColor?: string,
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
    link: 'https://salom.nosirjonov.uz',
    src: '/void.webp',
    previewImg: '/void.webp',
    srcCode: 'https://github.com/acadbek/salom-ui',
    isOnline: true,
    id: 'project3',
  },
  {
    name: 'Counter Strike Web ~ (WIP)',
    description: 'Play classic Counter Strike in your browser.',
    link: 'https://game-beta-gray-52.vercel.app/',
    src: '/cs.mp4',
    srcCode: 'https://github.com/Acadbek/game',
    previewImg: '/cs.webp',
    videoSvgColor: '#FFFFFF',
    isOnline: true,
    id: 'project3sdfswe-cs-web',
  },
  {
    name: 'Immersive WebGL Portfolio',
    description: 'Immersive WebGL experience built with Three.js & PixiJS.',
    link: 'https://three-pixi.vercel.app/',
    src: '/three-pixi.png',
    srcCode: 'https://github.com/Acadbek/three-pixi-sfera-landing',
    previewImg: '/three-pixi.png',
    id: 'project22424asdasdasdasdthree-pixi',
    videoSvgColor: '#FFFFFF',
    isOnline: true,
  },
  {
    name: 'Parametric 2D drawing',
    description: 'Build with Konvajs',
    link: 'https://parametric-2d-drawing.vercel.app/',
    src: '/2d.webp',
    srcCode: 'https://github.com/acadbek/parametric-2d-drawing',
    previewImg: '/2d.webp',
    id: 'project2',
    isOnline: true,
  },
]

export const ALLPROJECTS: Project[] = [
  {
    name: 'Salom UI ~ (WIP)',
    description: 'UI library built with shadcn registry.',
    link: 'https://salom.nosirjonov.uz',
    src: '/void.webp',
    srcCode: 'https://github.com/acadbek/salom-ui',
    previewImg: '/void.webp',
    isOnline: true,
    id: 'project3',
  },
  {
    name: 'Counter Strike Web ~ (WIP)',
    description: 'Play classic Counter Strike in your browser.',
    link: 'https://game-beta-gray-52.vercel.app/',
    src: '/cs.mp4',
    srcCode: 'https://github.com/Acadbek/game',
    previewImg: '/cs.webp',
    videoSvgColor: '#FFFFFF',
    isOnline: true,
    id: 'project3sdfswe-cs-web',
  },
  {
    name: '100 ~ (WIP)',
    description: ' My 100-day project of exploring design, compform, and new things.',
    link: 'https://100-idea.vercel.app/air-friction',
    src: '/100.webm',
    srcCode: 'https://github.com/Acadbek/100',
    previewImg: '/100.webp',
    videoSvgColor: '#FFFFFF',
    isOnline: true,
    id: 'project3sdfswe',
  },
  {
    name: 'Mentora AI (WIP)',
    description: 'Smart AI tutor for effective learning.',
    link: 'https://mentoraai.vercel.app',
    src: '/mentora.webp',
    srcCode: 'https://github.com/acadbek/mentora-ai',
    previewImg: '/mentora.webp',
    id: 'project3-mentora-ai',
    isOnline: true,
  },
  {
    name: 'Pentesting Notes',
    description: 'Web vulnerabilities, exploitation and defense guide.',
    link: 'https://pentesting-notes.vercel.app/docs/category/http-asoslari-va-parametrlarni-boshqarish/',
    src: '/pennotes.webp',
    srcCode: 'https://github.com/Acadbek/pentesting-notes',
    previewImg: '/pennotes.webp',
    id: 'project1',
    isOnline: true,
  },
  {
    name: 'Parametric 2D drawing',
    description: 'Build with Konvajs',
    link: 'https://parametric-2d-drawing.vercel.app/',
    src: '/2d.webm',
    videoSvgColor: '#000000',
    srcCode: 'https://github.com/acadbek/parametric-2d-drawing',
    previewImg: '/2d.webp',
    id: 'project2',
    isOnline: true,
  },
  {
    name: 'Likes',
    description: 'Firefox extention',
    link: '#',
    src: '/likes-extention.webm',
    videoSvgColor: '#FFFFFF',
    srcCode: 'https://github.com/acadbek/likes-extention',
    previewImg: '/likes-extention-preview.webp',
    id: 'project223',
    srcCodePrivate: true,
    isOnline: false,
  },
  {
    name: 'Immersive WebGL Portfolio',
    description: 'Immersive WebGL experience built with Three.js & PixiJS.',
    link: 'https://three-pixi.vercel.app/',
    src: '/three-pixi.png',
    srcCode: 'https://github.com/Acadbek/three-pixi-sfera-landing',
    previewImg: '/three-pixi.png',
    id: 'project22424asdasdasdasdthree-pixi',
    videoSvgColor: '#FFFFFF',
    isOnline: true,
  },
  {
    name: 'Ascii donut',
    description: 'Web version of the classic ascii donut in javascript',
    link: 'https://ascii-donut-puce.vercel.app/',
    videoSvgColor: '#FFFFFF',
    src: '/donut.webm',
    srcCode: 'https://github.com/acadbek/ascii-donut',
    previewImg: '/ascii-donut.webp',
    id: 'project2242324',
    isOnline: true,
  },
  {
    name: 'Chrome Theme - Moto',
    description: 'A sleek and modern Chrome theme inspired by motorcycle aesthetics.',
    link: 'https://ascii-donut-puce.vercel.app/',
    src: '/chrome-theme.webp',
    srcCode: 'https://github.com/Acadbek/chrome-theme',
    previewImg: '/chrome-theme.webp',
    id: 'project22424',
    videoSvgColor: '#FFFFFF',
    isOnline: false,
  },
  {
    name: 'Rish',
    description: 'A blazing fast React + TailwindCSS + React Router Dom + Shadcn UI starter template ready in 10 seconds!',
    link: 'https://www.npmjs.com/package/rish/',
    src: '/rish.webm',
    srcCode: 'https://github.com/Acadbek/rish',
    previewImg: '/rish.webp',
    id: 'project2234',
    isOnline: true,
  },
  {
    name: 'Theme Switcher Component',
    description: 'Customizable dark-mode toggle component detecting system preference, saving user choice.',
    link: 'https://www.npmjs.com/package/@nosirjonov/dark-mode/',
    src: '/theme-switcher.webp',
    srcCode: 'https://github.com/Acadbek/dark-mode-component',
    previewImg: '/theme-switcher.webp',
    id: 'project2224',
    isOnline: true,
  },
  {
    name: 'Remove image background',
    description: 'Tool for removing image backgrounds effortlessly.',
    link: 'https://remove-ibg.netlify.app/',
    src: '/remove-bg.webp',
    srcCode: 'https://github.com/Acadbek/remove-background',
    previewImg: '/remove-bg.webp',
    videoSvgColor: '#FFFFFF',
    id: 'project2243',
    isOnline: true,
  },
  {
    name: 'Game',
    description: 'A fun and interactive game built with js and canvas.',
    link: 'https://gamewithjs.netlify.app/',
    videoSvgColor: '#FFFFFF',
    src: '/game.webm',
    srcCode: 'https://github.com/Acadbek/game-js-and-canvas',
    previewImg: '/game-inviders.webp',
    id: 'project224dsf3',
    isOnline: true,
  },
  {
    name: 'Liquid Glass Apple Effect (Contribution)',
    description: 'The Ultimate Liquid Glass UI - Recreate for the Web.',
    link: 'https://liquid-glass-studio.vercel.app/',
    src: '/liquid-glass.webp',
    srcCode: 'https://github.com/Acadbek/liquid-glass-studio',
    videoSvgColor: '#FFFFFF',
    previewImg: '/liquid-glass.webp',
    isOnline: true,
    id: 'project3sdfswe-liquid-glass',
  },
  {
    name: 'Linux Command (Contribution)',
    description: 'A Linux command search tool featuring manuals, detailed explanations, learning resources, and collections.',
    link: 'https://linux-command-azure-theta.vercel.app/c/7z.html/',
    src: '/linux-command.webp',
    srcCode: 'https://github.com/Acadbek/linux-command',
    videoSvgColor: '#FFFFFF',
    previewImg: '/linux-command.webp',
    isOnline: true,
    id: 'project3sdfsasdasfwe',
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
    description:
      'Identify and test SQL Injection vulnerabilities in Node.js websites.',
    link: '/blog/sql-injection-vulnerabilities',
  },
  {
    title: "SSRF [O'zbek tilida]",
    description:
      'Understand SSRF, exploitation techniques, detection methods, and practical mitigation strategies.',
    link: '/blog/ssrf',
    uid: 'blog-0',
  },
  {
    title: "All posts [O'zbek tilida]",
    description: 'Hands-on pentesting tutorials, tools and tips',
    link: 'https://pentesting-notes.vercel.app/docs/category/http-asoslari-va-parametrlarni-boshqarish',
    uid: 'blog--0',
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
