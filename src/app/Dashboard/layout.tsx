

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="max-width justify-center items-center flex">
         {children} 
    </div>
        
  );
};

export default Layout;