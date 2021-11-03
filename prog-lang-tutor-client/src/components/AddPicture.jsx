


import React, { useState } from "react";

// import the service since we need it to send (and get) the data to(from) the server
import service from "../../api/service";

function AddPicture() {

    const [profilePic, setProfilePic] = useState(" ");

    // ******** this method handles just the file upload ********
    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();


        uploadData.append("profilePic", e.target.files[0]);

        service
            .handleFileUpload(uploadData)
            .then((response) => {

                setProfilePic(response.secure_url);
            })
            .catch((err) => console.log("Error while uploading the file: ", err));
    };

    // this method submits the form
    const handleSubmit = (e) => {
        e.preventDefault();

        service
            .saveNewPic({ profilePic })
            .then((res) => {




                setProfilePic("");

            })
            .catch((err) => console.log("Error while adding the new movie: ", err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>




                <input type="file" onChange={(e) => handleFileUpload(e)} />

                <button type="submit">Save new Image</button>
            </form>
        </div>
    );
}

export default AddPicture;