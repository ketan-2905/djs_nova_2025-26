// 'use client';

// import { useState } from 'react';
// import { ChevronDown, Linkedin, Github, Mail } from 'lucide-react';

// // Types
// interface Social {
//   linkedin?: string;
//   github?: string;
//   email?: string;
// }

// interface Member {
//   name: string;
//   role: string;
//   image?: string;
//   social?: Social;
// }

// interface TeamData {
//   tenure: string;
//   board: {
//     cp: Member;
//     vcp1: Member;
//     vcp2: Member;
//   };
//   departments: {
//     research: Member[];
//     tech: {
//       ai: Member;
//       webdev: Member;
//     };
//     management: Member[];
//     creative: Member[];
//     [key: string]: any;
//   };
// }

// // Sample data structure - replace with your actual data
// const teamsData: TeamData[] = [
//   {
//     tenure: '2024-2025',
//     board: {
//       cp: {
//         name: 'Alex Johnson',
//         role: 'Chairperson',
//         image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
//         social: { linkedin: '#', github: '#', email: 'alex@example.com' }
//       },
//       vcp1: {
//         name: 'Sarah Chen',
//         role: 'Vice Chairperson',
//         image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
//         social: { linkedin: '#', github: '#' }
//       },
//       vcp2: {
//         name: 'Michael Patel',
//         role: 'Vice Chairperson',
//         image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
//         social: { linkedin: '#', github: '#' }
//       }
//     },
//     departments: {
//       research: [
//         {
//           name: 'Emily Rodriguez',
//           role: 'Research Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
//           social: { linkedin: '#', github: '#' }
//         },
//         {
//           name: 'David Kim',
//           role: 'Research Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
//           social: { linkedin: '#' }
//         }
//       ],
//       tech: {
//         ai: {
//           name: 'Priya Sharma',
//           role: 'Tech AI Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
//           social: { linkedin: '#', github: '#' }
//         },
//         webdev: {
//           name: 'James Wilson',
//           role: 'Tech Web Dev Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
//           social: { linkedin: '#', github: '#' }
//         }
//       },
//       management: [
//         {
//           name: 'Sophia Martinez',
//           role: 'Management Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
//           social: { linkedin: '#' }
//         },
//         {
//           name: 'Ryan Thompson',
//           role: 'Management Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
//           social: { linkedin: '#', email: 'ryan@example.com' }
//         }
//       ],
//       creative: [
//         {
//           name: 'Aisha Khan',
//           role: 'Creative Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
//           social: { linkedin: '#' }
//         },
//         {
//           name: 'Lucas Brown',
//           role: 'Editorial Head',
//           image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
//           social: { linkedin: '#', github: '#' }
//         }
//       ]
//     }
//   },
//   {
//     tenure: '2023-2024',
//     board: {
//       cp: {
//         name: 'Previous CP',
//         role: 'Chairperson',
//         image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrevCP',
//         social: { linkedin: '#' }
//       },
//       vcp1: {
//         name: 'Previous VCP 1',
//         role: 'Vice Chairperson',
//         image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrevVCP1',
//         social: { linkedin: '#' }
//       },
//       vcp2: {
//         name: 'Previous VCP 2',
//         role: 'Vice Chairperson',
//         image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrevVCP2',
//         social: { linkedin: '#' }
//       }
//     },
//     departments: {
//       research: [
//         { name: 'Research Head 1', role: 'Research Head', social: { linkedin: '#' } },
//         { name: 'Research Head 2', role: 'Research Head', social: { linkedin: '#' } }
//       ],
//       tech: {
//         ai: { name: 'AI Head', role: 'Tech AI Head', social: { linkedin: '#' } },
//         webdev: { name: 'WebDev Head', role: 'Tech Web Dev Head', social: { linkedin: '#' } }
//       },
//       management: [
//         { name: 'Mgmt Head 1', role: 'Management Head', social: { linkedin: '#' } },
//         { name: 'Mgmt Head 2', role: 'Management Head', social: { linkedin: '#' } }
//       ],
//       creative: [
//         { name: 'Creative Head', role: 'Creative Head', social: { linkedin: '#' } },
//         { name: 'Editorial Head', role: 'Editorial Head', social: { linkedin: '#' } }
//       ]
//     }
//   }
// ];

