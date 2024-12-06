

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="flex flex-1 flex-column overflow-hidden">
         {children} 
    </div>
        
  );
};

export default Layout;