import Image from 'next/image'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from './morphing-dialog'
import { XIcon } from 'lucide-react'
import { ViewCounter } from './view-count'

type ProjectVideoProps = {
  src: string,
  previewImg: string,
  videoSvgColor?: string,
  id: string
}

export function ProjectImage({ src, previewImg, videoSvgColor, id }: ProjectVideoProps) {

  const incrementViewCount = async () => {
    console.log('Hiiiiiiiiiii');

    try {
      const response = await fetch(`/api/views/${id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to increment');
      }

      const data = await response.json();
      console.log('Views incremented:', data);
    } catch (err) {
      console.error('Failed to increment view count', err);
    }
  };

  return (
    <>
      {
        src.split('.').pop() === 'webp' ? (
          <Image
            width={871}
            height={502}
            priority={true}
            alt=""
            src={src}
            className="pointer-events-none absolute -z-50 opacity-0"
            sizes="(max-width: 768px) 100vw, 871px"
          />
        ) : <video
          autoPlay
          muted
          loop
          width={871}
          height={502}
          controls
          className="pointer-events-none absolute -z-50 opacity-0"
        >
          <source src={src} type="video/webm" />
        </video>
      }


      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.3,
        }}
      >
        <MorphingDialogTrigger onClick={incrementViewCount}>
          <div className='flex gap-3 absolute top-2 right-2'>
            {(src.split('.').pop()?.includes('webm') || src.split('.').pop()?.includes('mp4')) && <svg className='' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path fill={videoSvgColor} d="M21 26H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h17a2 2 0 0 1 2 2v4.06l5.42-3.87A1 1 0 0 1 30 9v14a1 1 0 0 1-1.58.81L23 19.94V24a2 2 0 0 1-2 2M4 8v16h17v-6a1 1 0 0 1 1.58-.81L28 21.06V10.94l-5.42 3.87A1 1 0 0 1 21 14V8Z" /></svg>}
            <ViewCounter svgColor={videoSvgColor} projectId={id} />
          </div>

          <>
            <Image
              priority={true}
              alt="Project preview image"
              width={284}
              height={162}
              src={previewImg}
              className="h-40 w-full cursor-zoom-in rounded-xl object-cover transition-transform"
            />
          </>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
            {src.split('.').pop() === 'webp' ? (
              <Image
                width={871}
                height={502}
                priority={true}
                alt="Project preview image"
                src={src}
                className="h-[50vh] w-full rounded-xl object-cover md:h-[70vh]"
                sizes="(max-width: 768px) 100vw, 871px"
              />
            ) :
              <>
                <video
                  muted
                  autoPlay
                  loop
                  controls
                  className="w-full rounded-xl object-cover md:h-[70vh]"
                >
                  <source src={src} type="video/webm" />
                </video>
              </>
            }
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
