export const Inputcom = (props: {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  handelchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  const { type, placeholder, handelchange, label, value, name } = props;
  return (
    <>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor={label}
          className="text-white text-[15px] text-bold capitalize"
        >
          {label}
        </label>
        <div className="flex gap-7.5">
          <input
            type={type}
            placeholder={placeholder}
            className="border w-85  py-2.5 pl-3.75 bg-[#121212] rounded-[5px] outline-none hover:border hover:border-white border-[#7C7C7C]"
            name={name}
            onChange={handelchange}
            value={value}
          />
        </div>
      </div>
    </>
  );
};
