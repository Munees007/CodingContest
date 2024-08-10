import Lottie from "lottie-react";
import React, { useState } from "react";
import formAni from "../assets/animations/form.json";

interface FormData {
  name: string;
  rollNumber: string;
  className: string;
  email: string;
}

interface FromProps {
  onSubmit?: (formData: FormData) => void;
}
const Form: React.FC<FromProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    rollNumber: "",
    className: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //   const response = await axios.post('/.netlify/functions/submitFormData', formData);
      //   console.log(response.data);
      //   if (response.data.success) {
      if (!onSubmit) return;
      onSubmit(formData);
      //     // Clear form data after submission
      setFormData({
        name: "",
        rollNumber: "",
        className: "",
        email: "",
      });
      //   } else {
      //     console.error(response.data.message);
      //   }
      localStorage.setItem("userData", JSON.stringify(formData));
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  return (
    <div className="">
      <Lottie animationData={formAni} loop className="w-32 absolute top-16 -rotate-12 left-80"/>
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col w-[40rem] p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl text-center font-semibold mb-4">
          Registeration
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-lg px-4 py-2 border-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rollNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-lg border-2 px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="className"
            className="block text-gray-700 font-bold mb-2"
          >
            Class
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-lg border-2 px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-lg border-2 px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 mt-2 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
