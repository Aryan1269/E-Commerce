import { imageFileResizer } from "@peacechen/react-image-file-resizer";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FileUpload({ values, setValues }) {
  const [loading, setloading] = useState();

  const fileuploadandresize = async (e) => {
    let fileInput = e.target.files;
    let allUploadedFiles = values.images;
    if (fileInput) {
      try {
        for (let i = 0; i < fileInput.length; i++) {
          const uri = await imageFileResizer({
            compressFormat: "jpeg",
            file: fileInput[i],
            maxHeight: 720,
            maxWidth: 720,
            minHeight: 720,
            minWidth: 720,
            outputType: "base64",
            quality: 100,
            rotation: 0,
          });

          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/save/images`,
            {
              image: uri,
            }
          );

          allUploadedFiles.push(res.data);

          setValues({ ...values, images: allUploadedFiles });

          toast.success("all files uploaded");
        }
      } catch (error) {
        console.log(error);
        toast.error("failed to upload files");
      }
    }
  };

  return (
    <label
      className="block text-gray-700 p-2 bg-blue-200 w-fit rounded text-sm font-bold mb-2"
      htmlFor="file"
    >
      choose file
      <input
        type="file"
        name=""
        id="file"
        hidden
        multiple
        onChange={fileuploadandresize}
      />
    </label>
  );
}
