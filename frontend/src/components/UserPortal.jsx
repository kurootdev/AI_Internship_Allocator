import React from "react";
import users from "../assets/dummyUserData/User";
import UserCard from "./UserCard";

const UserPortal = () => {
  return (
    <div className="flex h-[55vh]">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold ">Candidate Listings</h1>
        <div className="w-full h-[50vh] flex flex-col gap-6 overflow-y-scroll">
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserPortal;
