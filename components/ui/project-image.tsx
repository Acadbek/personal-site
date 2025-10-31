import Image from 'next/image'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from './morphing-dialog'
import { XIcon } from 'lucide-react'

type ProjectVideoProps = {
  src: string
}

export function ProjectImage({ src }: ProjectVideoProps) {
  return (
    <>
      {/* Katta rasmni yashirin holatda preload qilish */}
      <Image
        width={871}
        height={502}
        priority={true}
        alt=""
        src={src}
        className="pointer-events-none absolute -z-50 opacity-0"
        sizes="(max-width: 768px) 100vw, 871px"
      />

      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.3,
        }}
      >
        <MorphingDialogTrigger>
          <Image
            priority={true}
            alt="Project preview image"
            width={284}
            height={162}
            src={src}
            className="h-max w-full cursor-zoom-in rounded-xl object-cover transition-transform"
          />
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
            <Image
              width={871}
              height={502}
              priority={true}
              alt="Project preview image"
              src={src}
              className="h-[50vh] w-full rounded-xl object-cover md:h-[70vh]"
              sizes="(max-width: 768px) 100vw, 871px"
            />
          </MorphingDialogContent>
          <MorphingDialogClose
            className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1 shadow-lg"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          >
            <XIcon className="h-5 w-5 text-zinc-500" />
          </MorphingDialogClose>
        </MorphingDialogContainer>
      </MorphingDialog>
    </>
  )
}
