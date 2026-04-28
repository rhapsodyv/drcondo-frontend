import { useSwipeable, type SwipeableHandlers } from 'react-swipeable';

interface UseSwipeToCloseOptions {
  side: 'left' | 'right';
  onClose: () => void;
  enabled?: boolean;
}

export function useSwipeToClose({
  side,
  onClose,
  enabled = true,
}: UseSwipeToCloseOptions): SwipeableHandlers {
  return useSwipeable({
    onSwipedLeft: enabled && side === 'left' ? onClose : undefined,
    onSwipedRight: enabled && side === 'right' ? onClose : undefined,
    delta: 50,
    trackTouch: true,
    trackMouse: false,
  });
}
