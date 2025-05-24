import { AnimatedBackground } from '@/components/motion-primitives/animated-background';
import { Magnetic } from '@/components/motion-primitives/magnetic'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { TextLoop } from '@/components/motion-primitives/text-loop';
import { ModeToggle } from '@/components/mode-toggle';
import { sendGreeting } from '@/services/greeting';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/motion-primitives/dialog';
import {
  MorphingPopover,
  MorphingPopoverContent,
} from '@/components/motion-primitives/morphing-popover';
import { useId, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from "sonner"
import { experiences, publications, contact, name, job } from '@/data';

const Home = () => {
  const [show, setShow] = useState(false);
  const springOptions = { bounce: 0.1 };

  const clonedExperiences = [...experiences]

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const uniqueId = useId();
  const [note, setNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setNote('');
    setIsOpen(false);
  };

  const customVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 40,
    },
  };

  const customTransition = {
    type: 'spring',
    bounce: 0,
    duration: 0.25,
  };

  const [direction, setDirection] = useState(-1);

  const selectedProjects = [
    {
      id: 1,
      name: 'Parametric 2D Art',
      description: 'Draw and edit 2D shapes using dynamic parametric inputs.',
      link: 'https://parametric-2d-drawing.vercel.app/',
    },
    {
      id: 2,
      name: 'Admin Panel',
      description: 'Manage users, problems, and submissions with clean admin interface',
      link: 'https://leetcode-admin-panel.vercel.app/',
    },
    {
      id: 3,
      name: 'Pentesting Notes',
      description: 'A collection of pentesting notes and interview questions.',
      link: 'https://pentesting-notes.vercel.app/docs/category/http-asoslari-va-parametrlarni-boshqarish',
    },
    {
      id: 4,
      name: 'CodeBattle',
      description: 'A platform for competitive programming and coding challenges.',
      link: 'https://leetcode-clone-vert.vercel.app/',
    }
  ]

  const fadeUpStyle = `transition-all mt-12 duration-800 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`

  return (
    <main className="container relative max-w-3xl mx-auto p-4 pb-0">
      <header className='mt-10'>
        <h1 className='text-primary select-none text-[19px] font-raleway'>{name}</h1>
        <TextEffect delay={0.6} className='text-gray-600 dark:text-gray-400 mt-1 font-raleway' per='char' preset='fade'>
          {job}
        </TextEffect>
      </header>

      <section className={fadeUpStyle}>
        <article className='mt-10'>
          <p className='text-gray-500 font-raleway tracking-wide'>
            I believe <span className='text-primary'>less is powerful</span>. I don't just write code — I design experiences.
            No unnecessary gradients, no chaos. Just clean layouts, sharp components, and strong hierarchy.

            Give me a rough wireframe or just a crazy idea — I’ll turn it into something <span className='text-primary'>modern, lightweight, and beautiful</span>.
          </p>

          <p className='mt-3 text-gray-500 font-raleway'>
            I’m not just a developer. I think like an <span className='text-primary'>attacker</span> too.

            While others stop at pretty pixels, I go deeper:
            testing inputs, breaking flows, and poking around places users were never meant to go. <span className='text-primary'>CSS to XSS</span>.
          </p>
        </article>
        <div className='flex items-center gap-4 mt-8'>
          <Magnetic
            intensity={0.2}
            springOptions={springOptions}
            actionArea='global'
            range={100}
          >
            <Button
              variant='outline'
              className='rounded-full w-20 pl-5 h-7 text-[13px] border-black hover:bg-black hover:text-white'
            >
              <Magnetic
                intensity={0.1}
                springOptions={springOptions}
                actionArea='global'
                range={100}
              >
                <Link to='/Asad-Nosirov.CV.pdf' target='_blank' className='flex items-center'>
                  <span className='font-raleway'>Resume</span>
                  <svg className='rotate-145' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m9.402 12.5l1.636 2.942q.143.293-.075.497t-.49.044l-5.187-3.306q-.378-.242-.378-.677t.378-.677l5.187-3.306q.273-.161.49.044t.076.497L9.402 11.5H21q.214 0 .357.143T21.5 12t-.143.357T21 12.5z" />
                  </svg>
                </Link>
              </Magnetic>
            </Button>
          </Magnetic>
          <p className='text-gray-500 text-sm flex items-center gap-1'>
            <span className='animate-pulse inline-block w-[7px] h-[7px] rounded-full bg-green-500 mr-1'> </span>
            <span className='font-raleway'>Currently on the job market</span>
          </p>
        </div>
      </section>

      <section className={fadeUpStyle}>
        <p className='text-primary text-[18px]'>Selected Projects</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 px-3'>
          {
            selectedProjects.map((project) => (
              <div key={project.id}>
                <Link to={project.link} target='_blank' className='flex items-center gap-1 hover:underline'>
                  <span className='tracking-wide'>{project.name}</span>
                  <svg className='rotate-145' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="gray" d="m9.402 12.5l1.636 2.942q.143.293-.075.497t-.49.044l-5.187-3.306q-.378-.242-.378-.677t.378-.677l5.187-3.306q.273-.161.49.044t.076.497L9.402 11.5H21q.214 0 .357.143T21.5 12t-.143.357T21 12.5z" />
                  </svg>
                </Link>
                <p className='mt-2 text-gray-500 text-sm font-raleway'>
                  {project.description}
                </p>
              </div>
            ))
          }
        </div>
      </section>

      <section className={fadeUpStyle}>
        <p className='text-primary text-[18px]'>Experiences</p>
        <div className='flex flex-col gap-2 mt-6'>
          {clonedExperiences.reverse().map((experience) => (
            <div key={experience.id} className='px-3'>
              <div className='flex items-center justify-between border px-3 py-4 rounded-2xl'>
                <div>
                  <p className='text-primary'>{experience.whoami}</p>
                  <p className='text-muted-foreground text-sm mt-1 font-raleway'>{experience.company}</p>
                </div>
                <p className='text-muted-foreground text-sm mt-1'>{experience.start} - {experience.end}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={fadeUpStyle}>
        <p className='text-primary text-[18px] mb-3'>Publications</p>
        <AnimatedBackground
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
          className='rounded-2xl bg-zinc-100 dark:bg-zinc-800'>
          {publications.map((publication) => (
            <Link
              to={publication.link}
              target='_blank'
              data-id={`card-${publication.id}`}
              key={publication.id}
            >
              <div className='px-3 py-4'>
                <div className='flex items-center justify-between'>
                  <div className='relative'>
                    <p className='text-primary'>{publication.title}</p>
                    <p className='text-muted-foreground text-sm mt-2 italic'>{publication.description}</p>
                    <svg className='rotate-145 absolute right-1 top-0' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="gray" d="m9.402 12.5l1.636 2.942q.143.293-.075.497t-.49.044l-5.187-3.306q-.378-.242-.378-.677t.378-.677l5.187-3.306q.273-.161.49.044t.076.497L9.402 11.5H21q.214 0 .357.143T21.5 12t-.143.357T21 12.5z" />
                    </svg>
                  </div>
                </div>
                <p className='text-muted-foreground font-light text-base font-raleway mt-2'>{publication.date}</p>
              </div>
            </Link>
          ))}
        </AnimatedBackground>
      </section>

      <section className={fadeUpStyle}>
        <p className='text-[18px] mb-3'>Contact</p>
        <div className='px-3 flex items-center gap-2'>
          <div className='text-muted-foreground font-raleway text-sm flex items-center gap-2'>
            Feel free to contact me at
            <Magnetic
              intensity={0.2}
              springOptions={springOptions}
              actionArea='global'
              range={50}
            >
              <span
                className='transition-all duration-200 '
              >
                <Magnetic
                  intensity={0.1}
                  springOptions={springOptions}
                  actionArea='global'
                  range={50}
                >
                  <span className='text-primary cursor-pointer'>ibnnumon@gmail.com</span>
                </Magnetic>
              </span>
            </Magnetic>

            or
            <Magnetic>
              {/* <span className='text-primary cursor-pointer'>say 👋</span> */}
              <Dialog open={isOpen} onOpenChange={setIsOpen} variants={customVariants} transition={customTransition}>
                {/* <DialogTrigger className='bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'>
                  Join the waitlist
                </DialogTrigger> */}
                <DialogTrigger>
                  <span className='text-primary cursor-pointer'>say 👋</span>
                </DialogTrigger>
                <DialogContent className='h-[200px] border-none w-[364px] bg-white dark:bg-zinc-900'>
                  <MorphingPopover
                    className='h-[200px] w-[364px]'
                    transition={{
                      type: 'spring',
                      bounce: 0.05,
                      duration: 0.3,
                    }}
                    open={true}
                  >
                    <MorphingPopoverContent className='rounded-md border border-zinc-950/10 bg-white p-0 shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] dark:bg-zinc-700'>
                      <div className='h-[200px] w-[364px]'>
                        <form
                          className='flex  flex-col h-[200px]'
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (note.trim()) {
                              sendGreeting(note);
                              setNote("");
                              setIsOpen(false);
                              toast("Sent.");
                            }
                          }}
                        >
                          <motion.span
                            layoutId={`popover-label-${uniqueId}`}
                            aria-hidden='true'
                            style={{
                              opacity: note ? 0 : 1,
                            }}
                            className='text-sm pt-4 px-4 text-zinc-400 select-none dark:text-zinc-400'
                          >
                            Add a Note (if you'd like)
                          </motion.span>
                          <textarea
                            className='absolute p-4 h-[200px] w-[364px] resize-none rounded-md bg-transparent text-sm outline-hidden'
                            autoFocus
                            onChange={(e) => setNote(e.target.value)}
                          />
                          <div className='absolute bottom-0 w-full bg-white dark:bg-zinc-700'>
                            <div key='close' className='w-full flex justify-between py-3 pr-4 pl-2'>
                              <button
                                type='button'
                                className='flex items-center rounded-lg bg-white px-2 py-1 text-sm text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600'
                                onClick={closeMenu}
                                aria-label='Close popover'
                              >
                                <ArrowLeftIcon
                                  size={16}
                                  className='text-zinc-900 dark:text-zinc-100'
                                />
                              </button>
                              <button
                                type='submit'
                                className='relative ml-1 flex h-8 w-12 shrink-0 scale-100 appearance-none items-center justify-center rounded-full border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800'
                                aria-label='Submit note'>
                                👋
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </MorphingPopoverContent>
                  </MorphingPopover>
                </DialogContent>
              </Dialog>
            </Magnetic>
          </div>
        </div>

        <div className='my-6 flex items-center gap-4'>
          {
            contact.map((item) => (
              <Magnetic
                key={item.id}
                intensity={0.2}
                springOptions={springOptions}
                actionArea='global'
                range={40}
              >
                <Button
                  variant='secondary'
                  className='rounded-full w-20 pl-5 h-7 text-[13px] hover:bg-black hover:border-black hover:text-white'
                  onClick={() => {
                    window.open(item.link, '_blank');
                  }}
                >
                  <Magnetic
                    intensity={0.1}
                    springOptions={springOptions}
                    actionArea='global'
                    range={40}
                  >
                    <div className='flex items-center'>
                      <span className='font-raleway'>{item.name}</span>
                      <svg className='rotate-145 ml-1' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m9.402 12.5l1.636 2.942q.143.293-.075.497t-.49.044l-5.187-3.306q-.378-.242-.378-.677t.378-.677l5.187-3.306q.273-.161.49.044t.076.497L9.402 11.5H21q.214 0 .357.143T21.5 12t-.143.357T21 12.5z" />
                      </svg>
                    </div>
                  </Magnetic>
                </Button>
              </Magnetic>
            ))
          }
        </div>
      </section>

      <footer className={`border-t flex items-center justify-between py-3 transition-all mt-12 duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <TextLoop
          className='text-sm'
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 19,
            mass: 1.2,
          }}
          interval={2.5}
          onIndexChange={(index) => {
            () => setDirection(index === 0 ? -1 : 1);
          }}
          variants={{
            initial: {
              y: -direction * 20,
              rotateX: -direction * 90,
              opacity: 0,
              filter: 'blur(4px)',
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: 'blur(0px)',
            },
            exit: {
              y: -direction * 20,
              rotateX: -direction * 90,
              opacity: 0,
              filter: 'blur(4px)',
            },
          }}
        >
          <Link to='https://github.com/acadbek' target='_blank' className='text-muted-foreground text-xs'>
            © 2025 Asad Nosirov
          </Link>
          <Link to='https://github.com/acadbek' target='_blank' className='text-muted-foreground text-xs'>Stay</Link>
        </TextLoop>
        <div className="flex items-center gap-6">
          <Link to='/comments' className='text-muted-foreground font-raleway text-xs'>Comments</Link>
          <ModeToggle />
        </div>
      </footer>
    </main>
  )
}

export default Home