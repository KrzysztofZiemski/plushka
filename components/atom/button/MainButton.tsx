import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

import { ButtonHTMLAttributes } from "react";
import Loader from "../loader/Loader";
import { LoadingIcon } from "../../../assets/icons";

export interface MainButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  focus?: boolean;
  ripple?: boolean;
  isLoading?: boolean;
  size?: "small" | "normal";
}

const MainButton = ({
  children,
  onClick,
  className,
  focus,
  ripple = true,
  size = "normal",
  isLoading = false,
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

    onClick && !isLoading && onClick(event);
  };

  useEffect(() => {
    if (!focus || !ref) return;
    ref.current?.focus();
  }, [focus, ref]);

  return (
    <button
      className={`bg-primary flex items-center justify-center text-base text-white outline-0 ${
        styles.mainButton
      } ${size === "small" ? `h-8 p-0!` : "h-10"} ${className}`}
      onClick={ripple ? createRipple : onClick}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <LoadingIcon
          className={size === "small" ? styles.smallLoader : styles.loader}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default MainButton;
