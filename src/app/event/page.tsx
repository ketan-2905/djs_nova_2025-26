"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

// Types
interface EventImage {
  url: string;
  alt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees?: number;
  status: "upcoming" | "past";
  featured?: boolean;
  coverImage: string;
  gallery: EventImage[];
  details: {
    organizer?: string;
    category?: string;
    registrationLink?: string;
  };
  testimonials?: {
    name: string;
    role: string;
    comment: string;
    avatar?: string;
  }[];
}

// Sample Events Data
const eventsData: Event[] = [
  {
    id: "1",
    title: "Space Tech Summit 2025",
    description:
      "Join us for an incredible journey through the latest advancements in space technology. This summit brings together industry leaders, researchers, and enthusiasts to explore the future of space exploration.",
    date: "2025-11-15",
    time: "10:00 AM - 6:00 PM",
    location: "DJ Sanghvi Auditorium, Mumbai",
    attendees: 500,
    status: "upcoming",
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        alt: "Space Tech Summit",
      },
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        alt: "Technology Display",
      },
      {
        url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
        alt: "Keynote Speaker",
      },
      {
        url: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800",
        alt: "Audience View",
      },
    ],
    details: {
      organizer: "DJS Nova Space Committee",
      category: "Technology & Innovation",
      registrationLink: "#",
    },
    testimonials: [
      {
        name: "Dr. Rajesh Kumar",
        role: "ISRO Scientist",
        comment:
          "An exceptional event that showcased the future of space technology. The presentations were insightful and inspiring.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      },
    ],
  },
  {
    id: "2",
    title: "AI in Astronomy Workshop",
    description:
      "Explore how artificial intelligence is revolutionizing astronomical research and space exploration.",
    date: "2025-12-01",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 3, DJ Sanghvi",
    attendees: 150,
    status: "upcoming",
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        alt: "AI Workshop",
      },
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        alt: "Workshop Session",
      },
    ],
    details: {
      organizer: "DJS Nova Tech Team",
      category: "Workshop",
      registrationLink: "#",
    },
  },
  {
    id: "3",
    title: "Stargazing Night 2024",
    description:
      "A memorable evening under the stars where participants observed celestial objects through telescopes and learned about constellations.",
    date: "2024-10-20",
    time: "7:00 PM - 11:00 PM",
    location: "College Terrace",
    attendees: 200,
    status: "past",
    coverImage:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=600&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
        alt: "Stargazing",
      },
      {
        url: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800",
        alt: "Night Sky",
      },
      {
        url: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800",
        alt: "Telescope View",
      },
    ],
    details: {
      organizer: "DJS Nova Space Committee",
      category: "Observation Event",
    },
    testimonials: [
      {
        name: "Priya Sharma",
        role: "Second Year Student",
        comment:
          "An unforgettable experience! Seeing Jupiter and its moons through the telescope was absolutely breathtaking.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      },
      {
        name: "Arjun Mehta",
        role: "Third Year Student",
        comment:
          "The organizers did an excellent job explaining the constellations. Looking forward to more events like this!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      },
    ],
  },
  {
    id: "4",
    title: "Rocket Science Seminar",
    description:
      "An engaging seminar on rocket propulsion systems and the physics behind space travel.",
    date: "2024-09-15",
    time: "3:00 PM - 6:00 PM",
    location: "Seminar Hall A",
    attendees: 180,
    status: "past",
    coverImage:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&h=600&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800",
        alt: "Rocket Launch",
      },
      {
        url: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800",
        alt: "Seminar Session",
      },
    ],
    details: {
      organizer: "DJS Nova Research Team",
      category: "Seminar",
    },
  },
  {
    id: "5",
    title: "Space Photography Exhibition",
    description:
      "A stunning collection of astrophotography captured by students and professionals.",
    date: "2024-08-10",
    time: "10:00 AM - 8:00 PM",
    location: "College Gallery",
    attendees: 300,
    status: "past",
    coverImage:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=600&fit=crop",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
        alt: "Galaxy Photo",
      },
      {
        url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
        alt: "Milky Way",
      },
      {
        url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
        alt: "Nebula",
      },
    ],
    details: {
      organizer: "DJS Nova Creative Team",
      category: "Exhibition",
    },
  },
];

