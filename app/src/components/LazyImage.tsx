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

    // Small delay keeps the cinematic transition perceptible even on cache hits
    loadTimerRef.current = window.setTimeout(() => {
      setIsLoaded(true);
    }, 60);
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
          observer.disconnect();
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