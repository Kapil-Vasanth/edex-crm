import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Fallback to localhost if not defined
});

// Axios request interceptor to include the token in the Authorization header
API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach token if it exists
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
  
// Axios response interceptor to handle errors globally (e.g., token expiration)
API.interceptors.response.use(
(response) => {
    return response;
},
(error) => {
    if (error.response && error.response.status === 401) {
    // Token expired or invalid, handle logout or refresh token here
    localStorage.removeItem('authToken');
    // Optionally redirect to login page
    window.location.href = '/login';
    }
    return Promise.reject(error);
}
);

export const agentLogin = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        const { token, agent } = response.data;
        localStorage.clear(); // Clear any existing localStorage data
        localStorage.setItem('authToken', token); // Store the token in localStorage
        localStorage.setItem('agent', agent.name); // Store the agent email in localStorage
        localStorage.setItem('role', agent.role); // Store the agent role in localStorage
        return response.data; // Returns the agent data or token
    } catch (error) {
        console.error('Error during agent login:', error);
        throw error; // Propagate the error
    }
}

export const studentLogin = async (email, password) => {
    try {
        const response = await API.post('/auth/student-login', { email, password });
        const { token, student } = response.data;
        localStorage.clear(); // Clear any existing localStorage data
        localStorage.setItem('authToken', token); // Store the token in localStorage
        localStorage.setItem('student', student.first_name); // Store the student name in localStorage
        localStorage.setItem('role', 'student'); // Store the student role in localStorage
        return response.data; // Returns the student data or token
    } catch (error) {
        console.error('Error during student login:', error);
        throw error; // Propagate the error
    }
}

export const studentSignup = async ({ firstname, lastname, citizenship, email, password }) => {
  try {
    console.log("Signing up student with data:", { firstname, lastname, citizenship, email, password })
    const response = await API.post('/auth/student-signup', {
      firstname,
      lastname,
      citizenship,
      email,
      password,
    });

    // Optionally, return a message or student data
    return response.data;
  } catch (error) {
    console.error('Error during student signup:', error);
    throw error;
  }
};


// Get all students
export const getAllStudents = async () => {
    try {
        const response = await API.get('/students');
        return response.data; // Returns the list of students
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error; // Propagate the error
    }
};

// Send forgot password email
export const forgotPassword = async (email) => {
    try {
      const response = await API.post('/auth/forgot-password', { email });
      return response.data; // Expected to return { message: 'Password reset link sent to email' }
    } catch (error) {
      console.error('Error sending forgot password request:', error);
      throw error;
    }
};
  
// Reset the password
export const resetPassword = async (token, newPassword) => {
try {
    const response = await API.post('/auth/reset-password', { token, newPassword });
    return response.data; // Expected to return { message: 'Password has been reset successfully' }
} catch (error) {
    console.error('Error resetting password:', error);
    throw error;
}
};

// Get a student by ID
export const getStudentById = async (id) => {
    try {
        const response = await API.get(`/students/${id}`);
        return response.data; // Returns the student data
    } catch (error) {
        console.error('Error fetching student:', error);
        throw error;
    }
};

export const uploadStudentAvatar = async (id, selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
  
      const response = await API.post(`/students/${id}/upload-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // Returns the updated avatar path or student info
    } catch (error) {
      console.error("Error uploading student avatar:", error);
      throw error;
    }
};

export const uploadStudentDocument = async (id, formData) => {
    try {
      // Add the student ID to the formData for server-side verification
      formData.append("student_id", id);
    
      const response = await API.post(`/students/${id}/upload-document`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      return response.data; // updated student or document object
    } catch (error) {
      console.error("Error uploading student document:", error);
      throw error;
    }
  };
  
  

// Create a new student
export const createStudent = async (studentData) => {
    try {
        const response = await API.post('/students', studentData);
        return response.data; // Returns the created student
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
};

// Update a student by ID
export const updateStudent = async (id, studentData) => {
    console.log(studentData)
    try {
        const response = await API.put(`/students/${id}`, studentData);
        return response.data; // Returns the updated student
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};

// Delete a student by ID
export const deleteStudent = async (id) => {
    try {
        const response = await API.delete(`/students/${id}`);
        return response.data; // Returns success message or result
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};

export const updateStudentContactDetails = async (id, contactDetails) => {
    console.log("Updating contact details for student ID:", id, "with details:", contactDetails);
    try {
        const response = await API.put(`/students/${id}/contact-details`, {"contact_details":contactDetails});
        return response.data; // Returns the updated student
    } catch (error) {
        console.error('Error updating student contact details:', error);
        throw error;
    }
}

export const updateStudentAddressDetails = async (id, addressDetails) => {
    console.log(addressDetails)
    try {
        const response = await API.put(`/students/${id}/address-details`, { "address_details": addressDetails });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student address details:", error);
        throw error;
    }
};

export const updateStudentEmergencyContacts = async (id, emergencyContacts) => {
    try {
        const response = await API.put(`/students/${id}/emergency-details`, { "emergency_contacts": emergencyContacts });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student emergency contacts:", error);
        throw error;
    }
}

export const updateStudentSecondaryEducation = async (id, secondaryEducation) => {
    try {
        const response = await API.put(`/students/${id}/academic-details`, { "academic_details": secondaryEducation });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student secondary education:", error);
        throw error;
    }
}

export const updateStudentTertiaryEducation = async (id, tertiaryEducation) => {
    try {
        const response = await API.put(`/students/${id}/tertiary-education`, { "tertiary_education": tertiaryEducation });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student secondary education:", error);
        throw error;
    }
}

export const updateStudentEmploymentHistory = async (id, employmentHistory) => {
    try {
        const response = await API.put(`/students/${id}/employment-history`, { "employment_history": employmentHistory });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student employment history:", error);
        throw error;
    }
}

export const updateStudentLanguageProficiency = async (id, languageProficiency) => {
    try {
        const response = await API.put(`/students/${id}/language-proficiency`, { "language_proficiency": languageProficiency });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student language proficiency:", error);
        throw error;
    }
}

export const updateStudentUnsubmittedProgrammes = async (id, unsubmittedProgrammes) => {
    console.log("Updating unsubmitted programmes for student ID:", id, "with programmes:", unsubmittedProgrammes);
    try {
        const response = await API.put(`/students/${id}/unsubmitted-programmes`, { "unsubmitted_programmes": unsubmittedProgrammes });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student unsubmitted programmes:", error);
        throw error;
    }
}

export const updateStudentSubmittedProgrammes = async (id, submittedProgrammes) => {
    console.log("Updating submitted programmes for student ID:", id, "with programmes:", submittedProgrammes);
    try {
        const response = await API.put(`/students/${id}/submitted-programmes`, { "submitted_programmes": submittedProgrammes });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student submitted programmes:", error);
        throw error;
    }
};