const GalleryModal = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: {
  images: EventImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
      >
        <X size={32} />
      </button>

      <button
        onClick={prevImage}
        className="absolute left-4 text-white hover:text-blue-400 transition-colors z-10"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 text-white hover:text-blue-400 transition-colors z-10"
      >
        <ChevronRight size={48} />
      </button>

      <div className="flex  flex-col items-center justify-center">
        <div className="max-w-6xl max-h-[90vh] w-full mx-4 flex items-center justify-center bg-black rounded-lg overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>

      <p className="text-white text-center mt-4 text-lg">
        {currentIndex + 1} / {images.length}
      </p>
      </div>
    </div>
  );
};

// const EventCard = ({
//   event,
//   onClick
// }: {
//   event: Event;
//   onClick: () => void;
// }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="group bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
//     >
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={event.coverImage}
//           alt={event.title}
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
//         <div className="absolute top-4 left-4">
//           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//             event.status === 'upcoming'
//               ? 'bg-green-500/20 text-green-400 border border-green-500/50'
//               : 'bg-slate-700/50 text-slate-300 border border-slate-600/50'
//           }`}>
//             {event.status === 'upcoming' ? 'Coming Soon' : 'Past Event'}
//           </span>
//         </div>
//       </div>

//       <div className="p-6">
//         <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400/75 transition-colors">
//           {event.title}
//         </h3>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-center gap-2 text-slate-400 text-sm">
//             <Calendar size={16} className="text-blue-400" />
//             <span>{new Date(event.date).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             })}</span>
//           </div>
//           {/* <div className="flex items-center gap-2 text-slate-400 text-sm">
//             <Clock size={16} className="text-purple-400" />
//             <span>{event.time}</span>
//           </div> */}
//           <div className="flex items-center gap-2 text-slate-400 text-sm">
//             <MapPin size={16} className="text-red-400" />
//             <span>{event.location}</span>
//           </div>

//         </div>

//         <p className="text-slate-400 text-sm line-clamp-4 mb-4">
//           {event.description}
//         </p>

//         <div className="flex items-center justify-between">
//           <span className="text-blue-400 text-sm font-medium">
//             {event.gallery.length} Photos
//           </span>
//           <span className="text-slate-500 group-hover:text-amber-400/75 transition-colors">
//             View Details →
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

