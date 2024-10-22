// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// const stories = [
//   {
//     name: "Sarah L.",
//     location: "New York, NY",
//     quote:
//       "The minimalist design of my new sofa has transformed my living room. It's not just furniture, it's a statement piece.",
//     image: "/placeholder.svg?height=400&width=400",
//   },
//   {
//     name: "Mark T.",
//     location: "Los Angeles, CA",
//     quote:
//       "I've never had a dining table that's both beautiful and functional. This piece has made family dinners a joy.",
//     image: "/placeholder.svg?height=400&width=400",
//   },
//   {
//     name: "Emily R.",
//     location: "Chicago, IL",
//     quote:
//       "The custom bookshelf fits perfectly in my home office. It's like it was made just for me - because it was!",
//     image: "/placeholder.svg?height=400&width=400",
//   },
// ];

// export function CustomerStories() {
//   const [currentStory, setCurrentStory] = useState(0);

//   const nextStory = () => {
//     setCurrentStory((prev) => (prev + 1) % stories.length);
//   };

//   const prevStory = () => {
//     setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
//   };

//   return (
//     <section className="bg-stone-50 py-16">
//       <div className="container mx-auto px-4">
//         <h2 className="mb-12 text-center text-3xl font-light text-stone-800">Customer Stories</h2>
//         <div className="relative mx-auto max-w-2xl overflow-hidden">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={currentStory}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex flex-col items-center"
//             >
//               <Image
//                 src={stories[currentStory].image}
//                 alt={stories[currentStory].name}
//                 width={200}
//                 height={200}
//                 className="mb-6 rounded-full object-cover"
//               />
//               <blockquote className="mb-4 text-center text-lg italic text-stone-600">
//                 "{stories[currentStory].quote}"
//               </blockquote>
//               <p className="text-center font-medium text-stone-800">
//                 {stories[currentStory].name} - {stories[currentStory].location}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//           <button
//             onClick={prevStory}
//             className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-stone-100"
//             aria-label="Previous story"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button
//             onClick={nextStory}
//             className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-stone-100"
//             aria-label="Next story"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
