

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="flex flex-1 flex-column overflow-auto">
         {children} 
    </div>
        
  );
};

export default Layout;