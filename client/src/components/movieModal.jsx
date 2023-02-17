import "./components.css";

export default function MovieModal({
  data,
  handleChange,
  handleClick,
  handleClose,
}) {
  return (
    <div className="movieModal">
      <table>
        <tbody>
          <tr>
            <td>Name :</td>
            <td>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Poster :</td>
            <td>
              <input
                type="file"
                name="poster"
                accept="image/*"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Year Of release :</td>
            <td>
              <input
                type="date"
                name="year_of_release"
                value={data.year_of_release}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Plot :</td>
            <td>
              <textarea
                name="plot"
                value={data.plot}
                onChange={handleChange}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleClick}>Submit</button>
      <button onClick={handleClose}>Cancel</button>
    </div>
  );
}
