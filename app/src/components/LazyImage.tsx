import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  revealDelayMs?: number;
};

const LazyImage = ({ className, src, onLoad, style, revealDelayMs = 0, ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const loadTimerRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const markLoaded = () => {
    if (loadTimerRef.current !== null) {
      window.clearTimeout(loadTimerRef.current);
    }

    // Slightly longer delay avoids cache-timing snap and keeps reveal perceptible
    loadTimerRef.current = window.setTimeout(() => {
      setIsLoaded(true);
      // Safety net: some engines (notably iOS Safari inside nested scroll containers)
      // never fire the IntersectionObserver below, which would leave the image stuck
      // at opacity 0 forever. Loading only happens near the viewport anyway, so it's
      // safe to also treat a loaded image as "in view".
      setHasEnteredView(true);
    }, 150);
  };

  useEffect(() => {
    setIsLoaded(false);
    setHasEnteredView(false);
  }, [src]);

  useEffect(() => {
    const image = imgRef.current;
    if (!image) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setHasEnteredView(true);
        } else {
          // Reset when leaving viewport so transition plays again on re-entry
          setHasEnteredView(false);
        }
      },
      {
        threshold: 0.2,
        // Trigger close to the viewport so animation is visible to the user
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(image);

    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    const image = imgRef.current;
    if (image && image.complete && image.naturalWidth > 0) {
      markLoaded();
    }
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
        markLoaded();
        onLoad?.(event);
      }}
      onError={() => {
        // Avoid keeping a broken image permanently invisible
        setIsLoaded(true);
      }}
      ref={imgRef}
      className={cn(
        'lazy-image-fade',
        hasEnteredView && 'lazy-image-fade-inview',
        hasEnteredView && isLoaded && 'lazy-image-fade-loaded',
        className
      )}
    />
  );
};

export default LazyImage;