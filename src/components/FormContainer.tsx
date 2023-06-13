import React, { useState, } from 'react';
import PopupForm from './form/PopupForm';
import Snackbar from './form/SuccessRegistration';
import ContentForm from './form/ContentForm';

const ContainerForm: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
  });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleFormSubmit = async () => {
    const isValidEmail = validateEmail(formData.email);

    // Periksa apakah semua input diisi
    if (formData.email.trim() === '' || formData.fname.trim() === '' || formData.lname.trim() === '') {
      // Set pesan kesalahan jika ada input yang kosong
      setEmailError('All fields are required');
      return closePopup;
    }
    if (!isValidEmail) {
      return;
    }
    try {
      localStorage.setItem('formData', JSON.stringify(formData));
      setShowSnackbar(true);
      setFormData({
        email: '',
        fname: '',
        lname: '',
      });
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };
  

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="mt-6">
        <button
          className="cursor-pointer border-[1px] border-grey px-6 py-1 text-md font-semibold top-[3px] right-[3px] bg-white rounded-lg hover:scale-110 duration-200"
          onClick={openPopup}
        >
          Join Photo Club Membership
        </button>
        {isPopupOpen && (
          <PopupForm onClose={closePopup}>
            <ContentForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={() => {
                handleFormSubmit(), closePopup }}
              emailError={emailError}
              required={true}
            />
          </PopupForm>
        )}
      </div>

      {showSnackbar && (
        <Snackbar showSnackbar={showSnackbar} onClose={closeSnackbar}>
          Your Registration has been submitted successfully!
        </Snackbar>
      )}
    </div>
  );
};

export default ContainerForm;