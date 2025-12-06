'use client';

import { useEffect, useCallback, useRef } from 'react';
import { Direction } from '@/lib/types';

interface UseInputOptions {
  onMove: (direction: Direction) => void;
  enabled?: boolean;
}

export function useInput({ onMove, enabled = true }: UseInputOptions): void {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isMovingRef = useRef(false);

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || isMovingRef.current) return;

      let direction: Direction | null = null;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          direction = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          direction = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          direction = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          direction = 'right';
          break;
      }

      if (direction) {
        event.preventDefault();
        isMovingRef.current = true;
        onMove(direction);
        
        // Reset moving flag after animation
        setTimeout(() => {
          isMovingRef.current = false;
        }, 100);
      }
    },
    [onMove, enabled]
  );

  // Handle touch start
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;
      
      const touch = event.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [enabled]
  );

  // Handle touch end (swipe)
  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled || !touchStartRef.current || isMovingRef.current) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Minimum swipe distance
      const minSwipeDistance = 30;

      if (
        Math.abs(deltaX) < minSwipeDistance &&
        Math.abs(deltaY) < minSwipeDistance
      ) {
        touchStartRef.current = null;
        return;
      }

      let direction: Direction | null = null;

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        // Vertical swipe
        direction = deltaY > 0 ? 'down' : 'up';
      }

      if (direction) {
        event.preventDefault();
        isMovingRef.current = true;
        onMove(direction);
        
        // Reset moving flag after animation
        setTimeout(() => {
          isMovingRef.current = false;
        }, 100);
      }

      touchStartRef.current = null;
    },
    [onMove, enabled]
  );

  // Set up event listeners
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleKeyDown, handleTouchStart, handleTouchEnd, enabled]);
}
