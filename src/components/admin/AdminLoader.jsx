export default function AdminLoader({ asTableRow, colSpan = 6 }) {
  const loaderContent = (
    <div className="flex justify-center items-center">
      <svg className="animate-spin w-14 h-14" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" stroke="#4bc9ff" strokeLinecap="round" strokeDasharray="40 250" strokeDashoffset="0" />
        <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" stroke="#4c60df" strokeLinecap="round" strokeDasharray="140 250" strokeDashoffset="-40" />
      </svg>
    </div>
  );

  if (asTableRow) {
    return (
      <tr>
        <td colSpan={colSpan} className="py-12 text-center h-[calc(100vh-250px)]">
          <div className="flex justify-center items-center w-full h-full">
            {loaderContent}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-250px)] w-full">
      {loaderContent}
    </div>
  );
}
