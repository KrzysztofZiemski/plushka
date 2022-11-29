import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

import { ButtonHTMLAttributes } from "react";

export interface MainButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  focus?: boolean;
  ripple?: boolean;
  size?: "small" | "normal";
}

const MainButton = ({
  children,
  onClick,
  className,
  focus,
  ripple = true,
  ...props
}: MainButtonProps) => {
  const ref = useRef<null | HTMLButtonElement>(null);
  const createRipple = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add(styles.ripple);

    const ripple = button.getElementsByClassName(styles.ripple)[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    onClick && onClick(event);
  };

  useEffect(() => {
    if (!focus || !ref) return;
    ref.current?.focus();
  }, [focus, ref]);

  return (
    <button
      className={`${styles.mainButton} ${className}`}
      onClick={ripple ? createRipple : onClick}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};

export default MainButton;
