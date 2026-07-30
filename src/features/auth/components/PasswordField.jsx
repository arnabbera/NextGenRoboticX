import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordField({
  id = "password",
  name = "password",
  label = "Password",
  value,
  onChange,
  placeholder = "Enter your password",
  error = "",
  required = false,
  autoComplete = "current-password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div
        className={`flex items-center rounded-xl border transition ${
          error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200"
        }`}
      >
        <div className="px-3 text-gray-400">
          <Lock size={18} />
        </div>

        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="flex-1 border-0 bg-transparent py-3 pr-3 outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="px-3 text-gray-500 hover:text-blue-600 transition"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}