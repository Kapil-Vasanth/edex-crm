import React from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";
import {  useNavigate } from "react-router-dom";

const UploadedDocumentsSection = ({ documents = [],  onDelete }) => {
	const navigate = useNavigate();
	const onUploadClick = () => {
		navigate("./uploadDocument");
	}
	
	const onDownload = (fileSrc) => {
			if (!fileSrc) return;
			
			const link = document.createElement("a");
			link.href = fileSrc;
			link.download = fileSrc.split("/").pop(); // File name from URL
			link.target = "_blank"; // Optional: open in new tab if browser blocks downloads
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
	};
      
	return (
		<div className="Documents-section">
			<div className="section-header">
				<h4 className="section-title">Uploaded Documents</h4>
				<button className="add-button" onClick={onUploadClick}>
					<i className="fas fa-plus"></i> Upload Specific Document
				</button>
			</div>
			<div className="table-responsive">
				<table>
					<thead>
						<tr>
							<th>Document</th>
							<th>Uploaded File Name</th>
							<th>Certified</th>
							<th>Certified By</th>
							<th>Certified Date</th>
							<th>Uploaded</th>
							<th>View</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{documents.map((doc, index) => (
							<tr key={index}>
								<td>{doc.document_type || "-"}</td>
								<td>{doc.file_name || "-"}</td>
								<td><MdCheckBox /></td>
								<td>{doc.certified_by || "-"}</td>
								<td>{doc.certified_date ? new Date(doc.certified_date).toLocaleDateString() : "-"}</td>
								<td>{doc.upload_date ? new Date(doc.upload_date).toLocaleDateString() : "-"}</td>
								<td className="action">
									<button className="download-btn" onClick={() => onDownload(doc.file_src)}>
										<FaDownload /> Download
									</button>
								</td>
								<td className="action-view">
									<button className="delete-btn" onClick={() => onDelete(doc)}>
										<FaTrash /> Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UploadedDocumentsSection;