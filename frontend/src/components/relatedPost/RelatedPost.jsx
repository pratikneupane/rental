import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RelatedPost.scss";

function RelatedPost({ category, city, district, street }) {
  const [relatedPost, setRelatedPost] = useState([]);

  useEffect(() => {
    const fetchRelatedPost = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/services", {
          params: {
            cat: category,
            city: city,
            district: district,
            street: street,
          },
        });
        setRelatedPost(res.data);
      } catch (error) {
        console.error("error in fetching related posts", error);
      }
    };
    fetchRelatedPost();
  }, [category, city, district, street]);

  return (
    <div class="related">
      <h1>Related Post..</h1>
      <div class="relatedContainer">
        {relatedPost.map((item) => (
          <div class="middle">
            <Link to={`/services/${item._id}`} key={item._id} class="link">
              <div class="middleContainer" key={item._id}>
                {item.photo && (
                  <div class="imageContainer">
                    {item.photo.map((i) => (
                      <img src={i} alt="" key={i} />
                    ))}
                  </div>
                )}

                <p>
                  Category:{" "}
                  <strong style={{ color: "darkBlue" }}>{item.category}</strong>
                </p>
                <span>
                  Number of Rooms:{" "}
                  <strong style={{ color: "purple" }}>{item.roomNumber}</strong>
                </span>
                <span>
                  Price:{" "}
                  <strong style={{ color: "darkGreen" }}>
                    {item.price} TZS per month
                  </strong>
                </span>
                <span>
                  Reach me here: <strong>{item.phoneNumber}</strong>
                </span>
                <span>
                  Status:{" "}
                  <strong style={{ color: "green" }}>{item.status}</strong>
                </span>
                <div class="location">
                  <span>
                    City:{" "}
                    <strong style={{ color: "brown" }}>{item.city}</strong>
                  </span>
                  <span>
                    District:{" "}
                    <strong style={{ color: "brown" }}>{item.district}</strong>
                  </span>
                  <span>
                    Street:{" "}
                    <strong style={{ color: "brown" }}>{item.street}</strong>
                  </span>
                </div>
                <span>
                  Uploaded By: <strong style={{ color: "Teal" }}>James</strong>
                </span>
                <span>
                  Time uploaded:{" "}
                  <strong style={{ color: "gray" }}>
                    {new Date(item.createdAt).toDateString()}
                  </strong>
                </span>
                <button>View Description</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedPost;
