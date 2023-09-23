import NavBar from "../../components/navBar/NavBar";
import "./Single.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RelatedPost from "../../components/relatedPost/RelatedPost";

function Single() {
  const [post, setPost] = useState({});

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:8000/api/services/${id}`);
      setPost(res.data);
    };
    getData();
  }, [id]);

  return (
    <>
      <NavBar />
      <div class="single">
        <div class="singleContainer" key={post._id}>
          <div class="imageContainer">
            {post.photo &&
              post.photo.map((i) => <img src={i} alt="" key={i} />)}
          </div>
          <p>
            Category:{" "}
            <strong style={{ color: "darkBlue" }}>{post.category}</strong>
          </p>
          <span>
            Number of Rooms:{" "}
            <strong style={{ color: "purple" }}>{post.roomNumber}</strong>
          </span>
          <span>
            Price:{" "}
            <strong style={{ color: "darkGreen" }}>
              {post.price} TZS per month
            </strong>
          </span>
          <span>
            Reach me here: <strong>{post.phoneNumber}</strong>
          </span>
          <span>
            Status: <strong style={{ color: "green" }}>{post.status}</strong>
          </span>
          <div class="location">
            <span>
              City: <strong style={{ color: "brown" }}>{post.city}</strong>
            </span>
            <span>
              District:{" "}
              <strong style={{ color: "brown" }}>{post.district}</strong>
            </span>
            <span>
              Street: <strong style={{ color: "brown" }}>{post.street}</strong>
            </span>
          </div>
          <span>
            Uploaded By: <strong style={{ color: "Teal" }}>James</strong>
          </span>
          <span>
            Time uploaded:{" "}
            <strong style={{ color: "gray" }}>
              {new Date(post.createdAt).toDateString()}
            </strong>
          </span>
          <button>Book Now</button>
        </div>
      </div>
      <RelatedPost />
    </>
  );
}

export default Single;
