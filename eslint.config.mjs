import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ),
  ...compat.extends('plugin:mdx/recommended'),

  // ✅ Ignore patterns qo'shing
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/.cache/**',
      '**/public/**',
    ],
  },

  // ✅ Rules override (ixtiyoriy - agar ba'zi qoidalarni o'chirmoqchi bo'lsangiz)
  {
    rules: {
      'prettier/prettier': 'warn', // Error o'rniga warning
      '@typescript-eslint/no-explicit-any': 'warn', // any'ni ruxsat berish
      'react/no-unescaped-entities': 'off', // Quote'larni escape qilishni o'chirish
      '@typescript-eslint/no-unused-vars': 'warn', // Ishlatilmagan o'zgaruvchilar - warning
    },
  },
]

export default eslintConfig
