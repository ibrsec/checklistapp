"use client";
import useChekclistApi from "@/helpers/useChekclistApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

 


const HistoryPage = () => {

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
  

  return (
    <div>
        <h1 className="text-3xl text-slate-500">HistoryPage</h1>

<table className="table border border-collapse">
        <thead>
          <tr>
            <th className="w-20 text-start">status</th>
            <th className="w-80 text-start">name</th>
            <th className="w-40 text-start">time</th>
          </tr>
        </thead>
        <tbody className="border">
          {resultCheckList?.map((item) => (
            <tr key={item?.id} className="table-row">
              <td>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={item?.status}
                  onChange={() => toggleStatusTask(item?.id)}
                />
              </td>
              <td>{item?.name}</td>
              <td>{item?.time}</td>
              <td>
                <button
                  className="py-1 px-2 bg-red-500 text-white hover:bg-red-400 active:bg-red-600 rounded-md text-sm transition-all"
                  onClick={() => deleteChecklist(item?.id)}
                >
                  Delete
                </button>
              </td>
              {/* <td>
                <button
                  className="py-1 px-2 bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 rounded-md text-sm transition-all"
                  onClick={() => {
                    setEditBox(!editBox);
                    setContentForEdit(item)
                  }}
                >
                  {editBox && item?.id === contentForEdit?.id ? "Editting" : "Edit"}
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default HistoryPage