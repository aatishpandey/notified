import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" header w-[100%] shadow-lg py-4 px-4 flex justify-between items-center">
      <Link to="/">
        <div className="text-3xl font-sans hover:text-teal-600 ">📔Notify</div>
      </Link>
      <div className="flex list-none text-lg font-medium">
        <li className="p-2 hover:text-teal-600">
          <Link to="/notes">Notes</Link>
        </li>
        <li className="p-2 hover:text-teal-600">Trash</li>
        <li className="p-2 hover:text-teal-600">Archive</li>
      </div>
      <div className="text-lg font-medium">🟢</div>
    </div>
  );
};

export default Header;
