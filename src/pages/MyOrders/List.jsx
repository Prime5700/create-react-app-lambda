export default function List({ children }) {
  return (
    <div className="flex justify-center items-center">
      <ul className="divide-y divide-slate-200 lg:w-2/3 divide-x">
        <h1 className="font-bold  text-4xl py-6 px-4">My Orders</h1>
        {children}
      </ul>
    </div>
  );
}
