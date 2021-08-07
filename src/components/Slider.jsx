import "./Slider.scss";
import { useEffect } from "react";

export const Slider = ({ id, name, min, max, value, onChange }) => {
  // Function that changes the background color of the range input track (before and after the slider thumb)
  const setValue = () => {
    const range = document.getElementById(id);
    const value = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #eeddf1 0%,  #eeddf1 ${
      value / 2
    }%, #eeddf1 ${value}%,  #35023b ${value}%,  #35023b 100%)`;
  };

  useEffect(() => {
    if (value) {
      setValue();
    }
  }, [value]);

  return (
    <div className="slider">
      <label htmlFor={id}>{name}</label>
      <input
        type="range"
        className="slider__input"
        id={id}
        name={name}
        min={min}
        max={max}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label>{value}</label>
    </div>
  );
};
