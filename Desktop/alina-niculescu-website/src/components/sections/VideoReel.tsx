import { useCallback } from 'react';
import { VideoCard } from '@/components/common/VideoCard';
import { Reveal } from '@/components/common/Reveal';
import type { VideoItem } from '@/types';
import { cn } from '@/utils/cn';

interface Props {
  items: VideoItem[];
  orientation?: 'landscape' | 'portrait';
}

export function VideoReel({ items, orientation = 'landscape' }: Props) {
  const pauseOthers = useCallback((id: string) => {
    document.querySelectorAll<HTMLVideoElement>('video[data-video-id]').forEach((v) => {
      if (v.dataset.videoId !== id) v.pause();
    });
  }, []);

  return (
    <div className={cn('reel', orientation === 'portrait' && 'vertical')}>
      {items.map((item, i) => (
        <Reveal key={item.id} delay={Math.min(i * 40, 320)}>
          <VideoCard item={item} onPlay={pauseOthers} />
        </Reveal>
      ))}
    </div>
  );
}
