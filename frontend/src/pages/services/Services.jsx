import NavBar from "../../components/navBar/NavBar";
import axios from "axios";
import "./Services.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Services() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const pf = "http://localhost:8000/";

  const { search } = useLocation();

  useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/services" + search
      );
      setData(res.data);
    };
    getPosts();
  }, [search]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategory(res.data);
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const res = await axios.get("http://localhost:8000/api/location");
      setLocation(res.data);
    };
    getLocation();
  }, []);

  const handleClick = (index) => {
    if (show === index) {
      setShow(false);
    } else {
      setShow(index);
    }
  };

  //handle changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Update the URL with the search query parameter
    window.location.search = `?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <>
      {console.log(data)}
      <NavBar />
      <div class="services">
        <div class="servicesContainer">
          <div class="left">
            <h1>Search</h1>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Building, Apartment or Room"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <h2>Filter By Location</h2>
            {location.map((itemLocation, index) => (
              <div class="leftContainer" key={itemLocation._id}>
                <div class="lContainer" onClick={() => handleClick(index)}>
                  <div class="checkedC">
                    <input type="checkbox" />
                    {itemLocation && (
                      <Link
                        to={`/services/?city=${itemLocation.cityName}`}
                        class="link"
                      >
                        <span>{itemLocation.cityName}</span>
                      </Link>
                    )}
                  </div>
                </div>
                {show === index && (
                  <div class="lContainerItem">
                    {itemLocation.districtName.map((i) => (
                      <Link
                        to={`/services/?district=${i}`}
                        class="link"
                        key={i}
                      >
                        <span>{i}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div class="mid">
            {data.map((item) => (
              <div class="middle">
                <div class="middleContainer" key={item._id}>
                  {item.photo && (
                    <div class="imageContainer">
                      {<img src={pf + item.photo} alt="" />}
                    </div>
                  )}

                  <p>
                    Category:{" "}
                    <strong style={{ color: "darkBlue" }}>
                      {item.category}
                    </strong>
                  </p>
                  <span>
                    Number of Rooms:{" "}
                    <strong style={{ color: "purple" }}>
                      {item.roomNumber}
                    </strong>
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
                      <strong style={{ color: "brown" }}>
                        {item.district}
                      </strong>
                    </span>
                    <span>
                      Street:{" "}
                      <strong style={{ color: "brown" }}>{item.street}</strong>
                    </span>
                  </div>
                  <span>
                    Uploaded By:{" "}
                    <strong style={{ color: "Teal" }}>james</strong>
                  </span>
                  <span>
                    Time uploaded:{" "}
                    <strong style={{ color: "gray" }}>{item.timestamp}</strong>
                  </span>
                  <Link
                    to={`/services/${item._id}`}
                    key={item._id}
                    class="link"
                  >
                    <button>View Description</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div class="right">
            <h1>Categories</h1>
            <h2>Filter By Category</h2>
            {category.map((itemCategory) => (
              <div class="rightContainer" key={itemCategory._id}>
                {itemCategory.name.map((i) => (
                  <Link to={`/services/?cat=${i}`} class="link" key={i}>
                    <span key={i}>{i}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
