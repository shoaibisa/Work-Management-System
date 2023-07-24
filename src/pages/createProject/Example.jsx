import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../middleware/connect";

// make form which send the image and name

const Example = () => {
  const [name, setName] = useState("s");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("file", image);
    // console.log(name, image, formData);

    // await axios.post(
    //   `${baseUrl}/project/createTask`,
    //   { data: name },
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // );
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image);
    console.log(name, image, formData);

    try {
      await fetch(`${baseUrl}/project/createTask`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData, // Use the formData object instead of 'name'
      });

      // Handle successful response
      console.log("Task created successfully!");
    } catch (error) {
      // Handle error
      console.error("Error creating task:", error);
    }
  };

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setError("");
    setImage(e.target.files[0]);
  };

  return (
    // style centre
    <div style={{ justifyContent: "center" }}>
      <h1>Example</h1>
      <form onSubmit={handleSubmit} encType="">
        <input
          type="text"
          onChange={handleChange}
          name="name"
          value={name}
          placeholder="Enter project name"
        />
        <input type="file" name="file" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Project created successfully</p>}
    </div>
  );
};

export default Example;
