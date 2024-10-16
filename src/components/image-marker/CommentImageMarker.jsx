import { useRef, useState } from "react";
import ImageMarker from "react-image-marker";
import thumbnail from "../../assets/images/Website Image Size 2700x2000.jpg";

const CommentImageMarker = () => {
  const [markers, setMarkers] = useState([]);
  const [comments, setComments] = useState([]);
  const commentBox = useRef(null);
  const [comment, setComment] = useState({
    comment: "",
  });

  const CustomMarker = ({ id }) => {
    return (
      <p
        id={id}
        className="size-5 rounded-full bg-primary"
        onClick={() => console.log("clicked")}
      ></p>
    );
  };

  const handleMarkerAdd = (marker) => {
    const id = markers.length + 1;
    const newMarker = { id, ...marker };
    setComment({ ...comment, id });
    setMarkers([...markers, newMarker]);
    commentBox.current?.focus();
  };

  const handleMarkerDelete = (id) => {
    const newMarkers = markers.filter((m) => m.id !== id);
    const newComments = comments.filter((c) => c.id !== id);
    setMarkers(newMarkers);
    setComments(newComments);
  };

  const handleChangeComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setComments([...comments, comment]);
    setComment({
      comment: "",
    });
  };

  console.log("marker", markers);

  return (
    <div className="max-width my-10">
      <h1>Image Marker Example</h1>
      <ImageMarker
        src={thumbnail} // Replace with your image URL
        markers={markers}
        onAddMarker={handleMarkerAdd}
        markerComponent={CustomMarker}
      />
      <div>
        <h2>Markers:</h2>
        <ul>
          {markers.map((marker, index) => (
            <li key={index}>
              {`Marker at x: ${marker.top}, y: ${marker.top}`}
              <button onClick={() => handleMarkerDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <textarea
            name="comment"
            ref={commentBox}
            value={comment.comment}
            className="border"
            onChange={handleChangeComment}
          ></textarea>
          <button onClick={handleAddComment}>Submit</button>
        </div>
        <ul>
          {comments.map((com, index) => (
            <li key={index}>
              Comment ID: {com.id} and comment is: {com.comment}
              <button onClick={() => handleMarkerDelete(com.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentImageMarker;
