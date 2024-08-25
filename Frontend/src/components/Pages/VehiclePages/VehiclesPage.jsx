import React, { useContext, useEffect, useState } from "react";
import CarCard from "../../Cards/CarCard";
import { UserContext } from "../../../context/context";
import Paginate from "./Pagination code/Pagination";
import { Link, useParams } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";

const VehiclesPage = () => {
  const { url } = useContext(UserContext);

  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { vtype } = useParams();

  const [filters, setFilters] = useState({
    type: vtype || "all",
    price: "",
    limit: "10",
    availability: "all",
  });

  useEffect(() => {
    fetchVehicles(currentPage, filters);
  }, [currentPage]);

  const fetchVehicles = async (page, filters) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to the first page when filters change
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

  const handleRefresh = () => {
    fetchVehicles(currentPage, filters);
  };

  const selectCLS =
    "dark:bg-slate-800/80 bg-slate-200 shadow hover:shadow-md dark:ring-white hover:ring-1 rounded outline-none";

  return (
    <>
      {/* filters */}
      <div className="flex md:ml-4 ml-2 mt-3 flex-wrap md:gap-2 gap-1 items-center">
        <label className="text-lg flex gap-3 ">
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
        <label className="text-lg flex gap-3 ">
          Availability:
          <select
            className={selectCLS}
            name="availability"
            value={filters.availability}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label className="m-3 text-lg flex gap-3">
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
          Limit:
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

        <span
          onClick={() => handleRefresh()}
          className="group cursor-pointer bg-slate-700 flex items-center justify-between rounded-md p-1 px-2 gap-2 dark:bg-sky-500 hover:ring-2 ring-white text-white"
        >
          Apply
          <IoMdRefresh className="text-xl group-hover:rotate-[360deg] duration-500" />
        </span>
      </div>

      {loading ? (
        <div className="grid place-items-center h-[50vh] w-screen">
          <ImSpinner9 className="text-5xl animate-spin" />
        </div>
      ) : vehicles?.length > 0 ? (
        <div className="mt-15 grid grid-cols-1 place-items-center mb-5 gap-3 md:grid-cols-4 p-5 ">
          {vehicles.map((item) => (
            <Link to={`/vehicledetails/${item?._id}`} key={item._id}>
              <CarCard data={item} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-[50vh] font-semibold text-xl items-center justify-center">
          No vehicle found!
        </div>
      )}

      {/* pagination */}
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
