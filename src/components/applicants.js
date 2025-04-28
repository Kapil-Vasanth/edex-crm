import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaAngleRight, FaAngleLeft, FaEye } from "react-icons/fa";
import Maincontenttop from "./main-content-top";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import React Query hooks
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { createStudent, getAllStudents, API } from "../api/api";

function Applicants() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // To access and update the cache

  // Query for fetching applicants
  const { data: myApplicants = [], isLoading, error } = useQuery({
    queryKey: ['applicants'],
    queryFn: getAllStudents,
    onError: (err) => {
      toast.error("Error fetching applicants. Please try again later.");
      console.error("Error fetching applicants:", err);
    },
  });

  // Mutation for adding a new applicant
  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: (newApplicant) => {
      // Update the cache with the new applicant
      queryClient.setQueryData(['applicants'], (oldData) => [...oldData, newApplicant]);
      toast.success("New applicant added successfully!");
    },
    onError: (err) => {
      toast.error("Error adding new applicant. Please try again later.");
      console.error("Error adding new applicant:", err);
    },
  });

  const addNewApplicant = async (newApplicant) => {
    const generateStudentId = (firstName, citizenship, index) => {
      const namePart = firstName.substring(0, 2).toUpperCase();
      const citizenshipPart = citizenship.substring(0, 2).toUpperCase();
      const sequencePart = String(index + 1).padStart(2, "0");
      return `${namePart}${citizenshipPart}${sequencePart}`;
    };

    const nextIndex = myApplicants.length;

    const applicantToAdd = {
      student_id: generateStudentId(
        newApplicant.firstName || newApplicant.FirstName,
        newApplicant.citizenship || newApplicant.Citizenship,
        nextIndex
      ),
      university: newApplicant.university || newApplicant.University,
      first_name: newApplicant.firstName || newApplicant.FirstName,
      last_name: newApplicant.lastName || newApplicant.LastName,
      citizenship: newApplicant.citizenship || newApplicant.Citizenship,
      email: newApplicant.email || newApplicant.Email,
      phone: newApplicant.phone || newApplicant.Phone,
      passport: newApplicant.passport || newApplicant.PassportNo,
      ielts: newApplicant.ielts || newApplicant.IELTS,
      status: "",
    };

    mutation.mutate(applicantToAdd); // Trigger the mutation to add the new applicant
  };

  // Handle navigation for viewing applicant details
  const handleViewClick = (item) => {
    navigate(`/ApplicantDetails/${item.student_id}`, {
      state: {
        applicantObjectId: item._id,
        applicantId: item.student_id,
        applicantName: `${item.first_name} ${item.last_name}`,
        applicantUniversity: item.university,
        applicantDOB: item.DOB,
        applicantGender: item.gender,
        applicantCitizenship: item.citizenship,
        applicantEmail: item.email,
        applicantPhone: item.phone,
        applicantPassport: item.passport,
        applicantIELTS: item.ielts,
        applicantStatus: item.status,
      }
    });
  };

  // Filtering logic (search and university filter)
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [universityFilter, setUniversityFilter] = useState("all");

  const applicantList = Array.isArray(myApplicants) ? myApplicants : [];

  const uniqueUniversities = [
    ...new Set(applicantList.map((item) => item.university)),
  ];
  uniqueUniversities.sort();
  uniqueUniversities.unshift("All Universities");

  // Filter items based on search term and university filter
  const filteredItems = myApplicants.filter((item) => {
    const matchesSearch =
      item?.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.passport?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUniversity =
      universityFilter === "all" ||
      universityFilter === "All Universities" ||
      item.university === universityFilter;

    return matchesSearch && matchesUniversity;
  });

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleUniversityFilterChange = (e) => {
    setUniversityFilter(e.target.value);
    setCurrentPage(1);
  };

  const TooltipDesc = ({data}) => {
    const { student_id, university, citizenship, email, phone, passport, passport_expiry , referred_by, avatar, dob } = data;
    const avatarPath = avatar ? `${API.defaults.baseURL}/${avatar}` : "https://www.w3schools.com/howto/img_avatar.png";
    return <Tooltip id={data.student_id} className="big-tooltip">
      <img className="size-6" src={avatarPath} alt="Applicant" /> <br/>
      <h4> Student ID : {student_id}</h4>
      <h4> University : {university} </h4>
      <h4> Citizenship : {citizenship} </h4>
      <h4> Email : {email} </h4>
      <h4> DOB : {dob} </h4>
      <h4> Phone : {phone} </h4>
      <h4> Passport : {passport} </h4>
      <h4> Passport Expiry: {passport_expiry} </h4>
      <h4> Referred By : {referred_by} </h4>
    </Tooltip>;
  };

  // Loading state and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching applicants</div>;

  return (
    <div className="details-wrapper">
      <div className="heading">
        <h4>Applicants</h4>
      </div>
      <div className="table-container">
        <div className="search-box-container">
          <div className="addApplicant">
            <Maincontenttop onAddApplicant={addNewApplicant} />
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by ID, name, or email..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="button">
              <FaSearch />
            </button>
          </div>
          <div className="filter">
            <select value={universityFilter} onChange={handleUniversityFilterChange}>
              {uniqueUniversities.map((university, index) => (
                <option key={index} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="toggle-container">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>IELTS/PTE Score</th>
                  <th>Forms</th>
                  <th>OOP</th>
                  <th>Funds</th>
                  <th>SOP</th>
                  <th>Application Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="content">
                {displayedItems.map((item, index) => (
                  <tr key={index} className="item">
                    <td>
                      <span data-tooltip-id={item.student_id}>{item.student_id}</span>
                      <TooltipDesc data={item} />
                    </td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.ielts}</td>
                    <td>{item.date_of_form_filed}</td>
                    <td>{item.offer_of_place}</td>
                    <td>{item.funds_loan || item.funds_direct_deposit}</td>
                    <td>{item.sop}</td>
                    <td>{item.status}</td>
                    <td className="action-view">
                      <button className="view-btn" onClick={() => handleViewClick(item)}>
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            {totalItems > 0 ? (
              <>
                <div className="page-numbers">
                  <button
                    className="pagination-button"
                    onClick={handlePrevClick}
                    disabled={currentPage === 1}
                  >
                    <FaAngleLeft />
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="pagination-button"
                    onClick={handleNextClick}
                    disabled={currentPage === totalPages}
                  >
                    <FaAngleRight />
                  </button>
                </div>
                <div className="total-items">
                  <span className="page-info">
                    Showing {displayedItems.length} of {totalItems} items
                  </span>
                </div>
              </>
            ) : (
              <div className="no-results">
                <span>No applicants found matching your criteria</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicants;
