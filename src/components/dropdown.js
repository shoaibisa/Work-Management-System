export default function Dropdown() {
  return (
    <div className="my-5">
      <select
        id="LoginAs"
        className="    custom-select rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-s  "
        name="LoginAs"
      >
        <option value="" className=" bg-purple-200 text-gray-900 ">
          Select Role
        </option>
        <option value="admin" className=" bg-purple-200 text-gray-900">
          Admin
        </option>
        <option value="projectmanager" className=" bg-purple-200 text-gray-900">
          Project Manager
        </option>
        <option value="employ" className=" bg-purple-200 text-gray-900">
          Empoly
        </option>
      </select>
    </div>
  );
}
