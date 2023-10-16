import uploadNotionImagesToCloudinary from "upload-notion-images-to-cloudinary-new-cloudinary-url";

(async () => {
  const databases = {
    roadmap: "664e6b73ea50434cbaad7d120c149446",
    guides: "8c335836b8244d5b8868aa342c49d3c2",
    materials: "ddce45ad40974edfa0746df7f3f6ecd4",
    todos: "b9a43c293aa64860b94c3c3f04d0d5e2",
    sprints: "bc7967210a6142b3b97b841e6a004c96",
    blog: "dda06928f2984f679a888e35278099ee",
    pages: "e6c36c8358ca42a1b4c26310955b9b62",
  };
  await uploadNotionImagesToCloudinary({
    notionToken: process.env.NOTION_API_SECRET as string,
    notionDatabaseId: databases.guides,
    cloudinaryUrl: process.env.CLOUDINARY_URL as string,
    cloudinaryUploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER as string,
    logLevel: "debug",
  });
})();
