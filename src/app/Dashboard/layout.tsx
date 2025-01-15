

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="h-100 flex-1 dashboard-background-color">
         {children} 
    </div>
        
  );
};

export default Layout;