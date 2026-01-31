export interface ProjectItem {
  id: string
  title: string
  description: string
  previewImg: string
  modalMedia: string
  mediaType: 'image' | 'video'
  deployLink?: string
  githubLink?: string
  iconColor: 'light' | 'dark'
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

export const ALLPROJECTS: ProjectItem[] = [
  {
    id: 'tools',
    title: 'Tools',
    description: 'Secure - free - fast',
    deployLink: 'https://tool.nosirjonov.uz',
    githubLink: '',
    previewImg: '/tool.png',
    modalMedia: '/tool.png',
    mediaType: 'image',
    iconColor: 'dark',
  },
  {
    id: 'salom-ui',
    title: 'Salom UI ~ (WIP)',
    description: 'UI library built with shadcn registry.',
    deployLink: 'https://salom.nosirjonov.uz',
    githubLink: 'https://github.com/acadbek/salom-ui',
    previewImg: '/void.webp',
    modalMedia: '/void.webp',
    mediaType: 'image',
    iconColor: 'dark',
  },
  {
    id: 'cs-web',
    title: 'Counter Strike Web ~ (WIP)',
    description: 'Play classic Counter Strike in your browser.',
    deployLink: 'https://game-beta-gray-52.vercel.app/',
    githubLink: 'https://github.com/Acadbek/game',
    previewImg: '/cs.webp',
    modalMedia: '/cs.mp4',
    mediaType: 'video',
    iconColor: 'light',
  },
  {
    id: '100-days',
    title: '100 ~ (WIP)',
    description: 'My 100-day project of exploring design, compform, and new things.',
    deployLink: 'https://100-idea.vercel.app/air-friction',
    githubLink: 'https://github.com/Acadbek/100',
    previewImg: '/100.webp',
    modalMedia: '/100.webm',
    mediaType: 'video',
    iconColor: 'light',
  },
  {
    id: 'mixed-grid',
    title: 'MIXED GRID',
    description: 'Creative site where I used Next.js, GSAP and Three.js together for transitions.',
    deployLink: 'https://canal-demo-ruddy.vercel.app/',
    githubLink: '',
    previewImg: '/mixed-grid.png',
    modalMedia: '/mixed-grid.png',
    mediaType: 'image',
    iconColor: 'dark',
  },
  {
    id: 'mentora-ai',
    title: 'Mentora AI (WIP)',
    description: 'Smart AI tutor for effective learning.',
    deployLink: 'https://mentoraai.vercel.app',
    githubLink: 'https://github.com/acadbek/mentora-ai',
    previewImg: '/mentora.webp',
    modalMedia: '/mentora.webp',
    mediaType: 'image',
    iconColor: 'dark',
  },
  {
    id: 'pentesting-notes',
    title: 'Pentesting Notes',
    description: 'Web vulnerabilities, exploitation and defense guide.',
    deployLink: 'https://pentesting-notes.vercel.app/docs/category/http-asoslari-va-parametrlarni-boshqarish/',
    githubLink: 'https://github.com/Acadbek/pentesting-notes',
    previewImg: '/pennotes.webp',
    modalMedia: '/pennotes.webp',
    mediaType: 'image',
    iconColor: 'dark',
  },
  {
    id: 'parametric-2d',
    title: 'Parametric 2D drawing',
    description: 'Built with Konva.js',
    deployLink: 'https://parametric-2d-drawing.vercel.app/',
    githubLink: 'https://github.com/acadbek/parametric-2d-drawing',
    previewImg: '/2d.webp',
    modalMedia: '/2d.webm',
    mediaType: 'video',
    iconColor: 'dark',
  },
  {
    id: 'likes-extension',
    title: 'Likes',
    description: 'Firefox extension',
    githubLink: 'https://github.com/acadbek/likes-extention',
    previewImg: '/likes-extention-preview.webp',
    modalMedia: '/likes-extention.webm',
    mediaType: 'video',
    iconColor: 'light',
  },
  {
    id: 'immersive-webgl',
    title: 'Immersive WebGL Portfolio',
    description: 'Immersive WebGL experience built with Three.js & PixiJS.',
    deployLink: 'https://three-pixi.vercel.app/',
    githubLink: 'https://github.com/Acadbek/three-pixi-sfera-landing',
    previewImg: '/three-pixi.png',
    modalMedia: '/three-pixi.png',
    mediaType: 'image',
    iconColor: 'light',
  },
  {
    id: 'ascii-donut',
    title: 'Ascii donut',
    description: 'Web version of the classic ascii donut in javascript',
    deployLink: 'https://ascii-donut-puce.vercel.app/',
    githubLink: 'https://github.com/acadbek/ascii-donut',
    previewImg: '/ascii-donut.webp',
    modalMedia: '/donut.webm',
    mediaType: 'video',
    iconColor: 'light',
  },
  {
    id: 'chrome-theme',
    title: 'Chrome Theme - Moto',
    description: 'A sleek and modern Chrome theme inspired by motorcycle aesthetics.',
    deployLink: 'https://ascii-donut-puce.vercel.app/',
    githubLink: 'https://github.com/Acadbek/chrome-theme',
    previewImg: '/chrome-theme.webp',
    modalMedia: '/chrome-theme.webp',
    mediaType: 'image',
    iconColor: 'light',
  },
  {
    id: 'rish-template',
    title: 'Rish',
    description: 'A blazing fast React + TailwindCSS + React Router Dom + Shadcn UI starter template.',
    deployLink: 'https://www.npmjs.com/package/rish/',
    githubLink: 'https://github.com/Acadbek/rish',
    previewImg: '/rish.webp',
    modalMedia: '/rish.webm',
    mediaType: 'video',
    iconColor: 'dark',
  },
  {
    id: 'theme-switcher',
    title: 'Theme Switcher Component',
    description: 'Customizable dark-mode toggle component detecting system preference.',
    deployLink: 'https://www.npmjs.com/package/@nosirjonov/dark-mode/',
    githubLink: 'https://github.com/Acadbek/dark-mode-component',
    previewImg: '/theme-switcher.webp',
    modalMedia: '/theme-switcher.webp',
    mediaType: 'image',
    iconColor: 'dark',
  },
  {
    id: 'remove-bg',
    title: 'Remove image background',
    description: 'Tool for removing image backgrounds effortlessly.',
    deployLink: 'https://remove-ibg.netlify.app/',
    githubLink: 'https://github.com/Acadbek/remove-background',
    previewImg: '/remove-bg.webp',
    modalMedia: '/remove-bg.webp',
    mediaType: 'image',
    iconColor: 'light',
  },
  {
    id: 'game-canvas',
    title: 'Game',
    description: 'A fun and interactive game built with js and canvas.',
    deployLink: 'https://gamewithjs.netlify.app/',
    githubLink: 'https://github.com/Acadbek/game-js-and-canvas',
    previewImg: '/game-inviders.webp',
    modalMedia: '/game.webm',
    mediaType: 'video',
    iconColor: 'light',
  },
  {
    id: 'liquid-glass',
    title: 'Liquid Glass Apple Effect (Contribution)',
    description: 'The Ultimate Liquid Glass UI - Recreate for the Web.',
    deployLink: 'https://liquid-glass-studio.vercel.app/',
    githubLink: 'https://github.com/Acadbek/liquid-glass-studio',
    previewImg: '/liquid-glass.webp',
    modalMedia: '/liquid-glass.webp',
    mediaType: 'image',
    iconColor: 'light',
  },
  {
    id: 'linux-command',
    title: 'Linux Command (Contribution)',
    description: 'A Linux command search tool featuring manuals, detailed explanations.',
    deployLink: 'https://linux-command-azure-theta.vercel.app/c/7z.html/',
    githubLink: 'https://github.com/Acadbek/linux-command',
    previewImg: '/linux-command.webp',
    modalMedia: '/linux-command.webp',
    mediaType: 'image',
    iconColor: 'light',
  },
]

export const PROJECTS: ProjectItem[] = ALLPROJECTS.slice(0, 4);

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
