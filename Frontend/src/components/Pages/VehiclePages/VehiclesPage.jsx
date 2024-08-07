import React, { useContext, useEffect, useState } from "react";
import CarCard from "../../Cards/CarCard";
import LocationFinder from "../../LocationFinder";
import { UserContext } from "../../../context/context";
import Paginate from "./Pagination code/Pagination";
import { useParams } from "react-router-dom";

const VehiclesPage = () => {
  const { url } = useContext(UserContext);

  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { vtype } = useParams();

  const [filters, setFilters] = useState({
    type: vtype || "all",
    price: "",
    limit: "10",
  });

  useEffect(() => {
    fetchVehicles(currentPage, filters);
  }, [currentPage, filters]);

  const fetchVehicles = async (page, filters) => {
    try {
      const query = new URLSearchParams({
        page,
        ...filters,
      }).toString();

      const response = await fetch(`${url}/vehicles?${query}`);
      const data = await response.json();
      setVehicles(data.results);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const selectCLS =
    "dark:bg-slate-800/80 bg-slate-200 shadow hover:shadow-md dark:ring-white hover:ring-1 rounded outline-none";

  return (
    <>
      {/* filters */}
      <div className="flex mt-3">
        <label className=" m-3 text-lg flex gap-3 ">
          Type:
          <select
            className={selectCLS}
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </label>
        <label className=" m-3 text-lg flex gap-3">
          Price:
          <select
            className={selectCLS}
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </label>
        <span className=" m-3 text-lg flex gap-3">
          <span className="">limit :</span>
          <select
            name="limit"
            onChange={handleFilterChange}
            className={selectCLS}
          >
            <option>{filters?.limit}</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>50</option>
            <option value={20}>100</option>
          </select>
        </span>
      </div>
      {vehicles?.length > 0 ? (
        <div className="mt-15 grid grid-cols-1 mb-5 md:grid-cols-4 p-5 ">
          {vehicles?.map((item) => {
            return (
              <div className="my-4">
                <a
                  href={`/vehicledetails/${item?._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CarCard key={item._id} data={item} />
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-[50vh] font-semibold text-xl items-center justify-center">
          No vehicle Found !
        </div>
      )}

      {/* pagination  */}
      <Paginate
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};

export default VehiclesPage;
