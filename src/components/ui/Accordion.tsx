import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { easeExpo } from '@/lib/motion'

interface AccordionItem {
  question: string
  answer: string
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className={cn('border-t border-graphite', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`

        return (
          <div key={item.question} className="border-b border-graphite">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={cn(
                    'text-lg font-medium transition-colors duration-300 md:text-xl',
                    isOpen ? 'text-bone' : 'text-bone/70 group-hover:text-bone',
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'relative flex size-9 shrink-0 items-center justify-center border transition-colors duration-500 ease-expo',
                    isOpen ? 'border-signal bg-signal' : 'border-smoke group-hover:border-bone/50',
                  )}
                >
                  <span className="absolute h-px w-3.5 bg-bone" />
                  <span
                    className={cn(
                      'absolute h-3.5 w-px bg-bone transition-transform duration-500 ease-expo',
                      isOpen && 'scale-y-0',
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeExpo }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 leading-relaxed text-ash">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
