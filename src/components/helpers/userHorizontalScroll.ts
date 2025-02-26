import { useEffect, type RefObject } from "react";

export function useHorizontalScroll(elRef: RefObject<HTMLDivElement | null>) {

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, [elRef]);

  return elRef;
}