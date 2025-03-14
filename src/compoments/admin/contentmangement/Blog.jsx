import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../../../redux/services/blogSlice";

const BlogPage = () => {
  const { data: posts = [], refetch } = useGetBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete post
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("Blog deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete blog");
      }
    }
  };

  // Open modal for editing a post
  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (currentPost) {
        setCurrentPost({ ...currentPost, image: file });
      } else {
        setNewPost({ ...newPost, image: file });
      }
    }
  };

  // Convert data to FormData and send request
  const prepareFormData = (post) => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    if (post.image instanceof File) {
      formData.append("image", post.image);
    }
    return formData;
  };

  // Save changes after editing
  const handleSave = async () => {
    try {
      console.log(currentPost)
      const formData = prepareFormData(currentPost);

      console.log("Updating blog with ID:", currentPost?._id);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await updateBlog({ id: currentPost._id, updatedBlog:formData }).unwrap();
      toast.success("Blog updated successfully");
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update blog");
    }
  };

  // Add a new post
  const handleAddPost = async () => {
    try {
      const formData = prepareFormData(newPost);
      await createBlog(formData).unwrap();
      toast.success("Blog added successfully");
      setNewPost({ title: "", description: "", image: null });
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add blog");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl text-indigo-800 font-bold tracking-wider mb-2 flex items-center">
          <MdOutlineDashboardCustomize className="mr-2 text-2xl text-center"/>
          Our Blogs
        </h1>
      </div>

      {/* Search Bar and Add New Post Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-3/4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={() => {
            setCurrentPost(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-green-600 transition-colors"
          disabled={isCreating}
        >
          <FaPlus className="h-4 w-4 mr-2" />
          {isCreating ? "Adding..." : "Add New Post"}
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div key={post._id} className="border p-3 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="">
            <img
              src={post.image.url}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md"
            />
            
            
            <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            </div>
            <div className="flex justify-between gap-3 mt-4">
              <button
                className="w-full bg-green-500  p-2 rounded-lg text-white"
                onClick={() => handleEdit(post)}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : <div className="flex items-center justify-center gap-1"><i className="pi pi-pencil mr-1"></i> Update</div>}
              </button>
              <button
                className="w-full bg-red-500  p-2 rounded-lg text-white"
                onClick={() => handleDelete(post._id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : <div className="flex items-center justify-center gap-1"><i className="pi pi-trash mr-1"></i> Delete</div>}
              </button>
            </div>
            </div>
        ))}
      </div>

      {/* Modal for Editing & Adding */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {currentPost ? "Edit Post" : "Add New Post"}
            </h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={currentPost ? currentPost.title : newPost.title}
              onChange={currentPost ? handleInputChange : (e) =>
                setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={currentPost ? currentPost.description : newPost.description}
              onChange={currentPost ? handleInputChange : (e) =>
                setNewPost({ ...newPost, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
            />
            <div className="flex justify-center items-center gap-3">

           
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full"
              onClick={currentPost ? handleSave : handleAddPost}
            >
              {currentPost ? "Save Changes" : "Add Post"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
              onClick={()=>setIsModalOpen(false)}
            >
              Cancle
            </button> </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
