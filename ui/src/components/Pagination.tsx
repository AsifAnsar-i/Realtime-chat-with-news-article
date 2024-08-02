export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
  };
  
  const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center">
        <ul className="flex border border-slate-300 rounded-md">
          {page > 1 && (
            <li className="px-2 py-1">
              <button
                onClick={() => onPageChange(page - 1)}
                className="text-blue-500"
              >
                Previous
              </button>
            </li>
          )}
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`px-2 py-1 cursor-pointer ${page === number ? "bg-gray-200" : ""}`}
            >
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          ))}
          {page < pages && (
            <li className="px-2 py-1">
              <button
                onClick={() => onPageChange(page + 1)}
                className="text-blue-500"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  };
  
  export default Pagination;
  