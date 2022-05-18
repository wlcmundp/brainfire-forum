import React, { useEffect, useState } from "react";
import icons from "./../assets/images/icons.json";

function IconsPicker({ onSelect }) {
  const [iconslist, setIconslist] = useState([]);
  const [mainIconList, setMainIconList] = useState([]);
  useEffect(() => {
    console.log(icons);
    let k = [];
    icons.categories.map((ele, index) => {
      ele.icons.map((m) => {
        k.push(m);
      });
    });
    setIconslist(k);
    setMainIconList(k);
    return () => {};
  }, []);

  const searchIcon = (text) => {
    var condition = new RegExp(text);

    var result = mainIconList.filter(function (el) {
      return (
        condition.test(el.name) ||
        condition.test(el.keywords) ||
        condition.test(el.codepoint) ||
        condition.test(el.group_id)
      );
    });
    setIconslist(result);
  };
  return (
    <div
      style={{
        height: "30vh",

        border: "2px solid #e7e7e7",
        padding: 10,
      }}
      id="iconpicker"
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search icon"
        // value={icons}
        onChange={(e) => {
          searchIcon(e.target.value);
        }}
        style={{ marginBottom: 10 }}
      />
      <ul class="row row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8 list-unstyled list">
        {iconslist.map((icon, iconIndex) => {
          return (
            <li
              class="col mb-4"
              data-tags="pulse heartbeat rhythm"
              data-categories="data"
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                onSelect(icon);
              }}
            >
              <div
                className="cb-icon-avatar  me-2 me-md-3"
                style={{
                  backgroundColor: "#cecece",
                }}
              >
                <span className="material-icons">{icon.ligature}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IconsPicker;
