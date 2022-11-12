import AppSideBar from "./sideMenu/sideMenu";
import Header from "./header/header";
const Layout = (props) => {
  return (
    <div className="layout">
      <AppSideBar />
      <main>
        <Header />
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
