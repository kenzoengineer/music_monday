interface PaneProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Pane = ({ title, description, children }: PaneProps) => {
  return (
    <div className="border-zinc-700 border-4 w-max rounded-lg px-8 py-4">
      <h2 className="text-4xl font-bold">{title}</h2>
      <h3 className="text-lg italic mb-4">{description}</h3>
      {children}
    </div>
  );
};

export default Pane;
