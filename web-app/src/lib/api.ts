// export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// export async function fetchFromStrapi(path: string, options: RequestInit = {}) {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api${path}`, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });
    
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     return await res.json();
//   } catch (error) {
//     console.error('Strapi fetch error:', error);
//     return null;
//   }
// }

// // Fallback data when Strapi is not available
// export const fallbackData = {
//   heroSlides: [
//     {
//       id: 1,
//       title: "Lorem Ipsum",
//       text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//       bgImage: "/hero/riyadh.jpg",
//       bgVideo: null,
//       profileImage: "/hero/profile-man.jpg"
//     }
//   ],
//   teamMembers: [
//     {
//       id: 1,
//       name: "Name Here", 
//       role: "Position Here",
//       image: "/team/member1.jpg",
//       socials: {
//         whatsapp: "#",
//         phone: "#", 
//         email: "#"
//       }
//     },
//     {
//       id: 2,
//       name: "Name Here",
//       role: "Position Here", 
//       image: "/team/member2.jpg",
//       socials: {
//         whatsapp: "#",
//         phone: "#",
//         email: "#"
//       }
//     },
//     {
//       id: 3,
//       name: "Name Here",
//       role: "Position Here",
//       image: "/team/member3.jpg", 
//       socials: {
//         whatsapp: "#",
//         phone: "#",
//         email: "#"
//       }
//     }
//   ],
//   testimonials: [
//     {
//       id: 1,
//       text: "With the help of the hospitable staff... Their responsiveness helped me a great deal to overcome the issues that I had.",
//       author: "Mohammed Solf",
//       role: "@clientcompany",
//       avatar: "/testimonials/client1.jpg"
//     }
//   ],
//   services: [
//     { id: 1, title: "Web Design", slug: "web-design" },
//     { id: 2, title: "Development", slug: "development" },
//     { id: 3, title: "Digital Marketing", slug: "digital-marketing" },
//     { id: 4, title: "Branding", slug: "branding" },
//   ]
// };
