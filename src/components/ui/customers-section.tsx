import React from "react"
import { AnimatedGroup } from "@/components/ui/animated-group"
import Image from "next/image"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export interface CustomerLogo {
  src: string
  alt: string
  height: number
}

interface CustomersSectionProps {
  customers: CustomerLogo[]
  className?: string
}

export function CustomersSection({ customers = [], className }: CustomersSectionProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.3,
                },
              },
            },
            ...transitionVariants,
          }}
          className="mx-auto grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {customers.map((logo, index) => (
            <div key={index} className="flex items-center justify-center p-6">
              <Image
                className="h-16 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110 dark:invert"
                src={logo.src}
                alt={logo.alt}
                height={logo.height}
                width={120}
              />
            </div>
          ))}
        </AnimatedGroup>
      </div>
    </div>
  )
}