interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function Card({ title, icon, children }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 px-7 py-9 rounded-xl border border-gray-200 dark:border-gray-700 transition">
      
      <div className="flex items-center gap-3 mb-7">
        {icon}
        <h2 className="text-base font-semibold dark:text-white">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}