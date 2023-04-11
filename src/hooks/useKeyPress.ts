import { useEffect, useRef } from 'react';

function useKeyPress(handler: Function) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      handlerRef.current(event);
    }

    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);
}

export default useKeyPress;