// const MemberCard = ({ member }: { member: Member }) => {
//   return (
//     <div className="group relative">
//       <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20">
//         {/* Avatar */}
//         <div className="flex justify-center mb-4">
//           <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-600 group-hover:border-blue-400 transition-colors">
//             {member.image ? (
//               <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
//                 {member.name.charAt(0)}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Name and Role - Initially Hidden */}
//         <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
//           <p className="text-sm text-blue-400 mb-3">{member.role}</p>

//           {/* Social Links */}
//           {member.social && (
//             <div className="flex justify-center gap-3">
//               {member.social.linkedin && (
//                 <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" 
//                    className="text-slate-400 hover:text-blue-400 transition-colors">
//                   <Linkedin size={18} />
//                 </a>
//               )}
//               {member.social.github && (
//                 <a href={member.social.github} target="_blank" rel="noopener noreferrer"
//                    className="text-slate-400 hover:text-purple-400 transition-colors">
//                   <Github size={18} />
//                 </a>
//               )}
//               {member.social.email && (
//                 <a href={`mailto:${member.social.email}`}
//                    className="text-slate-400 hover:text-green-400 transition-colors">
//                   <Mail size={18} />
//                 </a>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Glowing effect on hover */}
//         <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//       </div>
//     </div>
//   );
// };

// export default function TeamShowcase() {
//   const [expandedTenure, setExpandedTenure] = useState<number>(0);

//   const toggleTenure = (index: number) => {
//     setExpandedTenure(expandedTenure === index ? -1 : index);
//   };

//   return (
//     <div className="min-h-screen  py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-white mb-4 ">
//             DJS Nova Space Committee
//           </h1>
//           <p className="text-slate-400 text-lg">Meet Our Stellar Team</p>
//         </div>

//         {/* Team Sections */}
//         <div className="space-y-6">
//           {teamsData.map((team, index) => (
//             <div key={index} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30 backdrop-blur-sm">
//               {/* Tenure Header */}
//               <button
//                 onClick={() => toggleTenure(index)}
//                 className="w-full flex items-center justify-between p-6 hover:bg-slate-800/30 transition-colors"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
//                     {team.tenure.slice(2, 4)}
//                   </div>
//                   <h2 className="text-2xl font-bold text-white">Team {team.tenure}</h2>
//                 </div>
//                 <ChevronDown 
//                   className={`text-slate-400 transition-transform duration-300 ${expandedTenure === index ? 'rotate-180' : ''}`}
//                   size={24}
//                 />
//               </button>

//               {/* Team Content */}
//               <div className={`overflow-hidden transition-all duration-500 ${expandedTenure === index ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
//                 <div className="p-8 space-y-12">
//                   {/* Board Members */}
//                   <div>
//                     <h3 className="text-xl font-semibold text-blue-400 mb-8 text-center">Board Members</h3>
                    
//                     {/* Desktop Layout */}
//                     <div className="hidden md:block">
//                       {/* CP at top center */}
//                       <div className="flex justify-center mb-8">
//                         <div className="w-64">
//                           <MemberCard member={team.board.cp} />
//                         </div>
//                       </div>
                      
//                       {/* VCPs on either side */}
//                       <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
//                         <MemberCard member={team.board.vcp1} />
//                         <MemberCard member={team.board.vcp2} />
//                       </div>
//                     </div>

//                     {/* Mobile Layout */}
//                     <div className="md:hidden space-y-4">
//                       <MemberCard member={team.board.cp} />
//                       <MemberCard member={team.board.vcp1} />
//                       <MemberCard member={team.board.vcp2} />
//                     </div>
//                   </div>

//                   {/* Department Heads */}
//                   <div className="space-y-10">
//                     <h3 className="text-xl font-semibold text-purple-400 text-center">Department Heads</h3>

//                     {/* Research Heads */}
//                     <div>
//                       <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Research</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//                         {team.departments.research.map((member, i) => (
//                           <MemberCard key={i} member={member} />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Tech Heads - Side by Side on Desktop */}
//                     <div>
//                       <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Technical</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//                         <MemberCard member={team.departments.tech.ai} />
//                         <MemberCard member={team.departments.tech.webdev} />
//                       </div>
//                     </div>