const EventCard = ({
  event,
  onClick,
}: {
  event: Event;
  onClick: () => void;
}) => {
  const [flipped, setFlipped] = useState(false);
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [zoomed, setZoomed] = useState(false);

    const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);


  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const handleNext = () =>
    setCurrentImg((prev) => (prev + 1) % event.gallery.length);
  const handlePrev = () =>
    setCurrentImg((prev) => (prev === 0 ? event.gallery.length - 1 : prev - 1));

  return (
    <>
    <div
      className="relative w-full h-[28rem] perspective"
      onClick={() => {
        if (!flipped) onClick();
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full backface-hidden bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/20">
          <div className="relative h-48 overflow-hidden">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === "upcoming"
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-slate-700/50 text-slate-300 border border-slate-600/50"
                }`}
              >
                {event.status === "upcoming" ? "Coming Soon" : "Past Event"}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400/75 transition-colors">
                {event.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar size={16} className="text-blue-400" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin size={16} className="text-red-400" />
                  <span>{event.location}</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm line-clamp-4 mb-4">
                {event.description}
              </p>
            </div>

            <div
              className="flex items-center justify-between mt-auto"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(true);
              }}
            >
              <span className="text-blue-400 text-sm font-medium">
                {event.gallery.length} Photos
              </span>
              <span className="text-slate-500 hover:text-amber-400/75 transition-colors">
                View Details →
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-slate-900/90 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-between">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{event.description}</p>
          </div>

          {/* Gallery Section */}
          {event.gallery.length > 0 && (
            <div className="relative w-full flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 p-2 bg-slate-800/70 rounded-full hover:bg-slate-700 transition z-50"
              >
                <ChevronLeft size={20} />
              </button>

              <img
                src={event.gallery[currentImg].url}
                alt={`Gallery ${currentImg + 1}`}
                className="w-full h-56 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  openGallery(currentImg);
                }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 p-2 bg-slate-800/70 rounded-full hover:bg-slate-700 transition z-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-amber-400 border border-amber-400/50 rounded-md hover:bg-amber-400/10 transition"
          >
            Back
          </button>
        </div>
      </div>

      {/* ZOOM IMAGE MODAL */}
      {/* {zoomed && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setZoomed(false)}
        >
          <button className="absolute top-6 right-6 text-white">
            <X size={28} />
          </button>
          <img
            src={event.gallery[currentImg].url}
            alt="Zoomed"
            className="max-w-[90%] max-h-[80%] rounded-lg object-contain"
          />
        </div>
      )} */}




    </div>
           <GalleryModal
        images={event.gallery}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryIndex}
      />
    </>
  );
};

const EventDetailsModal = ({
  event,
  isOpen,
  onClose,
}: {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!isOpen || !event) return null;

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 overflow-y-auto">
        <div className="min-h-screen px-4 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative bg-slate-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            <button
              onClick={onClose}
              className="sticky top-4 float-right mr-4 text-slate-400 hover:text-red-400 transition-colors z-10"
            >
              <X size={28} />
            </button>

            {/* Cover Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                    event.status === "upcoming"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-slate-700/50 text-slate-300 border border-slate-600/50"
                  }`}
                >
                  {event.status === "upcoming" ? "Coming Soon" : "Past Event"}
                </span>
                <h2 className="text-4xl font-bold text-white">{event.title}</h2>
              </div>
            </div>

            <div className="p-8">
              {/* Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-xs">Date</p>
                    <p className="text-white font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {/* <div className="flex items-center gap-3">
                  <Clock size={20} className="text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-xs">Time</p>
                    <p className="text-white font-medium">{event.time}</p>
                  </div>
                </div> */}
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-red-400" />
                  <div>
                    <p className="text-slate-400 text-xs">Location</p>
                    <p className="text-white font-medium">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Event Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.details.organizer && (
                    <div>
                      <p className="text-slate-400 text-sm">Organizer</p>
                      <p className="text-white">{event.details.organizer}</p>
                    </div>
                  )}
                  {event.details.category && (
                    <div>
                      <p className="text-slate-400 text-sm">Category</p>
                      <p className="text-white">{event.details.category}</p>
                    </div>
                  )}
                </div>
                {event.details.registrationLink &&
                  event.status === "upcoming" && (
                    <a
                      href={event.details.registrationLink}
                      className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Register Now <ExternalLink size={16} />
                    </a>
                  )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  About This Event
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Gallery */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Event Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {event.gallery.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => openGallery(index)}
                      className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              {/* {event.testimonials && event.testimonials.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">What Attendees Say</h3>
                  <div className="space-y-4">
                    {event.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                        <div className="flex items-start gap-4">
                          <img
                            src={testimonial.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-white font-semibold">{testimonial.name}</p>
                            <p className="text-slate-400 text-sm mb-2">{testimonial.role}</p>
                            <p className="text-slate-300 italic">{testimonial.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <GalleryModal
        images={event.gallery}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryIndex}
      />
    </>
  );
};

const FeaturedEventFlip: React.FC<{ featuredEvent: Event }> = ({ featuredEvent }) => {
  // Flip state (front / back)
  const [flipped, setFlipped] = useState<boolean>(false);

  // Gallery state
  const [currentImg, setCurrentImg] = useState<number>(0);

  // Zoom modal state
  const [zoomed, setZoomed] = useState<boolean>(false);

  // Navigation
  const handleNext = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (!featuredEvent.gallery || featuredEvent.gallery.length === 0) return;
    setCurrentImg((p) => (p + 1) % featuredEvent.gallery.length);
  };
  const handlePrev = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (!featuredEvent.gallery || featuredEvent.gallery.length === 0) return;
    setCurrentImg((p) => (p === 0 ? featuredEvent.gallery.length - 1 : p - 1));
  };

  // Ensure index stays valid if gallery changes
  useEffect(() => {
    if (!featuredEvent.gallery || featuredEvent.gallery.length === 0) {
      setCurrentImg(0);
    } else {
      setCurrentImg((idx) => Math.min(idx, featuredEvent.gallery.length - 1));
    }
  }, [featuredEvent.gallery]);

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-8 bg-gradient-to-r from-amber-400 to-white rounded-full" />
        <h2 className="text-3xl font-bold text-white">Featured Event</h2>
      </div>

      {/* FLIP CARD WRAPPER - needs global CSS: .perspective, .transform-style-preserve-3d, .backface-hidden, .rotate-y-180 */}
      <div className="relative w-full h-[600px] perspective">
        <div
          // container that rotates
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT */}
          <div
            className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-default"
            aria-hidden={flipped}
          >
            <div className="relative h-full">
              <img
                src={featuredEvent.coverImage}
                alt={featuredEvent.title}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/50">
                  {featuredEvent.status === "upcoming" ? "Coming Soon" : "Featured"}
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {featuredEvent.title}
                </h3>

                <div className="flex flex-wrap gap-4 mb-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-blue-400" />
                    <span>
                      {new Date(featuredEvent.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  {featuredEvent.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-red-400" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  )}
                </div>

                <p className="text-slate-300 text-lg mb-4 line-clamp-2">
                  {featuredEvent.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(true);
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  aria-pressed={flipped}
                  aria-label="View featured event details"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute w-full h-full rotate-y-180 backface-hidden bg-slate-900/95 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-between"
            aria-hidden={!flipped}
          >
            {/* Title + short description */}
            <div className="w-full text-center">
              <h3 className="text-3xl font-bold text-white mb-2">
                {featuredEvent.title}
              </h3>
              <p className="text-slate-300 text-sm mb-4">{featuredEvent.description}</p>
            </div>

            {/* Gallery area */}
            <div className="relative w-full flex items-center justify-center">
              {/* Prev */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-slate-800/70 rounded-full hover:bg-slate-700 transition z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Image (contain with letterboxing) */}
              <div className="w-full max-w-4xl max-h-[60vh] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={featuredEvent.gallery?.[currentImg]?.url ?? featuredEvent.coverImage}
                  alt={featuredEvent.gallery?.[currentImg]?.alt ?? `${featuredEvent.title} image ${currentImg + 1}`}
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomed(true);
                  }}
                />
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-slate-800/70 rounded-full hover:bg-slate-700 transition z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Controls */}
            <div className="w-full flex items-center justify-between mt-4">
              <div className="text-slate-400">
                {featuredEvent.gallery?.length ? (
                  <span>
                    {currentImg + 1} / {featuredEvent.gallery.length}
                  </span>
                ) : (
                  <span>0 / 0</span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-amber-400 border border-amber-400/50 rounded-md hover:bg-amber-400/10 transition"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ZOOM OVERLAY */}
        {zoomed && (
          <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(false);
              }}
              className="absolute top-6 right-6 text-white z-50"
              aria-label="Close zoom"
            >
              <X size={28} />
            </button>

            <div className="max-w-[90%] max-h-[85%] bg-black rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={featuredEvent.gallery?.[currentImg]?.url ?? featuredEvent.coverImage}
                alt={featuredEvent.gallery?.[currentImg]?.alt ?? featuredEvent.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const upcomingEvents = eventsData.filter((e) => e.status === "upcoming");
  const pastEvents = eventsData.filter((e) => e.status === "past");
  const featuredEvent = upcomingEvents.find((e) => e.featured);

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen tracking-[0.10em] ">
      {/* Header */}
      <div className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text ">
            All Events
          </h1>
          <p className="text-slate-300 text-lg">
            Showing {eventsData.length} events
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Event */}
        {featuredEvent && <FeaturedEventFlip featuredEvent={featuredEvent} />}


        {/* Upcoming Events */}
        {/* {upcomingEvents.filter(e => !e.featured).length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-r from-amber-400 to-white rounded-full" />
              <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.filter(e => !e.featured).map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => openEventDetails(event)}
                />
              ))}
            </div>
          </div>
        )} */}

        {/* Past Events */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-8 bg-gradient-to-r from-amber-400 to-white rounded-full" />
            <h2 className="text-3xl font-bold text-white">Past Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => openEventDetails(event)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />
    </div>
  );
}
