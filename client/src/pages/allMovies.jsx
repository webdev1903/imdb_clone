import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieModal from "../components/movieModal";
import { getMovies, editMovie } from "../redux/movies/movies.actions";
import axios from "axios";

const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imdb_images");
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/decwfktrk/image/upload`,
    formData
  );
  const { data } = response;
  const imageUrl = data.secure_url;
  return imageUrl;
};

export default function AllMovies() {
  const [data, setData] = useState({
    name: "",
    year_of_release: "",
    poster: "",
    plot: "",
  });
  const { movies } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [editMovieData, setEditMovieData] = useState({});
  console.log(movies);

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const handleChange = async (e) => {
    if (e.target.name == "poster") {
      let x = await handleUpload(e.target.files[0]);
      console.log(x);
      setData({ ...data, poster: x });
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleModalDisplay = (elem) => {
    setEditMovieData(elem);
    setData({
      ...data,
      name: elem.name,
      plot: elem.plot,
    });
    setModalState(true);
  };

  const handleEdit = () => {
    console.log(data);
    dispatch(editMovie(data, editMovieData._id));
    setModalState(false);
    dispatch(getMovies());
    // window.location.reload(false);
  };

  const handleModalClose = () => {
    setData({
      name: "",
      year_of_release: "",
      poster: "",
      plot: "",
    });
    setModalState(false);
  };

  return (
    <div className="movieContainer">
      {modalState && (
        <MovieModal
          data={data}
          handleChange={handleChange}
          handleClick={handleEdit}
          handleClose={handleModalClose}
        />
      )}
      {movies.length > 0 &&
        movies.map((e, index) => (
          <div key={index}>
            <img src={e.poster} />
            <h4>Title : {e.name}</h4>
            <p>Year of release : {e.year_of_release}</p>
            <p>Plot : {e.plot}</p>
            <p>
              Actors :{" "}
              {e.actors.map((el, i) => (
                <span key={i}>
                  {el.name}
                  {i < e.actors.length - 1 ? ", " : " "}
                </span>
              ))}
            </p>
            <p>Producer : {e.producer.name}</p>
            <button onClick={handleModalDisplay.bind(null, e)}>Edit</button>
          </div>
        ))}
    </div>
  );
}
