import React,{useState} from "react";
import { showToastError, showToastSuccess, toastPopup } from "./Toast";
import axios from "axios";

const FileUpload = () => {
  const [loading, setLoading] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bytes, setBytes] = useState(0);
  const [file, setFile] = useState({});
  const [size, setSize] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target[0].files[0]);

    setSize(Math.round(e.target[0].files[0].size / 1024));
    showToastSuccess("File started uploading. Please wait");
    setLoading(true);
    axios
      .post(`http://${window.location.hostname}:8080/api/file/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          setBytes(Math.round(progressEvent.bytes / 1024));
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => setFile(res.data))
      .then(() => setLoading(false))
      .then(() => showToastSuccess("File upload Succesfully."))
      .catch(() => {
        showToastError("Error occured while uploading file.");
        setLoading(false);
      });
  };
  return (
    <div className="pt-20">
      <div className=" space-y-10">
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${uploadProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
          <div>File Size : {size} kb</div>
          <div>Speed : {bytes} kbps</div>
        </div>
        <div>{file.fileName}</div>
        <a className="text-blue-500" target="_blank" href={file.fileDownloadUri}>
          {file.fileDownloadUri}
        </a>

        <form className="h-full w-full space-y-10" onSubmit={handleSubmit}>
          <input type="file" disabled={loading} name="" id="" />
          <button disabled={loading} className={`px-3 py-2 w-full text-white ${loading ? "bg-cyan-300" : "bg-cyan-500"}  text-xl `} type="submit">
            Submit
          </button>
        </form>
        {/* <div>{file}</div> */}
      </div>
      {/* {toastPopup} */}
    </div>
  );
};

export default FileUpload;
