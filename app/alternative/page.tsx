"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Title, TextInput } from "@tremor/react";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../context/context";
import AddModal from "./modal/addModal";
import EditModal from "./modal/editModal";
import Axios from "@/postgres";
import "react-toastify/dist/ReactToastify.css";

export default function Alternative() {
  const { criteria, setCriteria, alternative, setAlternative } = useGlobalContext();

  const [currentAlternative, setCurrentAlternative] = useState(-1);
  const [addAlternativeModal, setAddAlternativeModal] = useState(false);
  const [editAlternativeModal, setEditAlternativeModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedAlternative = alternative.filter((item: any) => item.check);

  // Get criteria
  useEffect(() => {
    const fetchData = async () => {
      const criteria = await Axios.get(`/criteria`).then((res) =>
        res.data.map((item: any) => {
          return {
            ...item,
            check: false,
          };
        })
      );
      setCriteria(criteria);
    };
    fetchData();
  }, []);

  // Add alternative
  const handleAdd = async (formData: any) => {
    if (formData.name === "") {
      toast.error("Please input Name");
      return;
    }

    const form: any = {
      name: formData.name,
    };

    for (const item of formData.rating) {
      if (item.name === "Price") {
        form[item.name.toLowerCase()] = String(item.value);
        if (item.value === "" || parseFloat(item.value) === 0) {
          toast.error("Price should be greater than 0");
          return;
        }
      } else {
        form[item.name.toLowerCase()] = item.value;
        if (item.value === "") {
          toast.error(`Please input ${item.name}`);
          return;
        }

        if (item.name.toLowerCase() === "weight" && parseFloat(item.value) === 0) {
          toast.error("Weight should be greater than 0");
          return;
        }
      }
    }

    const res = await Axios.post(`/alternative`, form).then((res) => res.data);

    if (res.status !== 201) return;

    const alternative = await Axios.get(`/alternative`).then((res) =>
      res.data.map((item: any) => {
        return {
          ...item,
          check: false,
        };
      })
    );
    setAlternative(alternative);
    setAddAlternativeModal(false);
  };

  // Get alternatives
  useEffect(() => {
    const fetchData = async () => {
      const alternative = await Axios.get(`/alternative`).then((res) =>
        res.data.map((item: any) => {
          return {
            ...item,
            check: false,
          };
        })
      );
      setAlternative(alternative);
    };
    fetchData();
  }, []);

  // Edit alternative
  const handleEdit = async (formData: any) => {
    if (formData.name === "") {
      toast.error("Please input name");
      return;
    }

    const form: any = {
      id: formData.id,
      name: formData.name,
    };

    console.log("FormData", formData.rating);

    for (const item of formData.rating) {
      if (item.name === "price") {
        form[item.name.toLowerCase()] = String(item.value);
        if (item.value === "" || parseFloat(item.value) === 0) {
          toast.error("Price should be greater than 0");
          return;
        }
      } else {
        form[item.name.toLowerCase()] = item.value;
        if (item.value === "") {
          toast.error(`Please input ${item.name}`);
          return;
        }

        if (item.name.toLowerCase() === "weight" && parseFloat(item.value) === 0) {
          toast.error("Weight should be greater than 0");
          return;
        }
      }
    }

    const res = await Axios.patch(`/alternative`, form).then((res) => res.data);

    if (res.status !== 202) return;

    const supplier = await Axios.get(`/alternative`).then((res) =>
      res.data.map((item: any) => {
        return {
          ...item,
          check: false,
        };
      })
    );
    setAlternative(supplier);
    setEditAlternativeModal(false);
  };

  // Delete alternative
  const handleDelete = async (id: string) => {
    const res = await Axios.delete(`/alternative/${id}`).then((res) => res.data);

    if (res.status !== 202) return;

    const alternative = await Axios.get(`/alternative`).then((res) =>
      res.data.map((item: any) => {
        return {
          ...item,
          check: false,
        };
      })
    );
    setAlternative(alternative);
  };

  // Include alternative
  const handleCheckbox = async (id: string) => {
    if (id === "selectAll") {
      setSelectAll(!selectAll);

      const newData = alternative.map((item: any) => ({
        ...item,
        check: !selectAll,
      }));
      setAlternative(newData);
      localStorage.setItem("alternative", JSON.stringify(newData));
    } else {
      const newData = alternative.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            check: !item.check,
          };
        } else {
          return item;
        }
      });
      setAlternative([...newData]);
      localStorage.setItem("alternative", JSON.stringify(newData));
    }
  };

  const filteredAlternative = alternative.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shape.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.connectivity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.grip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (parseInt(searchQuery) >= 30 && parseInt(searchQuery) <= 200 && parseInt(item.weight) <= parseInt(searchQuery)) ||
      item.sensor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (parseInt(searchQuery) > 100000 && parseInt(item.price) <= parseInt(searchQuery))
  );

  return (
    <>
      {addAlternativeModal && <AddModal criteriaData={criteria} setModal={setAddAlternativeModal} handleSubmit={handleAdd} />}
      {editAlternativeModal && <EditModal criteriaData={criteria} setModal={setEditAlternativeModal} alternativeData={alternative[alternative.findIndex((item: any) => item.id === currentAlternative)]} handleSubmit={handleEdit} />}
      <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 ">
        <Card className="w-full h-full bg-[#1D283A] pb-20 rounded-[15px]">
          <Flex justifyContent="between" alignItems="center" className="w-full">
            <Title className="font-bold text-[#C8CAD0] text-xl w-1/2">Mouse Gaming List</Title>
            <Flex justifyContent="end" alignItems="center" className="w-1/2 gap-5">
              <TextInput className="w-[300px] h-[44px] bg-[#0F1729] border border-none rounded-lg" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <Button size="xs" variant="secondary" icon={AiOutlinePlus} onClick={() => setAddAlternativeModal(true)} className="bg-[#0F1729] px-3 py-3 border border-none rounded-lg">
                Add Alternative
              </Button>
            </Flex>
          </Flex>
          <div className="w-full h-full overflow-y-scroll mt-5 z-[50]">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <Button
                      size="xs"
                      color="slate"
                      onClick={() => handleCheckbox("selectAll")}
                      className={`flex justify-center items-center w-5 h-5 my-auto mx-auto ${selectAll ? "bg-[#2BD4BD] border border-[#2BD4BD]" : "border border-[#64748B]"} rounded-[3px]`}
                    >
                      {selectAll && <AiOutlineCheck color="#182730" />}
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell>Mouse Name</TableHeaderCell>
                  <TableHeaderCell>Shape</TableHeaderCell>
                  <TableHeaderCell>Connectivity</TableHeaderCell>
                  <TableHeaderCell>Grip</TableHeaderCell>
                  <TableHeaderCell>Weight</TableHeaderCell>
                  <TableHeaderCell>Sensor</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Action</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody className="mt-10">
                {/* {alternative &&
                  alternative.map((item: any) => ( */}
                {filteredAlternative.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Button
                        size="xs"
                        color="slate"
                        onClick={() => handleCheckbox(item.id)}
                        className={`flex justify-center items-center w-5 h-5 my-auto mx-auto ${item.check ? "bg-[#2BD4BD] border border-[#2BD4BD]" : "border border-[#64748B]"} rounded-[3px]`}
                      >
                        {item.check && <AiOutlineCheck color="#182730" />}
                      </Button>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.shape}</TableCell>
                    <TableCell>{item.connectivity}</TableCell>
                    <TableCell>{item.grip}</TableCell>
                    <TableCell>{item.weight}g</TableCell>
                    <TableCell>{item.sensor}</TableCell>
                    <TableCell>Rp{item.price}</TableCell>
                    <TableCell className="mx-auto flex justify-center items-start gap-3">
                      <button
                        onClick={() => {
                          setCurrentAlternative(item.id);
                          setEditAlternativeModal(true);
                        }}
                        className="w-5 h-5 flex justify-center items-center bg-[#F4C152] text-[#0F1729] rounded-[3px]"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="w-5 h-5 flex justify-center items-center bg-[#FB6F84] text-[#0F1729] rounded-[3px]">
                        <AiOutlineDelete />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </Card>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
}
