import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  revealDelayMs?: number;
};

const LazyImage = ({ className, src, onLoad, style, revealDelayMs = 0, ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const loadTimerRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const revealImage = () => {
    if (loadTimerRef.current !== null) {
      window.clearTimeout(loadTimerRef.current);
    }

    // Double RAF + slight delay ensures transition starts from initial state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loadTimerRef.current = window.setTimeout(() => {
          setIsLoaded(true);
        }, 90);
      });
    });
  };

  useEffect(() => {
    setIsLoaded(false);
    setIsInView(false);

    const image = imgRef.current;
    if (image && image.complete && image.naturalWidth > 0) {
      // No reveal here: only reveal when inView triggers
    }
  }, [src]);

  useEffect(() => {
    const image = imgRef.current;
    if (!image) return;

    let hasRevealed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasRevealed) {
          setIsInView(false); // reset
          setTimeout(() => {
            setIsInView(true);
            // Only reveal if loaded
            if (image.complete && image.naturalWidth > 0) {
              revealImage();
            }
          }, 10);
          hasRevealed = true;
        }
      },
      {
        threshold: 0.15,
        rootMargin: '120px 0px -5% 0px',
      }
    );

    observer.observe(image);

    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    return () => {
      if (loadTimerRef.current !== null) {
        window.clearTimeout(loadTimerRef.current);
      }
    };
  }, []);

  return (
    <img
      {...props}
      src={src}
      style={{
        ...(style ?? {}),
        '--lazy-delay': `${Math.max(0, revealDelayMs)}ms`,
      } as CSSProperties}
      onLoad={(event) => {
        // Only reveal if inView is true
        if (isInView) revealImage();
        onLoad?.(event);
      }}
      onError={() => {
        // Avoid keeping a broken image permanently invisible
        setIsLoaded(true);
      }}
      ref={imgRef}
      className={cn(
        'lazy-image-fade',
        isInView && 'lazy-image-fade-inview',
        isLoaded && isInView && 'lazy-image-fade-loaded',
        className
      )}
    />
  );
};

export default LazyImage;