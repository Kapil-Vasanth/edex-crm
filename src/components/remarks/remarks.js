import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { FaSearch, FaAngleRight, FaAngleLeft, FaEye } from 'react-icons/fa';

function Remarks() {

const navigate = useNavigate();

    const handleViewClick = (item) => {
      navigate('/ApplicantDetails', {
       state: {
          applicantId: item.studentId,
          applicantName: `${item.firstName} ${item.lastName}`,
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

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');


    const myApplicants = [
        { 
            studentId: 'JOUS01',
            firstName: 'John',
            lastName: 'Doe',
            referredBy: 'EDEX Academy', 
            education: 'Bachelor of Engineering', 
            phone: '+1 555-123-4567', 
            email: 'john.doe@example.com',
            university: 'Harvard University',
            citizenship: 'USA',
            passport: 'P12345678',
            ielts: 'Yes',
            status: 'Pending'
        },
        { 
            studentId: 'JACA02',
            firstName: 'Jane',
            lastName: 'Smith', 
            referredBy: 'Global Education', 
            education: 'Master of Science', 
            phone: '+1 555-987-6543', 
            email: 'jane.smith@example.com',
            university: 'Massachusetts Institute of Technology',
            citizenship: 'Canada',
            passport: 'P87654321',
            ielts: 'Yes',
            status: 'Approved'
        },
        { 
            studentId: 'SAUK03',
            firstName: 'Sam',
            lastName: 'Brown', 
            referredBy: 'Study Abroad Consultants', 
            education: 'Bachelor of Arts', 
            phone: '+44 20 7123 4567', 
            email: 'sam.brown@example.com',
            university: 'University of Cambridge',
            citizenship: 'UK',
            passport: 'P11223344',
            ielts: 'Yes',
            status: 'Rejected'
        },
        { 
            studentId: 'EMAU04',
            firstName: 'Emily',
            lastName: 'Johnson', 
            referredBy: 'International Studies', 
            education: 'Bachelor of Science', 
            phone: '+61 2 9876 5432', 
            email: 'emily.j@example.com',
            university: 'Stanford University',
            citizenship: 'Australia',
            passport: 'P55667788',
            ielts: 'Yes',
            status: 'Pending'
        },
        { 
            studentId: 'MIGE05',
            firstName: 'Michael',
            lastName: 'Williams', 
            referredBy: 'Global Pathways', 
            education: 'Master of Engineering', 
            phone: '+49 30 12345678', 
            email: 'michael.w@example.com',
            university: 'Imperial College London',
            citizenship: 'Germany',
            passport: 'P33445566',
            ielts: 'Yes',
            status: 'Approved'
        },
        { 
            studentId: 'SAUS06',
            firstName: 'Sarah',
            lastName: 'Davis', 
            referredBy: 'Education First', 
            education: 'Bachelor of Commerce', 
            phone: '+1 555-234-5678', 
            email: 'sarah.d@example.com',
            university: 'University of California, Berkeley',
            citizenship: 'USA',
            passport: 'P77889900',
            ielts: 'Yes',
            status: 'Pending'
        },
        { 
            studentId: 'DAME07',
            firstName: 'David',
            lastName: 'Martinez', 
            referredBy: 'Study Overseas', 
            education: 'Bachelor of Technology', 
            phone: '+52 55 1234 5678', 
            email: 'david.m@example.com',
            university: 'California Institute of Technology',
            citizenship: 'Mexico',
            passport: 'P99001122',
            ielts: 'Yes',
            status: 'Approved'
        },
        { 
            studentId: 'LASP08',
            firstName: 'Laura',
            lastName: 'Garcia', 
            referredBy: 'European Studies', 
            education: 'Master of Arts', 
            phone: '+34 91 123 45 67', 
            email: 'laura.g@example.com',
            university: 'University of Oxford',
            citizenship: 'Spain',
            passport: 'P22334455',
            ielts: 'Yes',
            status: 'Rejected'
        },
        { 
            studentId: 'JABR09',
            firstName: 'James',
            lastName: 'Rodriguez', 
            referredBy: 'Latin America Studies', 
            education: 'Bachelor of Business', 
            phone: '+55 11 98765-4321', 
            email: 'james.r@example.com',
            university: 'National University of Singapore',
            citizenship: 'Brazil',
            passport: 'P66778899',
            ielts: 'Yes',
            status: 'Pending'
        },
        { 
            studentId: 'SONE10',
            firstName: 'Sophia',
            lastName: 'Wilson', 
            referredBy: 'Pacific Education', 
            education: 'Master of Design', 
            phone: '+64 9 123 4567', 
            email: 'sophia.w@example.com',
            university: 'University of Cambridge',
            citizenship: 'New Zealand',
            passport: 'P00112233',
            ielts: 'Yes',
            status: 'Approved'
        },
        { 
            studentId: 'ROFR11',
            firstName: 'Robert',
            lastName: 'Johnson', 
            referredBy: 'French Connection', 
            education: 'Bachelor of Architecture', 
            phone: '+33 1 23 45 67 89', 
            email: 'robert.j@example.com',
            university: 'Imperial College London',
            citizenship: 'France',
            passport: 'P44556677',
            ielts: 'Yes',
            status: 'Pending'
        },
        { 
            studentId: 'EMIN12',
            firstName: 'Emma',
            lastName: 'Thompson', 
            referredBy: 'Asian Studies', 
            education: 'Master of Pharmacy', 
            phone: '+91 98765 43210', 
            email: 'emma.t@example.com',
            university: 'National University of Singapore',
            citizenship: 'India',
            passport: 'P88990011',
            ielts: 'Yes',
            status: 'Approved'
        },
        { 
            studentId: 'DASO13',
            firstName: 'Daniel',
            lastName: 'Lee', 
            referredBy: 'African Studies', 
            education: 'Bachelor of Agriculture', 
            phone: '+27 11 123 4567', 
            email: 'daniel.l@example.com',
            university: 'Stanford University',
            citizenship: 'South Africa',
            passport: 'P33445566',
            ielts: 'Yes',
            status: 'Rejected'
        },
        { 
            studentId: 'OLJA14',
            firstName: 'Olivia',
            lastName: 'Chen', 
            referredBy: 'East Asian Studies', 
            education: 'Bachelor of Computer Science', 
            phone: '+81 3 1234 5678', 
            email: 'olivia.c@example.com',
            university: 'Stanford University',
            citizenship: 'Japan',
            passport: 'P77889900',
            ielts: 'Yes',
            status: 'Pending'
        },
        { 
            studentId: 'WIIT15',
            firstName: 'William',
            lastName: 'Kim', 
            referredBy: 'Mediterranean Studies', 
            education: 'Master of Fine Arts', 
            phone: '+39 06 1234567', 
            email: 'william.k@example.com',
            university: 'California Institute of Technology',
            citizenship: 'Italy',
            passport: 'P11223344',
            ielts: 'Yes',
            status: 'Approved'
        }
    ]

    // Filter items based on search term
    const filteredItems = myApplicants.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.firstName.toLowerCase().includes(searchLower) ||
            item.lastName.toLowerCase().includes(searchLower) ||
            item.referredBy.toLowerCase().includes(searchLower) ||
            item.education.toLowerCase().includes(searchLower) ||
            item.phone.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower) ||
            item.studentId.toLowerCase().includes(searchLower)
        );
    });

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const displayedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    return (
        <div className='details-wrapper'>
            <div className='heading'>
                <h4>Applicants</h4>
            </div>
            <div className='table-container'>
                <div className='search-box-container'>
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Search by name, email, phone or ID..." 
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="button"><FaSearch /></button>
                    </div>
                </div>
                <div className='toggle-container'>
                <div className='table-responsive'>
                    <table>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Referred by</th>
                                <th>Education Qualification</th>
                                <th>Phone No.</th>
                                <th>Email ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {displayedItems.map((item, index) => (
                                <tr key={index} className="item">
                                    <td>{item.studentId}</td>
                                    <td>{item.firstName} {item.lastName}</td>
                                    <td>{item.referredBy}</td>
                                    <td>{item.education}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td  className="action-view">
                                        <button className="view-btn" key={index} onClick={() => handleViewClick(item)}>
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
                            <div className='page-numbers'>
                                <button className="pagination-button" onClick={handlePrevClick} disabled={currentPage === 1}>
                                    <FaAngleLeft />
                                </button>
                                <span className="page-info">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button className="pagination-button" onClick={handleNextClick} disabled={currentPage === totalPages}>
                                    <FaAngleRight />
                                </button>
                            </div>
                            <div className='total-items'>
                                <span className="page-info">
                                    Showing {displayedItems.length} of {totalItems} items
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className='no-results'>
                            <span>No applicants found matching your criteria</span>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
}

export default Remarks;