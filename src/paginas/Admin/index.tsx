import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  console.log("lol");
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
