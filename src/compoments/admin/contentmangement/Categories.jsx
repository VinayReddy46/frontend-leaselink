import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import {
  MdLaptopChromebook,
  MdTv,
  MdPhoneIphone,
  MdWatch,
  MdHeadset,
  MdCameraAlt,
} from "react-icons/md";
import {
  FaRegSnowflake,
  FaTablet,
  FaGamepad,
  FaBlender,
  FaFan,
  FaLightbulb,
} from "react-icons/fa";
import { ImVideoCamera } from "react-icons/im";
import { FiPrinter } from "react-icons/fi";
import { MdAudiotrack } from "react-icons/md";
import {
  GiRiceCooker,
  GiVacuumCleaner,
  GiWashingMachine,
} from "react-icons/gi";
import { BiSolidCctv, BiSolidJoystick, BiFridge } from "react-icons/bi";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/services/categoriesSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const iconMapping = {
  LaptopChromebook: <MdLaptopChromebook />,
  Tv: <MdTv />,
  Snowflake: <FaRegSnowflake />,
  Tablet: <FaTablet />,
  VideoCamera: <ImVideoCamera />,
  Printer: <FiPrinter />,
  Audiotrack: <MdAudiotrack />,
  RiceCooker: <GiRiceCooker />,
  Cctv: <BiSolidCctv />,
  Joystick: <BiSolidJoystick />,
  Phone: <MdPhoneIphone />,
  Watch: <MdWatch />,
  Headset: <MdHeadset />,
  Camera: <MdCameraAlt />,
  Gamepad: <FaGamepad />,
  Blender: <FaBlender />,
  Fan: <FaFan />,
  Lightbulb: <FaLightbulb />,
  VacuumCleaner: <GiVacuumCleaner />,
  WashingMachine: <GiWashingMachine />,
  Fridge: <BiFridge />,
};

const iconOptions = Object.keys(iconMapping).map((key) => ({
  label: key,
  value: key,
  icon: iconMapping[key],
}));

const CategoryList = () => {
  const { data, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreateLoading }] =
    useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = (category) => {
    setCurrentCategory({ ...category });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (currentCategory) {
        console.log(currentCategory);
        if (currentCategory._id) {
          const res = await updateCategory({
            id: currentCategory._id,
            updatedCategory:currentCategory,
          });

          console.log(res);
          toast.success(res?.data?.message || "Category updated successfully");
        } else {
          const res = await createCategory(currentCategory);
          console.log(res);
          toast.success(res?.data?.message || "Category added successfully");
        }
        setShowModal(false);
        setCurrentCategory(null);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCategory(id);
          refetch();
          toast.success("Category deleted successfully");
        }
      });
    } catch (error) {
      console.log(error)
      toast.error(error?.response.data?.message || "Something went wrong");
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-center md:justify-start">
        <button
          onClick={() => handleEdit(rowData)}
          className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <i className="pi pi-pencil mr-1"></i> Edit
        </button>
        <button
          onClick={() => handleDelete(rowData._id)}
          className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <i className="pi pi-trash mr-1"></i> Delete
        </button>
      </div>
    );
  };

  const iconBodyTemplate = (rowData) => {
    return <div className="text-2xl">{iconMapping[rowData.icon]}</div>;
  };

  const iconOptionTemplate = (option) => {
    return (
      <div className="flex flex-row items-center">
        <div className="text-2xl mr-2">{option.icon} </div>
        <div className="text-2xl mr-2">{option.value}</div>
      </div>
    );
  };

  const filteredCategories = data?.categories?.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          <i className="pi pi-th-large mr-2 text-xl"></i>
          Product Categories
        </h1>

        <div className="mb-6 flex gap-4">
          <span className="p-input-icon-left w-full">
            <InputText
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product Name"
              className="w-full px-3 py-2 rounded-lg bg-white border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
            />
          </span>
          <button
            onClick={() => {
              setCurrentCategory({ name: "", description: "", icon: "" });
              setShowModal(true);
            }}
            className="min-w-52 md:w-auto px-4 bg-blue-500 text-white rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <i className="pi pi-plus mr-2"></i> Add Category
          </button>
        </div>

        <div className="card rounded-lg bg-white border-2 border-gray-200 overflow-hidden">
          <DataTable
            value={filteredCategories}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 15, 20]}
            tableStyle={{ minWidth: "100%" }}
            responsiveLayout="stack"
            breakpoint="960px"
            rowHover
            className="custom-datatable"
          >
            <Column
              body={iconBodyTemplate}
              header="Icon"
              style={{ width: "10%" }}
            ></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column
              body={actionBodyTemplate}
              header="Actions"
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* Modal */}
      {showModal && currentCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 border border-white/50 backdrop-blur-md p-6 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
              <i className="pi pi-pencil mr-2"></i>{" "}
              {currentCategory.id ? "Edit Category" : "Add Category"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Category Name
                </label>
                <InputText
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={currentCategory.description}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Icon
                </label>
                <Dropdown
                  value={currentCategory.icon}
                  options={iconOptions}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, icon: e.value })
                  }
                  placeholder="Select an Icon"
                  className="w-full px-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  itemTemplate={iconOptionTemplate}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-times mr-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {isCreateLoading ? (
                    <i className="pi pi-spin pi-spinner mr-2"></i>
                  ) : (
                    <>
                      <i className="pi pi-check mr-2"></i> <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add custom styles for glass effect and animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .custom-datatable .p-datatable-header,
        .custom-datatable .p-datatable-thead > tr > th {
          background: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(8px) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .custom-datatable .p-datatable-tbody > tr {
          background: rgba(255, 255, 255, 0.4) !important;
          transition: all 0.2s ease-in-out !important;
        }
        .custom-datatable .p-datatable-tbody > tr:hover {
          background: rgba(245, 245, 255, 0.7) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
        }
        .custom-datatable .p-paginator {
          background: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(8px) !important;
        }
      `}</style>
    </div>
  );
};

export default CategoryList;