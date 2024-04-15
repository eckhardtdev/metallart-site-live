export function ButtonArrow(props) {
  return (
    <div {...props}>
      {/* Original size: 42 x 15 px */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 62 15"
        className="relative top-[2px] w-[3.875em] flex-none"
      >
        <rect
          x="0"
          y="6.5"
          width="42"
          height="2"
          className="fill-current hovers:transition-transform hovers:group-hover:scale-x-[1.38]"
        />
        <path
          className="fill-current hovers:transition-transform hovers:group-hover:translate-x-4"
          d="M42.42 8.209a1.017 1.017 0 0 0 0-1.438L35.947.298a1.018 1.018 0 0 0-1.438 1.442l5.753 5.75-5.753 5.75a1.017 1.017 0 0 0 1.438 1.438Zm-.719.3Z"
        />
      </svg>
    </div>
  )
}
