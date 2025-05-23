import React from 'react';

interface UserDrawerProps {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    // Add any other relevant user details here
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-labelledby="user-drawer-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
              <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      id="user-drawer-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      User Details: {user.username}
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  {/* User Details Section */}
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Details</h3>
                    <dl className="mt-2 divide-y divide-gray-200">
                      <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Username</dt>
                        <dd className="text-gray-900">{user.username}</dd>
                      </div>
                      <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Email</dt>
                        <dd className="text-gray-900">{user.email}</dd>
                      </div>
                      <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Role</dt>
                        <dd className="text-gray-900">{user.role}</dd>
                      </div>
                      <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Status</dt>
                        <dd className="text-gray-900">{user.status}</dd>
                      </div>
                      <div className="py-3 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">Last Login</dt>
                        <dd className="text-gray-900">{user.lastLogin}</dd>
                      </div>
                      {/* Add more details here as needed */}
                    </dl>
                  </div>

                  {/* Terminal Placeholder */}
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-gray-900">Terminal</h3>
                    <div className="mt-2 bg-gray-800 text-white p-4 rounded-md h-48 overflow-auto">
                      {/* Placeholder for terminal component */}
                      <p>Terminal output goes here...</p>
                    </div>
                  </div>

                  {/* Tabbed Interface */}
                  <div className="mt-6">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                        <a
                          href="#"
                          className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          aria-current="page"
                        >
                          Activity Logs
                        </a>
                        {/* Add other tabs here */}
                      </nav>
                    </div>
                    <div className="mt-4">
                      {/* Content for the active tab (Activity Logs) */}
                      <h4 className="text-sm font-medium text-gray-900">Activity Logs</h4>
                      <ul className="mt-2 space-y-2 text-sm text-gray-500">
                        <li>Log entry 1...</li>
                        <li>Log entry 2...</li>
                        {/* Placeholder for activity logs */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDrawer;