export const FormField = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
    >
      <Icon className="w-4 h-4 mr-2 text-green-600" />
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                   focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm 
                   transition duration-150 ease-in-out"
    />
  </div>
);
