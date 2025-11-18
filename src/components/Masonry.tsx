import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = useCallback(() => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue, [queries, values, defaultValue]);
  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries, get]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  name?: string;
  designation?: string;
  quote?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:768px)', '(min-width:640px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const getInitialPosition = useCallback((item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  }, [animateFrom, containerRef]);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    // Responsive gap: smaller on mobile
    const gap = width < 640 ? 8 : width < 768 ? 12 : 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      // Responsive height: adjust based on screen size
      const height = width < 640 ? child.height / 2.5 : child.height / 2;
      const y = colHeights[col];
      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    return gridItems;
  }, [columns, items, width]);

  // Calculate container height based on grid
  useEffect(() => {
    if (grid.length === 0) {
      setContainerHeight(0);
      return;
    }
    
    // Find the maximum bottom position of all items
    const maxBottom = Math.max(...grid.map(item => item.y + item.h));
    setContainerHeight(maxBottom);
  }, [grid]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, getInitialPosition]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      const cardElement = element.querySelector('.masonry-card') as HTMLElement;
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale, // Use hoverScale prop
        y: -8, // Lift effect
        duration: 0.3,
        ease: 'power2.out'
      });
      // Add shadow on hover for better lift effect
      if (cardElement) {
        gsap.to(cardElement, {
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }

    // Show quote overlay on hover (desktop only)
    const quoteOverlay = element.querySelector('.quote-overlay') as HTMLElement;
    if (quoteOverlay) {
      gsap.to(quoteOverlay, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    const infoOverlay = element.querySelector('.info-overlay') as HTMLElement;
    if (infoOverlay) {
      gsap.to(infoOverlay, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      const cardElement = element.querySelector('.masonry-card') as HTMLElement;
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      // Remove shadow on mouse leave
      if (cardElement) {
        gsap.to(cardElement, {
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }

    // Hide quote overlay on mouse leave
    const quoteOverlay = element.querySelector('.quote-overlay') as HTMLElement;
    if (quoteOverlay) {
      gsap.to(quoteOverlay, {
        opacity: 0,
        y: 24,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    const infoOverlay = element.querySelector('.info-overlay') as HTMLElement;
    if (infoOverlay) {
      gsap.to(infoOverlay, {
        opacity: 0,
        y: 32,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleItemClick = (item: GridItem) => {
    setSelectedItem(item);
    // Don't hide body scroll - keep images visible
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    // Images remain visible
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedItem]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="relative w-full px-2 sm:px-0" 
        style={{ 
          height: containerHeight > 0 ? `${containerHeight}px` : 'auto', 
          minHeight: '400px',
          overflow: 'hidden'
        }}
      >
        {grid.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content cursor-pointer group"
            style={{ 
              willChange: 'transform, width, height, opacity',
              visibility: 'visible',
              opacity: 1,
              zIndex: selectedItem && selectedItem.id === item.id ? 1 : 'auto'
            }}
            onClick={() => handleItemClick(item)}
            onMouseEnter={e => {
              // Only apply hover effects on non-touch devices
              if (window.matchMedia('(hover: hover)').matches) {
                handleMouseEnter(item.id, e.currentTarget);
              }
            }}
            onMouseLeave={e => {
              if (window.matchMedia('(hover: hover)').matches) {
                handleMouseLeave(item.id, e.currentTarget);
              }
            }}
          >
            <div
              className="masonry-card relative w-full h-full bg-cover bg-center rounded-lg overflow-hidden transition-all duration-300 bg-gray-200"
              style={{ 
                backgroundImage: `url("${item.img}")`,
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Fallback image for error handling */}
              <img
                src={item.img}
                alt={item.name || 'Team member'}
                className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
                  target.classList.remove('opacity-0');
                }}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.classList.remove('opacity-0');
                }}
              />
              
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-lg bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
              
              {/* Overlay stack: collapsed by default, expands on hover */}
              {item.quote && (
                <>
                  {/* Desktop: Full overlay on hover */}
                  <div 
                    className="quote-overlay hidden md:flex absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 items-center justify-center p-4 lg:p-6 rounded-lg pointer-events-none z-30 opacity-0 md:translate-y-6 transition-opacity duration-300"
                  >
                    <p className="text-white text-center text-sm md:text-base lg:text-lg font-medium leading-relaxed px-4 max-w-[90%] drop-shadow-lg">
                      "{item.quote}"
                    </p>
                  </div>
                  
                  {/* Mobile: Small quote badge at top-right */}
                  <div 
                    className="quote-badge md:hidden absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1.5 pointer-events-none z-20 max-w-[85%]"
                  >
                    <p className="text-white text-[10px] leading-tight line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>
                </>
              )}
              
              {/* Name and Designation Overlay */}
              {(item.name || item.designation) && (
                <div
                  className="info-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 sm:p-3 md:p-4 z-20 transform opacity-100 md:opacity-0 md:translate-y-8"
                >
                  {item.name && (
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-0.5 sm:mb-1 line-clamp-2 sm:line-clamp-1">{item.name}</h3>
                  )}
                  {item.designation && (
                    <p className="text-emerald-400 text-[10px] sm:text-xs md:text-sm font-semibold line-clamp-1">{item.designation}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          style={{ zIndex: 9999 }}
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-emerald-400 transition-colors text-xl sm:text-2xl font-bold z-10"
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <img
                src={selectedItem.img}
                alt={selectedItem.name || 'Team member'}
                className="w-full h-auto max-h-[70vh] object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x600?text=Image+Not+Found';
                }}
              />
              
              {(selectedItem.name || selectedItem.designation) && (
                <div className="p-4 sm:p-6 bg-white">
                  {selectedItem.name && (
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h2>
                  )}
                  {selectedItem.designation && (
                    <p className="text-emerald-600 font-semibold text-sm sm:text-base md:text-lg">{selectedItem.designation}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Masonry;

