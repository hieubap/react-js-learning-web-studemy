import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

function InputSearch({ onChange, style } = {}) {
  const [value, setValue] = useState("");
  const refTimeout = useRef();

  const handleChange = (e) => {
    setValue(e.target?.value);
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      onChange && onChange(e.target?.value);
    }, 700);
  };
  return (
    <Input
      placeholder="search something"
      value={value}
      onChange={handleChange}
      style={style}
    ></Input>
  );
}

InputSearch.propTypes = {};

export default InputSearch;
