const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-900 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="lg:hidden mr-4">
          {/* Hamburger icon */}
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </header>
  );
};
export default Navbar;