"use client";
import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "@/hooks/useUIStore";

export default function Loader() {
  const loaded = useUIStore((state) => state.loaded);
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="flex flex-col items-center gap-2 justify-center h-full bg-white dark:bg-black fixed z-50 top-0 left-0 w-full"
          exit={{ opacity: 0 }}
        >
          <svg
            id="a"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 114.68 48.73"
            className="h-24 md:h-48 animate-cycleUp"
          >
            <rect
              width="114.68"
              height="48"
              className="fill-[#e4e5e6] dark:fill-zinc-900"
            />
            <rect
              y="0"
              width="114"
              height="48"
              className="fill-black dark:fill-white "
            />
            <g id="b" data-name="outline">
              <path
                className="fill-white dark:fill-black"
                d="M21.88,26.62c-.88-6.98,4.66-15.01,12.37-17.95,1.18-.45,2.33-.73,3.44-.9-1.73-.26-3.73-.24-6.04.12-21.37,3.29-27.48,37.95-.73,31.09h0c4.17-1.06,7.73-3.72,10.39-7.05-1.21.81-2.51,1.5-3.88,2.02-7.71,2.93-14.68-.35-15.55-7.33Z"
              />
              <path
                className="fill-white dark:fill-black"
                d="M77.44,26.62c-.88-6.98,4.66-15.01,12.37-17.95,1.06-.4,2.1-.68,3.12-.85-1.79-.3-3.89-.3-6.33.07-21.38,3.3-27.48,37.95-.73,31.09h-.02c3.82-.99,7.14-3.31,9.72-6.26-.83.47-1.69.89-2.58,1.23-7.71,2.93-14.68-.35-15.55-7.33Z"
              />
              <path
                className="fill-white dark:fill-black"
                d="M0,0v48.73h114.68V0H0ZM110.98,45.7c-1.18,1.68-6.71,1.33-8.35.03-2.4-1.89-1.21-6.56-1.44-9.33-4.38,1.77-6.72,5.49-11.27,7.67-8.98,4.29-27.48,6.37-32.21-4.6-.5-1.16-.85-2.35-1.06-3.55.05,4.65-.02,8.94-.6,9.77-1.18,1.68-6.71,1.33-8.35.03-2.4-1.89-1.21-6.56-1.44-9.33-4.38,1.77-6.72,5.49-11.27,7.67-8.98,4.29-27.48,6.37-32.21-4.6C-2.82,26.47,10.34,11.24,21.31,5.71,30.76.95,50.01-2.41,56.34,8.31c4.13,7,.52,9.02.16,15.25-.07,1.28-.02,3.91.05,6.94,1.38-10.38,11.19-20.5,19.7-24.79,9.46-4.77,28.7-8.11,35.02,2.59,4.13,7,.52,9.02.16,15.25v.02c-.23,3.9.74,20.41-.46,22.13Z"
              />
            </g>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
