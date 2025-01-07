"use client"

import { motion } from "framer-motion"

const GraphAnimation = () => (
  <motion.div 
    className="relative w-full h-64 bg-[#1F2937] rounded-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="absolute inset-0 grid grid-cols-8 gap-0.5 opacity-20">
      {Array.from({ length: 64 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-blue-500"
          initial={{ height: "0%" }}
          animate={{ height: Math.random() * 100 + "%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1
          }}
        />
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-32 h-32"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
          <path
            d="M50 5 L95 75 L5 75 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </div>
  </motion.div>
)

const GridAnimation = () => (
  <motion.div 
    className="relative w-full h-64 bg-[#1F2937] rounded-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-4">
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-gray-700 rounded"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.4,
            delay: i * 0.02,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2
          }}
        />
      ))}
    </div>
  </motion.div>
)

const NetworkAnimation = () => (
  <motion.div 
    className="relative w-full h-64 bg-[#1F2937] rounded-lg overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-48 h-48">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-blue-500 rounded-full"
            animate={{
              x: Math.cos(i * (Math.PI / 3)) * 60,
              y: Math.sin(i * (Math.PI / 3)) * 60,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-500 rounded-full"
              animate={{ scale: [1, 2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{ opacity: 0.2 }}
            />
          </motion.div>
        ))}
        <motion.div
          className="absolute inset-0 m-auto w-6 h-6 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  </motion.div>
)

export function AnimatedFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <GraphAnimation />
      <GridAnimation />
      <NetworkAnimation />
    </div>
  )
} 