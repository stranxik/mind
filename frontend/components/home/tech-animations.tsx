"use client"

import { motion } from "framer-motion"

export const RagAnimation = () => (
  <div className="aspect-square bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden relative">
    <motion.div 
      className="w-full h-full bg-transparent flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cercles concentriques animés */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-[1px] border-white/40"
            style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8
            }}
          >
            {/* Points sur les cercles */}
            {Array.from({ length: 6 }).map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                style={{
                  left: `${50 + Math.cos(j * (Math.PI / 3)) * 50}%`,
                  top: `${50 + Math.sin(j * (Math.PI / 3)) * 50}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: j * 0.3,
                }}
              />
            ))}
          </motion.div>
        ))}

        {/* Cercle lumineux rotatif */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'conic-gradient(from 0deg, transparent, white/10, transparent)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Points de données */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Icône centrale RAG */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <motion.div
          className="relative z-10 bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/30 backdrop-filter"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="w-16 h-16 relative">
            {/* Cercle externe */}
            <motion.div
              className="absolute inset-0 border-2 border-white rounded-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Point central */}
            <motion.div
              className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            {/* Points orbitaux */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                animate={{
                  x: [Math.cos(i * (Math.PI * 2 / 3)) * 24, Math.cos((i * (Math.PI * 2 / 3)) + Math.PI) * 24],
                  y: [Math.sin(i * (Math.PI * 2 / 3)) * 24, Math.sin((i * (Math.PI * 2 / 3)) + Math.PI) * 24],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lignes de connexion */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              width: '100%',
              top: `${20 * (i + 1)}%`,
              transform: `rotate(${i * 30}deg)`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scaleX: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
)

export const LearningAnimation = () => (
  <div className="aspect-square bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden relative">
    <motion.div 
      className="w-full h-full bg-transparent flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Lignes horizontales animées */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              top: `${(i + 1) * 12}%`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleX: [0.8, 1, 0.8],
              x: ["-10%", "0%", "10%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Points de données */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Icône centrale Learning */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <motion.div
          className="relative z-10 bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/30 backdrop-filter"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="w-16 h-16 relative">
            {/* Grille de neurones */}
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/80 rounded-full"
                style={{
                  left: `${(i % 3) * 50}%`,
                  top: `${Math.floor(i / 3) * 50}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            {/* Connexions */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/30 h-[1px]"
                style={{
                  width: '20px',
                  left: `${(i % 3) * 40 + 10}%`,
                  top: `${Math.floor(i / 3) * 40 + 25}%`,
                  transform: `rotate(${i * 30}deg)`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lignes verticales */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
            style={{
              left: `${(i + 1) * 15}%`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scaleY: [0.8, 1, 0.8],
              y: ["-10%", "0%", "10%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
)

export const InterfaceAnimation = () => (
  <div className="aspect-square bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden relative">
    <motion.div 
      className="w-full h-full bg-transparent flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Carrés rotatifs */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-[1px] border-white/40"
            style={{
              width: `${(i + 1) * 140}px`,
              height: `${(i + 1) * 140}px`,
            }}
            animate={{
              rotate: [0, 180],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1,
            }}
          />
        ))}
      </div>

      {/* Points de données */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Icône centrale Interface */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <motion.div
          className="relative z-10 bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/30 backdrop-filter"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="w-16 h-16 relative">
            {/* Cadre de l'interface */}
            <motion.div
              className="absolute inset-2 border-2 border-white rounded-lg"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            {/* Éléments d'interface */}
            <motion.div
              className="absolute top-4 left-4 w-8 h-1 bg-white rounded-full"
              animate={{
                width: ["32px", "20px", "32px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute top-7 left-4 w-6 h-1 bg-white/60 rounded-full"
              animate={{
                width: ["24px", "28px", "24px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.3,
              }}
            />
            <motion.div
              className="absolute top-10 left-4 w-4 h-1 bg-white/40 rounded-full"
              animate={{
                width: ["16px", "24px", "16px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.6,
              }}
            />
            {/* Points interactifs */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  right: "6px",
                  top: `${4 + i * 3}px`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Petits carrés animés */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-white/30 rounded-sm"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [0.8, 1, 0.8],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
) 