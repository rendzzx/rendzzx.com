interface PageHeaderProps {
  title: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({title, className}) => {
  return (
    <div className={`text-center ${className ?? "mt-10 mb-12"}`}>
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500/80" />
        <span className="w-2 h-2 rounded-full bg-orange-500" />
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500/80" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
        {title}
      </h1>
    </div>
  );
};
