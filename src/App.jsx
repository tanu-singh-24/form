import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const initialValues = {
    fullname: "",
    rollno: "",
    email: "",
    contact: "",
    gender: "",
    year: "",
    branch:"",
    domain: "",
    resume: "",
    linkedin: "",
    github: "",
    about: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues({ ...formValues, [name]: files[0] });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
  
      // Log FormData to verify contents
      console.log("Form Data before appending:", formValues);
  
      // Append form fields to formData
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });
  
      // Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      // Send the POST request to your Apps Script endpoint
      fetch("https://script.google.com/macros/s/AKfycbytbaU9B12mvTymkB3Mm8eCD6cdpYPS2M-rxzFdLYKamSi3kDIh1PrWxaoAsvO4kfQi/exec", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          alert("Form submitted successfully!");
          setFormValues(initialValues); // Reset form values
          setIsSubmit(false); // Reset submission state
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error submitting your form.");
        });
    }
  };
  
  
 
  
  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      // This block will only be triggered after successful validation and submission
      console.log(formValues);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fullname) {
      errors.fullname = "Full Name is required!";
    }
    if (!values.rollno) {
      errors.rollno = "Roll No is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (values.contact && !/^\d{10}$/.test(values.contact)) {
      errors.contact = "Invalid phone number!";
    }
    if (!values.gender) {
      errors.gender = "Please select your gender.";
    }
    if (!values.year) {
      errors.year = "Please select your current year.";
    }
    if (!values.branch) {
      errors.year = "Please select your branch.";
    }
    if (!values.domain) {
      errors.domain = "Please select your domain.";
    }
    if (!values.resume) {
      errors.resume = "Please upload your resume.";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>REGISTRATION FORM</h1>
        <br></br>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>FULL NAME*</label>
            <div className="field-content">
              <input
                type="text"
                name="fullname"
                placeholder="Enter Full Name"
                value={formValues.fullname}
                onChange={handleChange}
              />
              <p className="error">
                {formErrors.fullname}
              </p>
            </div>
          </div>

          <div className="field">
            <label>ROLL NO*</label>
            <div className="field-content">
              <input
                type="text"
                name="rollno"
                placeholder="Enter Roll No"
                value={formValues.rollno}
                onChange={handleChange}
              />
              <p className="error">
                {formErrors.rollno}
              </p>
            </div>
          </div>

          <div className="field">
            <label>EMAIL*</label>
            <div className="field-content">
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="error">
                {formErrors.email}
              </p>
            </div>
          </div>

          <div className="field">
            <label>CONTACT NUMBER</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter Phone Number"
              value={formValues.contact}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="gender">Gender*</label>
            <div className="field-content">
              <select
                name="gender"
                id="gender"
                value={formValues.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p className="error">{formErrors.gender}</p>
            </div>
          </div>


          <div className="field">
            <label htmlFor="year">Year*</label>
            <div className="field-content">
              <select
                name="year"
                id="year"
                value={formValues.year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
              <p className="error">{formErrors.year}</p>
            </div>
          </div>


          <div className="field">
            <label htmlFor="branch">Branch*</label>
            <div className="field-content">
              <select
                name="branch"
                id="branch"
                value={formValues.branch}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>
                <option value="cse">CSE</option>
                <option value="csse">CSSE</option>
                <option value="csce">CSCE</option>
                <option value="it">IT</option>
                <option value="eee">EEE</option>
                <option value="etc">ETC</option>
                <option value="ee">EE</option>
                <option value="me">ME</option>
                <option value="ce">CE</option>
              </select>
              <p className="error">{formErrors.branch}</p>
            </div>
          </div>


          <div className="field">
            <label htmlFor="domain">Domain*</label>
            <div className="field-content">
              <select
                name="domain"
                id="domain"
                value={formValues.domain}
                onChange={handleChange}
              >
                <option value="">Select Domain</option>
                <option value="webdev">Web Dev</option>
                <option value="appdev">App Dev</option>
                <option value="coredev">Core Dev</option>
                <option value="cp">Competitive Programming</option>
                <option value="cybersecurity">Cyber Security</option>
                <option value="gamedev">Game Dev</option>
                <option value="blockchain">Blockchain</option>
              </select>
              <p className="error">{formErrors.domain}</p>
            </div>
          </div>


          <div className="field">
            <label htmlFor="resume">Upload Resume*</label>
            <div className="field-content">
              <input
                type="file"
                name="resume"
                id="resume"
                title="Upload your resume"
                onChange={handleFileChange}
              />
              <p className="error">
                {formErrors.resume}
              </p>
            </div>
          </div>


          <div className="field">
            <label>LINKEDIN LINK</label>
            <div className="field-content">
              <input
                type="text"
                name="linkedin"
                placeholder="Enter LinkedIn URL"
                value={formValues.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>GITHUB LINK</label>
            <div className="field-content">
              <input
                type="text"
                name="github"
                placeholder="Enter GitHub URL"
                value={formValues.github}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label>ABOUT</label>
            <div className="field-content">
              <textarea
                name="about"
                placeholder="Enter Description"
                value={formValues.about}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <button className="fluid ui button blue" type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default App;
