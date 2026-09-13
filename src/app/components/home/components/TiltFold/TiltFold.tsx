import { useEffect, useRef, useState, type DragEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Link, useOutletContext } from 'react-router';
import { ImageUp, RefreshCw } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { useHeaderVisibility } from '@/components/ui/header-visibility';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

const SMOOTHING = 0.12;
const FEATHER_WIDTH = 55;
const MAX_TILT_DEG = 30;

interface DeviceOrientationEventIOS {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

interface TiltFoldImageProps {
  src: string;
  className?: string;
  onError?: () => void;
}

// Horizontal input (mouse x, touch x, or phone gyro tilt) drives a
// directional dark+blur "fold" band that sweeps across the image. The image
// itself never transforms - only the blur layer's filter/opacity and both
// layers' gradient masks change, driven straight through refs each animation
// frame so the 60fps loop never triggers a React re-render.
const TiltFoldImage = ({ src, className, onError }: TiltFoldImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blurLayerRef = useRef<HTMLImageElement>(null);
  const dimLayerRef = useRef<HTMLDivElement>(null);

  const targetProgress = useRef(0);
  const targetIsRight = useRef(true);
  const smoothedProgress = useRef(0);

  const [needsMotionPermission, setNeedsMotionPermission] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const iosOrientation = window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS | undefined;
    if (typeof iosOrientation?.requestPermission === 'function') {
      setNeedsMotionPermission(true);
    } else if ('DeviceOrientationEvent' in window) {
      setMotionEnabled(true);
    }
  }, []);

  const requestMotionPermission = async () => {
    try {
      const iosOrientation = window.DeviceOrientationEvent as unknown as DeviceOrientationEventIOS;
      const result = await iosOrientation.requestPermission?.();
      if (result === 'granted') {
        setMotionEnabled(true);
        setNeedsMotionPermission(false);
      }
    } catch {
      // Permission prompt unavailable/denied - mouse and touch still work.
    }
  };

  useEffect(() => {
    if (!motionEnabled) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      const nx = Math.max(-1, Math.min(1, e.gamma / MAX_TILT_DEG));
      targetProgress.current = Math.min(1, Math.abs(nx));
      targetIsRight.current = nx >= 0;
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [motionEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFromClientX = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      targetProgress.current = Math.min(1, Math.abs(nx));
      targetIsRight.current = nx >= 0;
    };

    const handleMouseMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const handleMouseLeave = () => {
      targetProgress.current = 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updateFromClientX(touch.clientX);
    };
    const handleTouchEnd = () => {
      targetProgress.current = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    let rafId: number;
    const tick = () => {
      smoothedProgress.current += (targetProgress.current - smoothedProgress.current) * SMOOTHING;

      const gradAngleDeg = targetIsRight.current ? 90 : 270;
      const stop1 = (1 - smoothedProgress.current) * 100;
      const stop2 = Math.min(100, stop1 + FEATHER_WIDTH);
      // Extra in-between stops (instead of a plain two-color fade) bend the
      // falloff into a soft S-curve so the edge reads as a gradual vignette
      // rather than a hard line sweeping across the photo.
      const quarter = stop1 + (stop2 - stop1) * 0.25;
      const mid = stop1 + (stop2 - stop1) * 0.5;
      const threeQuarter = stop1 + (stop2 - stop1) * 0.75;
      const gradient = `linear-gradient(${gradAngleDeg}deg, transparent 0%, transparent ${stop1}%, rgba(0,0,0,0.15) ${quarter}%, rgba(0,0,0,0.5) ${mid}%, rgba(0,0,0,0.85) ${threeQuarter}%, black ${stop2}%, black 100%)`;

      const blurOpacity = Math.min(1, smoothedProgress.current * 1.3);
      const blurPx = smoothedProgress.current * 14;
      const dimOpacity = smoothedProgress.current * 0.85;

      const blurLayer = blurLayerRef.current;
      if (blurLayer) {
        blurLayer.style.opacity = String(blurOpacity);
        blurLayer.style.filter = `blur(${blurPx}px)`;
        blurLayer.style.setProperty('mask-image', gradient);
        blurLayer.style.setProperty('-webkit-mask-image', gradient);
      }

      const dimLayer = dimLayerRef.current;
      if (dimLayer) {
        dimLayer.style.opacity = String(dimOpacity);
        dimLayer.style.background = gradient;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" onError={onError} />
      <img
        ref={blurLayerRef}
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <div ref={dimLayerRef} className="pointer-events-none absolute inset-0" style={{ opacity: 0 }} />

      {needsMotionPermission && (
        <button
          type="button"
          onClick={requestMotionPermission}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-primary/80 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-black/30 backdrop-blur-xl"
        >
          Enable tilt controls
        </button>
      )}
    </div>
  );
};

const TiltFold = () => {
  const background = useOutletContext<BubbleBackgroundOption>();
  const { setHidden: setHeaderHidden } = useHeaderVisibility();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHeaderHidden(!!imageSrc);
    return () => setHeaderHidden(false);
  }, [imageSrc, setHeaderHidden]);

  const loadFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Some phones save camera photos in formats (HEIC, etc.) that not every
      // mobile browser can decode. FileReader happily reads the raw bytes
      // either way, so probe-decode before showing it - otherwise a bad
      // format shows up as a silent broken-image icon on the fullscreen view.
      const probe = new Image();
      probe.onload = () => setImageSrc(dataUrl);
      probe.onerror = () =>
        setError("Couldn't display that photo - it may be in a format this browser can't show. Try a JPEG or PNG.");
      probe.src = dataUrl;
    };
    reader.onerror = () => setError('Could not read that image. Try a different file.');
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    loadFile(e.dataTransfer.files[0]);
  };

  const changeImage = () => {
    setImageSrc(null);
    setError(null);
  };

  const gradient = `linear-gradient(135deg, ${background.from}, ${background.to})`;

  return (
    <>
      <motion.div
        className="container relative flex h-full flex-col place-content-center gap-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: 'easeInOut' }}
      >
        {!imageSrc && (
          <>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h1 className="text-2xl font-bold tracking-tight">Tilt Fold</h1>
              <p className="mt-1 text-sm text-secondary/60">
                Tilt your phone (or move your cursor) left and right across the photo.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.05 }}
              className="mx-auto flex w-full max-w-sm flex-col items-center gap-4"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  'flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed p-6 text-center transition-colors sm:h-80',
                  isDragging ? 'border-secondary/40 bg-secondary/10' : 'border-secondary/15 bg-secondary/5'
                )}
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl text-white"
                  style={{ background: gradient }}
                >
                  <ImageUp size={24} />
                </span>
                <p className="text-sm font-medium text-secondary">Drop an image, or click to browse</p>
                <p className="text-xs text-secondary/50">Stays on this device - nothing is uploaded.</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => loadFile(e.target.files?.[0])}
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <Link to="/" className="text-sm text-secondary/60 transition-colors hover:text-secondary">
                Back home
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>

      {imageSrc &&
        createPortal(
          <motion.div
            className="fixed inset-0 z-20 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <TiltFoldImage
              src={imageSrc}
              className="h-full w-full"
              onError={() => {
                setImageSrc(null);
                setError("Couldn't display that photo - it may be in a format this browser can't show. Try a JPEG or PNG.");
              }}
            />

            <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
              <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-primary/70 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur-xl">
                <button
                  type="button"
                  onClick={changeImage}
                  style={{ background: gradient }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <RefreshCw size={14} />
                  Change image
                </button>
                <Link
                  to="/"
                  className="text-xs font-medium text-white/70 transition-colors hover:text-white"
                >
                  Back home
                </Link>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </>
  );
};

export default TiltFold;
