import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL if different
});


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
        const response = await API.put(`/students/${id}/emergency-contacts`, { "emergency_contacts": emergencyContacts });
        return response.data; // Returns the updated student
    } catch (error) {
        console.error("Error updating student emergency contacts:", error);
        throw error;
    }
}

