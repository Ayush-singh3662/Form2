import useForm from '../hooks/useForm';

const JobApplicationForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: '',
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleCheckboxChange,
  } = useForm(initialValues, validate);

  function validate(values) {
    let errors = {};

    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';

    if (
      (values.position === 'Developer' || values.position === 'Designer') &&
      (!values.relevantExperience || values.relevantExperience <= 0)
    ) {
      errors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    }

    if (values.position === 'Designer' && !values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (
      values.portfolioURL &&
      !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioURL)
    ) {
      errors.portfolioURL = 'Portfolio URL is invalid';
    }

    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }

    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
    }

    if (!values.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }

    return errors;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          placeholder='Enter your full name'
        />
        {errors.fullName && <p>{errors.fullName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder='Enter your email'
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          placeholder='Enter your phone number'
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>Applying for Position:</label>
        <select name="position" value={values.position} onChange={handleChange}>
          <option value="">Select Position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div>
          <label>Relevant Experience (Years):</label>
          <input
            type="number"
            name="relevantExperience"
            value={values.relevantExperience}
            onChange={handleChange}
          />
          {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
        </div>
      )}
      {values.position === 'Designer' && (
        <div>
          <label>Portfolio URL:</label>
          <input
            type="text"
            name="portfolioURL"
            value={values.portfolioURL}
            onChange={handleChange}
          />
          {errors.portfolioURL && <p>{errors.portfolioURL}</p>}
        </div>
      )}
      {values.position === 'Manager' && (
        <div>
          <label>Management Experience:</label>
          <input
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && <p>{errors.managementExperience}</p>}
        </div>
      )}
      <div>
        <label>Additional Skills:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="JavaScript"
              checked={values.additionalSkills.includes('JavaScript')}
              onChange={handleCheckboxChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="CSS"
              checked={values.additionalSkills.includes('CSS')}
              onChange={handleCheckboxChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="Python"
              checked={values.additionalSkills.includes('Python')}
              onChange={handleCheckboxChange}
            />
            Python
          </label>
        </div>
        {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
      </div>
      <div>
        <label>Preferred Interview Time:</label>
        <input
          type="datetime-local"
          name="interviewTime"
          value={values.interviewTime}
          onChange={handleChange}
        />
        {errors.interviewTime && <p>{errors.interviewTime}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;