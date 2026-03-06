import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from './morphing-dialog'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function getVideoMimeType(src: string): string {
  const ext = src.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'mp4':
      return 'video/mp4'
    case 'webm':
      return 'video/webm'
    case 'ogg':
      return 'video/ogg'
    default:
      return 'video/webm'
  }
}

type VideoSource = {
  src: string
  type: string
}

function getVideoSources(src: string): VideoSource[] {
  const normalizedSrc = src.trim()
  const ext = normalizedSrc.split('.').pop()?.toLowerCase()

  const sources: VideoSource[] = [
    {
      src: normalizedSrc,
      type: getVideoMimeType(normalizedSrc),
    },
  ]

  if (ext === 'webm') {
    const mp4Fallback = normalizedSrc.replace(/\.webm$/i, '.mp4')
    if (mp4Fallback !== normalizedSrc) {
      sources.push({
        src: mp4Fallback,
        type: 'video/mp4',
      })
    }
  }

  return sources
}

type ProjectImageProps = {
  id: string
  previewImg: string
  modalMedia: string
  mediaType: 'image' | 'video'
  iconColor: 'light' | 'dark'
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ProjectImage({
  id,
  previewImg,
  modalMedia,
  mediaType,
  iconColor,
  isOpen,
  onOpenChange,
}: ProjectImageProps) {
  const [failedVideoSrc, setFailedVideoSrc] = useState<string | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const isVideo = mediaType === 'video'
  const hasVideoError = failedVideoSrc === modalMedia

  const videoSources = useMemo(() => getVideoSources(modalMedia), [modalMedia])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)')
    const updateTouchState = () => setIsTouchDevice(mediaQuery.matches)

    updateTouchState()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateTouchState)
      return () => mediaQuery.removeEventListener('change', updateTouchState)
    }

    mediaQuery.addListener(updateTouchState)
    return () => mediaQuery.removeListener(updateTouchState)
  }, [])

  const incrementViewCount = async () => {
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

  const iconHex = iconColor === 'light' ? '#FFFFFF' : '#000000';
  const modalContentClassName = isVideo
    ? 'relative h-[100dvh] w-screen bg-black p-0 md:h-auto md:w-auto md:rounded-2xl md:bg-zinc-50 md:p-1 md:ring-1 md:ring-zinc-200/50 md:ring-inset md:dark:bg-zinc-950 md:dark:ring-zinc-800/50'
    : 'relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50'
  const closeButtonClassName = isVideo
    ? 'fixed top-4 right-4 z-[60] h-fit w-fit rounded-full bg-black/70 p-2 shadow-lg backdrop-blur-sm md:top-6 md:right-6 md:bg-white md:p-1'
    : 'fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1 shadow-lg'
  const closeIconClassName = isVideo
    ? 'h-5 w-5 text-white md:text-zinc-500'
    : 'h-5 w-5 text-zinc-500'

  return (
    <>
      <Image
        width={871}
        height={502}
        priority={true}
        alt=""
        src={previewImg}
        className="pointer-events-none absolute -z-50 opacity-0"
        sizes="(max-width: 768px) 100vw, 871px"
      />

      <MorphingDialog
        open={isOpen}
        onOpenChange={onOpenChange}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
        }}
      >
        <MorphingDialogTrigger onClick={incrementViewCount}>
          <div className='flex gap-3 absolute top-2 right-2 items-center'>
            {mediaType === 'video' && (
              <svg className='' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                <path fill={iconHex} d="M21 26H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h17a2 2 0 0 1 2 2v4.06l5.42-3.87A1 1 0 0 1 30 9v14a1 1 0 0 1-1.58.81L23 19.94V24a2 2 0 0 1-2 2M4 8v16h17v-6a1 1 0 0 1 1.58-.81L28 21.06V10.94l-5.42 3.87A1 1 0 0 1 21 14V8Z" />
              </svg>
            )}
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
          <MorphingDialogContent className={modalContentClassName}>
            {mediaType === 'image' ? (
              <Image
                width={871}
                height={502}
                priority={true}
                alt="Project preview image"
                src={modalMedia}
                className="h-[50vh] w-full rounded-xl object-cover md:h-[70vh]"
                sizes="(max-width: 768px) 100vw, 871px"
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden bg-black md:aspect-[871/502] md:h-[70vh] md:rounded-xl md:bg-zinc-100/60 md:dark:bg-zinc-900/60">
                {hasVideoError ? (
                  <>
                    <Image
                      width={871}
                      height={502}
                      alt="Video preview unavailable"
                      src={previewImg}
                      className="absolute inset-0 h-full w-full object-contain md:object-cover"
                      sizes="(max-width: 768px) 100vw, 871px"
                    />
                    <p className="absolute inset-x-2 bottom-2 rounded-md bg-white/80 px-2 py-1 text-center text-xs text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200">
                      Video preview is unavailable on this browser.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFailedVideoSrc(null)}
                      className="absolute top-2 right-2 rounded-md bg-white/85 px-2 py-1 text-xs text-zinc-700 dark:bg-zinc-900/85 dark:text-zinc-200"
                    >
                      Retry
                    </button>
                  </>
                ) : (
                  <video
                    muted
                    autoPlay={!isTouchDevice}
                    loop={!isTouchDevice}
                    controls
                    playsInline
                    preload={isTouchDevice ? 'metadata' : 'auto'}
                    poster={previewImg}
                    onLoadedData={() => setFailedVideoSrc(null)}
                    onError={() => setFailedVideoSrc(modalMedia)}
                    className="absolute inset-0 h-full w-full object-contain md:object-cover"
                  >
                    {videoSources.map((source) => (
                      <source key={`${source.src}-${source.type}`} src={source.src} type={source.type} />
                    ))}
                  </video>
                )}
              </div>
            )}
          </MorphingDialogContent>
          <MorphingDialogClose
            className={closeButtonClassName}
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          >
            <XIcon className={cn(closeIconClassName)} />
          </MorphingDialogClose>
        </MorphingDialogContainer>
      </MorphingDialog>
    </>
  )
}
