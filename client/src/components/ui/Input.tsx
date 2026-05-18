interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) => {

  return (

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        dark:bg-slate-950
        bg-white
        border
        dark:border-slate-800
        border-slate-300
        rounded-xl
        px-4
        py-3
        dark:text-white
        text-slate-900
        dark:placeholder:text-slate-500
        placeholder:text-slate-400
        outline-none
        focus:border-blue-500
        transition
        shadow-sm
      "
    />

  );
};

export default Input;