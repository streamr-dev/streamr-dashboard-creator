import Link from 'next/link';

export const SideBar = () => {
  return (
    <div className="h-full lg:w-[300px] py-4 bg-white absolute left-0 top-0 flex flex-col container">
      <div className="w-full flex justify-center pb-4">
        <img className="h-11" src="logo.svg" alt="" />
      </div>
      <nav className="pt-4">
        <label className="label">General</label>
        <ul className="mt-2">
          <li>
            <Link
              className="flex flex-row space-x-2 bg-background px-4 py-3 rounded"
              href=""
            >
              <img className="w-5" src="icons/dashboards.svg" alt="" />
              <p>Dashboards</p>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <button className="btn-primary w-full mt-auto">
          + Add New Dashboard
        </button>
        <div>
          <hr className="border-t-1 border-solid border-slate-300 my-4" />
          <label className="label">Profile</label>
          <button className="btn-primary w-full mt-2">Login</button>
        </div>
      </div>
    </div>
  );
};
