import { useState, useEffect } from "react";
import axios from "axios";
import "./pages.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addActor,
  addMovie,
  addProducer,
  getActors,
  getProducers,
} from "../redux/movies/movies.actions";
import Modal from "../components/modal";

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

export default function AddMovies() {
  const [data, setData] = useState({
    name: "",
    year_of_release: "",
    plot: "",
    poster: "",
    actors: [],
    producer: "",
  });
  const { actors, producers } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const [actorData, setActorData] = useState([]);
  const [producerData, setProducerData] = useState([]);
  const [actorTemp, setActorTemp] = useState("");
  const [modalState, setModalState] = useState(false);
  const [newActor, setNewActor] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getActors());
    dispatch(getProducers());
  }, []);

  const handleChange = async (e) => {
    if (e.target.name == "poster") {
      let x = await handleUpload(e.target.files[0]);
      setData({ ...data, poster: x });
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let temp = data.actors.map((e) => e._id);
    let ptemp = producerData._id;
    let newData = { ...data, actors: temp, producer: ptemp };
    setData({
      name: "",
      year_of_release: "",
      plot: "",
      poster: "",
      actors: [],
      producer: "",
    });
    dispatch(addMovie(newData));
  };

  const handleDebounce = (tar) => {
    if (tar.length <= 2) return;
    let temp = actors.filter(({ name }) => {
      return name.toLowerCase().includes(tar.toLowerCase());
    });
    setActorData([...temp]);
  };

  const handleDebounceP = (tar) => {
    if (tar.length <= 2) return;
    let temp = producers.filter(({ name }) => {
      return name.toLowerCase().includes(tar.toLowerCase());
    });
    setProducerData([...temp]);
  };

  const handleListClick = (item) => {
    for (let i = 0; i < data.actors.length; i++) {
      if (data.actors[i]._id == item._id) {
        alert("Already added");
        setActorTemp("");
        setActorData([]);
        return;
      }
    }
    setData({ ...data, actors: [...data.actors, item] });
    setActorTemp("");
    setActorData([]);
  };

  const handleListClickP = (item) => {
    setData({ ...data, producer: item.name });
    setProducerData(item);
  };

  const handleModalDisplay = () => {
    setNewActor({ ...newActor, type: "actor" });
    setModalState(true);
  };

  const handleModalSubmit = () => {
    setModalState(false);
    let { name, gender, bio, dob } = newActor;
    if (newActor.type == "actor") {
      dispatch(addActor({ name, gender, bio, dob }));
    } else {
      dispatch(addProducer({ name, gender, bio, dob }));
    }
  };

  const handleModalDisplay1 = () => {
    setNewActor({ ...newActor, type: "producer" });
    setModalState(true);
  };

  const handleModalClose = () => {
    setNewActor({
      name: "",
      gender: "",
      dob: "",
      bio: "",
      type: "",
    });
    setModalState(false);
  };

  return (
    <div className="container">
      {modalState && (
        <Modal
          data={newActor}
          setData={setNewActor}
          handleClick={handleModalSubmit}
          handleModalClose={handleModalClose}
        />
      )}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Title</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="enter the movie title"
                  onChange={handleChange}
                  value={data.name}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="year_of_release">Year of release</label>
              </td>
              <td>
                <input
                  type="number"
                  name="year_of_release"
                  placeholder="2012"
                  onChange={handleChange}
                  value={data.year_of_release}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="plot">Plot</label>
              </td>
              <td>
                <textarea
                  name="plot"
                  rows="4"
                  cols="50"
                  onChange={handleChange}
                  value={data.plot}
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="poster">Poster</label>
              </td>
              <td>
                <input
                  type="file"
                  name="poster"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Actors</label>
              </td>
              <td className="customtd">
                <input
                  type="text"
                  name="actors"
                  placeholder="can add multiple actors"
                  onChange={(e) => {
                    handleDebounce(e.target.value);
                    setActorTemp(e.target.value);
                  }}
                  value={actorTemp}
                />
                {actorData.length > 0 && (
                  <ul className="auto">
                    {actorData.map((elem, i) => (
                      <li key={i} onClick={() => handleListClick(elem)}>
                        {elem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              {data.actors.length > 0 && (
                <td>
                  {data.actors.map((e, i) => (
                    <span className="actor_span" key={i}>
                      {e.name}
                    </span>
                  ))}
                </td>
              )}
              <td className="add_char">
                <button onClick={handleModalDisplay}>Add new actor</button>
              </td>
            </tr>
            <tr>
              <td>
                <label>Producer</label>
              </td>
              <td className="customtd">
                <input
                  type="text"
                  name="producer"
                  placeholder="John Rickfield"
                  onChange={(e) => {
                    handleChange(e);
                    handleDebounceP(e.target.value);
                  }}
                  value={data.producer}
                  required
                />
                {producerData.length > 0 && (
                  <ul className="auto">
                    {producerData.map((elem, i) => (
                      <li key={i} onClick={() => handleListClickP(elem)}>
                        {elem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="add_char">
                <button onClick={handleModalDisplay1}>Add new Producer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" />
      </form>
    </div>
  );
}
