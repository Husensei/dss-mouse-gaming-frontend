"use client";

import { useEffect, useState } from "react";
import { Button, Card, Flex, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Title } from "@tremor/react";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useGlobalContext } from "../context/context";
import AddModal from "./modal/addModal";
import EditModal from "./modal/editModal";
import Axios from "@/postgres";

export default function Alternative() {
  const { criteria, setCriteria, alternative, setAlternative } = useGlobalContext();

  const [currentAlternative, setCurrentAlternative] = useState(-1);
  const [addAlternativeModal, setAddAlternativeModal] = useState(false);
  const [editAlternativeModal, setEditAlternativeModal] = useState(false);

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
    if (formData.name === "") return alert("Please input name");

    const form: any = {
      name: formData.name,
    };

    formData.rating.map((item: any) => {
      form[item.name.toLowerCase()] = item.name == "Price" ? String(item.value) : item.value;
    });

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
    if (formData.name === "") return alert("Please input name");

    const form: any = {
      id: formData.id,
      name: formData.name,
    };

    formData.rating.map((item: any) => {
      form[item.name.toLowerCase()] = item.name == "Price" ? String(item.value) : item.value;
    });

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
  };

  return (
    <>
      {addAlternativeModal && <AddModal criteriaData={criteria} setModal={setAddAlternativeModal} handleSubmit={handleAdd} />}
      {editAlternativeModal && <EditModal criteriaData={criteria} setModal={setEditAlternativeModal} alternativeData={alternative[alternative.findIndex((item: any) => item.id === currentAlternative)]} handleSubmit={handleEdit} />}
      <Card className="col-span-8 h-screen bg-[#0F1729] px-5 py-5 ">
        <Card className="w-full h-full bg-[#1D283A] pb-20 rounded-[15px]">
          <Flex justifyContent="between" alignItems="center" className="w-full">
            <Title className="font-bold text-[#C8CAD0] text-xl">Mouse Gaming List</Title>
            <Button size="xs" variant="secondary" icon={AiOutlinePlus} onClick={() => setAddAlternativeModal(true)} className="bg-[#0F1729] px-3 py-3 border border-none rounded-lg">
              Add Alternative
            </Button>
          </Flex>
          <div className="w-full h-full overflow-y-scroll mt-5 z-[50]">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Include</TableHeaderCell>
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
                {alternative &&
                  alternative.map((item: any) => (
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
    </>
  );
}
