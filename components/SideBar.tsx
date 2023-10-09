import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { CreateChartModal } from './CreateChartModal';

export const SideBar = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-full lg:w-[300px] py-4 bg-white fixed left-0 top-0 flex flex-col px-4">
      <CreateChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></CreateChartModal>
      <div className="w-full flex justify-center pb-4">
        <img className="h-11" src="logo.svg" alt="" />
      </div>
      <nav className="pt-6">
        <label className="label">General</label>
        <ul className="mt-2">
          <li>
            <Link
              className="flex flex-row space-x-2 bg-background px-4 py-3 rounded"
              href=""
            >
              <img className="w-5" src="icons/dashboards.svg" alt="" />
              <p>Charts</p>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          className="btn-primary w-full mt-auto"
          onClick={() => setIsModalOpen(true)}
        >
          + Add New Chart
        </button>
        <div>
          <hr className="border-t-1 border-solid border-slate-300 my-4" />
          <label className="label">Profile</label>
          {!session ? (
            <button
              className="btn-secondary w-full mt-2"
              onClick={() => signIn()}
            >
              Login
            </button>
          ) : (
            <div
              onClick={() => signOut()}
              className="bg-background flex items-center py-4 px-2 space-x-2 mt-2 cursor-pointer rounded"
            >
              <img
                className="w-12 h-12 rounded-full"
                src={session.user?.image ? session.user.image : ''}
                alt=""
              />
              <div>
                <p className="font-medium text-lg">{session.user?.name}</p>
                <p className="text-sm font-light">{session.user?.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
