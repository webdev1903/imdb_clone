import "./components.css";

export default function Modal({
  data,
  setData,
  handleClick,
  handleModalClose,
}) {
  return (
    <div className="modal">
      <table>
        <tbody>
          <tr>
            <td>Name :</td>
            <td>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Gender :</td>
            <td>
              <select
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              >
                <option value="" disabled selected hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Date of Birth :</td>
            <td>
              <input
                type="date"
                name="dob"
                value={data.dob}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Bio :</td>
            <td>
              <textarea
                name="bio"
                value={data.bio}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleClick}>Submit</button>
      <button onClick={handleModalClose}>Cancel</button>
    </div>
  );
}
