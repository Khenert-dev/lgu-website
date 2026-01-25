type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
