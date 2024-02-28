import React, { useState } from "react";
import axiosConfig from "src/config/axios.config";
const ProductCategoriesTable = () => {
  const [data, setData] = useState([
    // { id: 1, name: "John Doe" },
    // { id: 2, name: "Jane Smith" },
    // { id: 3, name: "Bob Johnson" },
    // Add more data as needed
  ]);
  React.useEffect(() => {
    const { data: productCategoriesData } = axiosConfig.get(
      "/admin/product-categories",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(productCategoriesData);
    setData(productCategoriesData?.data ?? []);
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Calculate indexes for pagination
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentData = data.slice(firstIndex, lastIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={lastIndex >= data.length}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default ProductCategoriesTable;