interface ButtonProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({
  title,
  onClick,
  type = "button",
}: ButtonProps) => {

  return (

    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        dark:hover:bg-blue-500
        text-white
        font-semibold
        py-3
        rounded-xl
        transition
        duration-200
        cursor-pointer
        shadow-sm
        active:scale-[0.98]
      "
    >

      {title}

    </button>

  );
};

export default Button;