import { Link } from "react-router-dom";
import thumbnail2 from "../../../assets/images/project-thumbnail-alt.jpg";
import thumbnail1 from "../../../assets/images/project-thumbnail.jpg";

const CommentsPreview = () => {
  const commentedImages = [
    {
      id: 1,
      url: thumbnail1,
      name: "Image 1.jpg",
    },
    {
      id: 2,
      url: thumbnail2,
      name: "Image 2.jpg",
    },
  ];

  return (
    <div className="mt-3">
      <h1 className="font-medium">{commentedImages.length} Comments added.</h1>
      {commentedImages.map((img, index) => (
        <div key={index} className="mt-3 flex items-start gap-3">
          <img
            src={img.url}
            alt={img.name}
            className="w-[60px] object-contain"
          />
          <div>
            <Link className="text-sm font-semibold text-primary">
              View 1 Comment
            </Link>
            <p className="text-sm">{img.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsPreview;
