import React from 'react';

interface ContentFormProps {
  formData: {
    email: string;
    fname: string;
    lname: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  emailError: string; 
  required: true;
}

const ContentForm: React.FC<ContentFormProps> = ({ formData, onChange, onSubmit, emailError }) => {

  return (
    <div className="max-w-[600px] min-h-[300px] fixed z-50 top-[30vh] px-12 py-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-slate-800">Register to Photo Club Member</h1>
      <p className="text-sm text-gray-600">Get countless benefit by joining as a member of Photo Club!</p>
      <div>
        <form>
          <label className="flex flex-col mt-4">
            <span className="text-sm font-semibold">User Email</span>
            <input
              className="mt-1 border-[1px] text-sm border-gray-400 px-2 py-1 rounded-lg"
              type="email"
              name="email" 
              placeholder="Insert your email"
              value={formData.email}
              onChange={onChange}
              required={true}
            />
            <span className="mt-1 ml-2 text-sm text-red-600">{emailError}</span>
          </label>
          <label className="flex flex-col mt-2">
            <span className="text-sm font-semibold">First Name</span>
            <input
              className="mt-1 border-[1px] text-sm border-gray-400 px-2 py-1 rounded-lg"
              type="text"
              name="fname"
              placeholder="Insert your first name"
              value={formData.fname}
              onChange={onChange}
              required={true}
            />
            <span className="mt-1 ml-2 text-sm text-red-600"></span>
          </label>
          <label className="flex flex-col mt-2">
            <span className="text-sm font-semibold">Last Name</span>
            <input
              className="mt-1 border-[1px] text-sm border-gray-400 px-2 py-1 rounded-lg"
              type="text"
              name="lname"
              placeholder="Insert your last name"
              value={formData.lname}
              onChange={onChange}
              required={true}
            />
            <span className="mt-1 ml-2 text-sm text-red-600"></span>
          </label>
          <button className="mt-4 w-full cursor-pointer border-[1px] border-grey px-6 py-1 text-md font-semibold top-[3px] right-[3px] bg-sky-950 text-white rounded-lg duration-200" onClick={onSubmit}>
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentForm;