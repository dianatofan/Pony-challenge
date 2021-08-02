import './Slider.scss';

export const Slider = ({ id, name, min, max, value, onChange }) => {
  const setValue = () => {
    const range = document.getElementById(id);
    const value = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #eeddf1 0%,  #eeddf1 ${
      value / 2
    }%, #eeddf1 ${value}%,  #35023b ${value}%,  #35023b 100%)`;
  };

  return (
    <div className="slider">
      <label htmlFor={id}>{name}</label>
      <input type="range" id={id} name={name} min={min} max={max} defaultValue={value}
             onChange={e => {
               setValue();
               return onChange(e.target.value);
             }} />
      <label>{value}</label>
    </div>
  )
}
