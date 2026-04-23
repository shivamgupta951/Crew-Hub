import React from "react";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">
        Crew Hub Controls
      </h1>
      <p className="text-2xl tracking-tight">
        This demo showcases Next.js access control features with role-based
        permissions!
      </p>
      <div className="grid grid-cols-2 my-10 space-x-4">
        <div className="border p-4 rounded-2xl bg-gray-900">
          <h3 className="text-2xl font-bold mb-2">Features Demonstrated</h3>
          <ul className="list-disc mx-4">
            <li>Role-based access control.</li>
            <li>Route Protection via middleware.</li>
            <li>Server-side permission checks</li>
            <li>Client-side permission hooks.</li>
            <li>Dynamic Route access</li>
          </ul>
        </div>
        <div className="border p-4 rounded-2xl bg-gray-900">
          <h3 className="text-2xl font-bold mb-2">User Roles</h3>
          <div>
            <span className="text-purple-300">Super_Admin: </span>Full System
            Access.
          </div>
          <div>
            <span className="text-green-300">Admin: </span>User & Team
            Management.
          </div>
          <div>
            <span className="text-yellow-300">Manager: </span>Team-Specific
            Management.
          </div>
          <div>
            <span className="text-blue-300">User: </span>Basic Dashboard Access.
          </div>
        </div>
      </div>
      <div className="p-3 rounded-md space-y-3 bg-[#00091a] border">
        <div className="text-xl tracking-wider">You are not logged in.</div>
        <div className="flex space-x-3">
          <div className="bg-blue-900 cursor-pointer p-2 border px-4 rounded-md">Login</div>
          <div className="bg-blue-900 cursor-pointer p-2 border rounded-md">Register</div>
        </div>
      </div>
    </div>
  );
};

export default page;
