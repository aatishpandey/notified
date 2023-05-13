import { useContext } from "react";
import userContext from "../utils/userContext";

const ColorPallete = ({ setEditColor }) => {
  // const { note, setNote } = useContext(userContext);

  const handleClick = () => {};

  return (
    <div className="pallete-container w-full flex flex-wrap justify-around">
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-red-300 cursor-pointer"
        onClick={() => {
          setEditColor("red-300");
        }}
      ></div>
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-orange-300"
        onClick={() => {
          setEditColor("orange-300");
        }}
      ></div>
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-amber-300"
        onClick={() => {
          setEditColor("amber-300");
        }}
      ></div>
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-green-300"
        onClick={() => {
          setEditColor("green-300");
        }}
      ></div>
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-teal-300"
        onClick={() => {
          setEditColor("teal-300");
        }}
      ></div>
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-blue-300"
        onClick={() => {
          setEditColor("blue-300");
        }}
      ></div>
      <div
        className="pallete w-[30px] h-[30px] rounded-full border-[1px] border-gray-300 bg-purple-300"
        onClick={() => {
          setEditColor("purple-300");
        }}
      ></div>
    </div>
  );
};

export default ColorPallete;
