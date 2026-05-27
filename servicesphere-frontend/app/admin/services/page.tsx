"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ServicesPage() {

  const [services, setServices] = useState<Service[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  // FETCH SERVICES
  const fetchServices = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/services"
      );

      setServices(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchServices();

  }, []);

  // ADD OR UPDATE
  const handleSave = async () => {

    if (!name || !description || !price) {

      alert("Please fill all fields");
      return;

    }

    try {

      const serviceData = {
        name,
        description,
        price: Number(price),
      };

      // UPDATE
      if (editId !== null) {

        await axios.put(
          `http://localhost:8080/api/services/${editId}`,
          serviceData
        );

        alert("Service updated");

      } else {

        // CREATE
        await axios.post(
          "http://localhost:8080/api/services",
          serviceData
        );

        alert("Service added");

      }

      // CLEAR
      setName("");
      setDescription("");
      setPrice("");
      setEditId(null);

      fetchServices();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE
  const handleDelete = async (id: number) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/services/${id}`
      );

      fetchServices();

    } catch (error) {

      console.log(error);

    }

  };

  // EDIT
  const handleEdit = (service: Service) => {

    setName(service.name);
    setDescription(service.description);
    setPrice(service.price.toString());

    setEditId(service.id);

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">

          Manage Services

        </h1>

        <p className="text-gray-500 mt-2">

          Create, update and delete services

        </p>

      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm mb-10">

        <h2 className="text-2xl font-semibold mb-6">

          {editId !== null
            ? "Update Service"
            : "Add Service"}

        </h2>

        <div className="grid grid-cols-3 gap-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* DESCRIPTION */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-2 transition"
        >

          <Plus size={20} />

          {editId !== null
            ? "Update Service"
            : "Add Service"}

        </button>

      </div>

      {/* SERVICES */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm">

        <h2 className="text-2xl font-semibold mb-6">

          All Services

        </h2>

        {
          services.length === 0 ? (

            <p className="text-gray-500">

              No services available

            </p>

          ) : (

            <div className="space-y-5">

              {services.map((service) => (

                <div
                  key={service.id}
                  className="border rounded-2xl p-5 flex items-center justify-between"
                >

                  {/* LEFT */}
                  <div>

                    <h1 className="text-xl font-semibold text-gray-800">

                      {service.name}

                    </h1>

                    <p className="text-gray-500 mt-1">

                      {service.description}

                    </p>

                    <p className="text-blue-600 font-semibold mt-2">

                      ₹{service.price}

                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl transition"
                    >

                      <Pencil size={18} />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )
        }

      </div>

    </div>

  );

}