//                     {/* Management Heads */}
//                     <div>
//                       <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Management</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//                         {team.departments.management.map((member, i) => (
//                           <MemberCard key={i} member={member} />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Creative & Editorial Heads */}
//                     <div>
//                       <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Creative & Editorial</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//                         {team.departments.creative.map((member, i) => (
//                           <MemberCard key={i} member={member} />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { ChevronDown, Linkedin, Github, Mail } from 'lucide-react';

// Types
interface Social {
  linkedin?: string;
  github?: string;
  email?: string;
}

interface Member {
  name: string;
  role: string;
  image?: string;
  social?: Social;
}

interface TeamData {
  tenure: string;
  board: {
    cp: Member;
    vcp1: Member;
    vcp2: Member;
  };
  departments: {
    research: Member[];
    tech: {
      ai: Member;
      webdev: Member;
    };
    management: Member[];
    creative: Member[];
    [key: string]: any;
  };
}

// Sample data structure - replace with your actual data
const teamsData: TeamData[] = [
  {
    tenure: '2024-2025',
    board: {
      cp: {
        name: 'Alex Johnson',
        role: 'Chairperson',
        image: '/astro7.jpg',
        social: { linkedin: '#', github: '#', email: 'alex@example.com' }
      },
      vcp1: {
        name: 'Sarah Chen',
        role: 'Vice Chairperson',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        social: { linkedin: '#', github: '#' }
      },
      vcp2: {
        name: 'Michael Patel',
        role: 'Vice Chairperson',
        image: '/akshatsingh.webp',
        social: { linkedin: '#', github: '#' }
      }
    },
    departments: {
      research: [
        {
          name: 'Emily Rodriguez',
          role: 'Research Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          social: { linkedin: '#', github: '#' }
        },
        {
          name: 'David Kim',
          role: 'Research Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
          social: { linkedin: '#' }
        }
      ],
      tech: {
        ai: {
          name: 'Priya Sharma',
          role: 'Tech AI Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
          social: { linkedin: '#', github: '#' }
        },
        webdev: {
          name: 'James Wilson',
          role: 'Tech Web Dev Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
          social: { linkedin: '#', github: '#' }
        }
      },
      management: [
        {
          name: 'Sophia Martinez',
          role: 'Management Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
          social: { linkedin: '#' }
        },
        {
          name: 'Ryan Thompson',
          role: 'Management Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
          social: { linkedin: '#', email: 'ryan@example.com' }
        }
      ],
      creative: [
        {
          name: 'Aisha Khan',
          role: 'Creative Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
          social: { linkedin: '#' }
        },
        {
          name: 'Lucas Brown',
          role: 'Editorial Head',
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
          social: { linkedin: '#', github: '#' }
        }
      ]
    }
  },
  {
    tenure: '2023-2024',
    board: {
      cp: {
        name: 'Previous CP',
        role: 'Chairperson',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrevCP',
        social: { linkedin: '#' }
      },
      vcp1: {
        name: 'Previous VCP 1',
        role: 'Vice Chairperson',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrevVCP1',
        social: { linkedin: '#' }
      },
      vcp2: {
        name: 'Previous VCP 2',
        role: 'Vice Chairperson',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrevVCP2',
        social: { linkedin: '#' }
      }
    },
    departments: {
      research: [
        { name: 'Research Head 1', role: 'Research Head', social: { linkedin: '#' } },
        { name: 'Research Head 2', role: 'Research Head', social: { linkedin: '#' } }
      ],
      tech: {
        ai: { name: 'AI Head', role: 'Tech AI Head', social: { linkedin: '#' } },
        webdev: { name: 'WebDev Head', role: 'Tech Web Dev Head', social: { linkedin: '#' } }
      },
      management: [
        { name: 'Mgmt Head 1', role: 'Management Head', social: { linkedin: '#' } },
        { name: 'Mgmt Head 2', role: 'Management Head', social: { linkedin: '#' } }
      ],
      creative: [
        { name: 'Creative Head', role: 'Creative Head', social: { linkedin: '#' } },
        { name: 'Editorial Head', role: 'Editorial Head', social: { linkedin: '#' } }
      ],
      outreach: [
        { name: 'Creative Head', role: 'Outreach Head', social: { linkedin: '#' } },
        { name: 'Editorial Head', role: 'Editorial Head', social: { linkedin: '#' } }
      ],
      treasurer: [
        { name: 'Creative Head', role: 'treasurer', social: { linkedin: '#' } },
      ]
    }
  }
];

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:scale-105 h-84 w-64">
        {/* Full Body Image */}
        <div className="relative  bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>

        {/* Name and Role - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide leading-tight">{member.name}</h3>
              <p className="text-xs text-orange-400 font-medium mt-1">{member.role}</p>
            </div>
          </div>

          {/* Social Links - Show on hover */}
          {member.social && (
            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {member.social.linkedin && (
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="text-slate-400 hover:text-blue-400 transition-colors text-xs flex items-center gap-1">
                  <Linkedin size={14} />
                </a>
              )}
              {member.social.github && (
                <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                   className="text-slate-400 hover:text-purple-400 transition-colors text-xs flex items-center gap-1">
                  <Github size={14} />
                </a>
              )}
              {member.social.email && (
                <a href={`mailto:${member.social.email}`}
                   className="text-slate-400 hover:text-green-400 transition-colors text-xs flex items-center gap-1">
                  <Mail size={14} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Glowing effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
};

export default function TeamShowcase() {
  const [expandedTenure, setExpandedTenure] = useState<number>(0);

  const toggleTenure = (index: number) => {
    setExpandedTenure(expandedTenure === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-[#141414] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 mt-4">
            DJS Nova Space Committee
          </h1>
          <p className="text-slate-400 text-lg">Meet Our Stellar Team</p>
        </div>

        {/* Team Sections */}
        <div className="space-y-6">
          {teamsData.map((team, index) => (
            <div key={index} className="border border-slate-800 rounded-xl overflow-hidden  backdrop-blur-sm">
              {/* Tenure Header */}
              <button
                onClick={() => toggleTenure(index)}
                className="w-full flex items-center justify-between p-6 bg-slate-900/30 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {team.tenure.slice(2, 4)}
                  </div>
                  <h2 className="text-2xl font-bold text-white">Team {team.tenure}</h2>
                </div>
                <ChevronDown 
                  className={`text-slate-400 transition-transform duration-300 ${expandedTenure === index ? 'rotate-180' : ''}`}
                  size={24}
                />
              </button>

              {/* Team Content */}
              <div className={`overflow-hidden transition-all duration-500 ${expandedTenure === index ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-8 space-y-12">
                  {/* Board Members */}
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-8 text-center">Board Members</h3>
                    
                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      {/* CP at top center */}
                      <div className="flex justify-center mb-8">
                        <div className="w-64">
                          <MemberCard member={team.board.cp} />
                        </div>
                      </div>
                      
                      {/* VCPs on either side */}
                      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                        <MemberCard member={team.board.vcp1} />
                        <MemberCard member={team.board.vcp2} />
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                      <MemberCard member={team.board.cp} />
                      <MemberCard member={team.board.vcp1} />
                      <MemberCard member={team.board.vcp2} />
                    </div>
                  </div>

                  {/* Department Heads */}
                  <div className="space-y-10">
                    <h3 className="text-xl font-semibold text-purple-400 text-center">Department Heads</h3>

                    {/* Research Heads */}
                    <div>
                      <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Research</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {team.departments.research.map((member, i) => (
                          <MemberCard key={i} member={member} />
                        ))}
                      </div>
                    </div>

                    {/* Tech Heads - Side by Side on Desktop */}
                    <div>
                      <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Technical</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <MemberCard member={team.departments.tech.ai} />
                        <MemberCard member={team.departments.tech.webdev} />
                      </div>
                    </div>

                    {/* Management Heads */}
                    <div>
                      <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Management</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {team.departments.management.map((member, i) => (
                          <MemberCard key={i} member={member} />
                        ))}
                      </div>
                    </div>

                    {/* Creative & Editorial Heads */}
                    <div>
                      <h4 className="text-lg font-medium text-slate-300 mb-4 text-center">Creative & Editorial</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {team.departments.creative.map((member, i) => (
                          <MemberCard key={i} member={member} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}