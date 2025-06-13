import { createClient } from "@supabase/supabase-js";

const url = "https://biopyihfouuryzhiholm.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpb3B5aWhmb3V1cnl6aGlob2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDEzNTUsImV4cCI6MjA2MDk3NzM1NX0.BFqgcLFZRJWj1I2Q945GehI1KLpSLOHMdXwpYD80GS0";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("Not selected file");
      return;
    }
    const timestamp = new Date().getTime();
    const newName = timestamp + "_" + file.name;

    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then((response) => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
          .data.publicUrl;
        // console.log("Image uploaded successfully:", response);
        // console.log("Public URL:", publicUrl);
        resolve(publicUrl);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        reject("error uploading image");
      });
  });
  return mediaUploadPromise;
}
