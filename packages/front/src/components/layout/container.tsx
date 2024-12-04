
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex overflow-hidden">
      {children}
    </div>
  );
}

export default Container;