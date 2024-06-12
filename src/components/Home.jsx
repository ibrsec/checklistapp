"use client";
import CreateNewComp from "./CreateNewComp";
import useChekclistApi, { getChecklists } from "../helpers/useChekclistApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StartApiButton from "./StartApiButton";

const HomePage = () => {
  let checklist = useSelector((state) => state.checklist.checklist);
  console.log("checklist = from home = ", checklist);
  const { getChecklists, deleteChecklist, toggleStatusTask } =
    useChekclistApi();
  useEffect(() => {
    getChecklists();
  }, []);

  const resultCheckList = [...checklist]?.sort(function (a, b) {
    const hourA = a?.time.split(":")[0];
    const hourB = b?.time.split(":")[0];
    const minuteA = a?.time.split(":")[1];
    const minuteB = b?.time.split(":")[1];
    // compare hours first
    if (hourA < hourB) return -1;
    if (hourA > hourB) return 1;
    // compare minutes next
    if (minuteA < minuteB) return -1;
    if (minuteA > minuteB) return 1;

    // couldn't break the tie
    return 0;
  });
  console.log("resultCheckList====", resultCheckList);

  const [editBox, setEditBox] = useState(false);
  const [contentForEdit, setContentForEdit] = useState({});

  return (
    <div className="px-2 py-5  my-5">
      <CreateNewComp
        editBox={editBox}
        setEditBox={setEditBox}
        contentForEdit={contentForEdit}
      />

      
      {checklist.length > 0 ? (
        <table className="table border border-collapse mx-auto p-2 my-5">
          <thead>
            <tr>
              <th className="w-20 text-start">status</th>
              <th className="w-80 text-start">name</th>
              <th className="w-40 text-start">time</th>
            </tr>
          </thead>
          <tbody className="border">
            {resultCheckList?.map((item) => (
              <tr key={item?.id} className="table-row hover:bg-slate-300 transition-all ">
                <td>
                  <input
                    type="checkbox"
                    name={`label-${item?.id}`}
                    id={`label-${item?.id}`}
                    checked={item?.status}
                    onChange={() => toggleStatusTask(item?.id)}
                    className="cursor-pointer"
                  />
                </td>
                <td><label className="cursor-pointer" htmlFor={`label-${item?.id}`}>{item?.name}</label></td>
                <td><label className="cursor-pointer" htmlFor={`label-${item?.id}`}>{item?.time}</label></td>
                <td>
                  <button
                    className="py-1 px-2 bg-red-500 text-white hover:bg-red-400 active:bg-red-600 rounded-md text-sm transition-all"
                    onClick={() => deleteChecklist(item?.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 rounded-md text-sm transition-all"
                    onClick={() => {
                      setEditBox(!editBox);
                      setContentForEdit(item);
                    }}
                  >
                    {editBox && item?.id === contentForEdit?.id
                      ? "Editting"
                      : "Edit"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center my-4">
          <h4 className="text-xl text-center text-red-400 my-3">
            You need to start the day !!
          </h4>
          <StartApiButton />
        </div>
      )}
      
    </div>
  );
};

export default HomePage;
