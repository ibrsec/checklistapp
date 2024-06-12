"use client";
import TableComp from "@/components/TableComp";
import useChekclistApi from "@/helpers/useChekclistApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  let checklist = useSelector((state) => state.checklist.checklist);
  let allChecklists = useSelector((state) => state.checklist.allDayCheckList);
  console.log("checklist = from home = ", checklist);
  const { getChecklists, deleteChecklist, toggleStatusTask, getAllDays } =
    useChekclistApi();
  useEffect(() => {
    getChecklists();
    getAllDays();
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

  // allChecklists.reverse();
  const resultAllChecklists = allChecklists.length > 0 ? [...allChecklists].sort(function (a, b) {
    const dateA = new Date(a?.date).toLocaleDateString('tr-TR');
    const dateB = new Date(b?.date).toLocaleDateString('tr-TR');
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  }) : [];
  console.log('resultAllChecklists', resultAllChecklists)

  console.log("allChecklists", allChecklists);
  return (
    <div className="mb-5 px-2">
      <h1 className="text-3xl text-slate-500 text-center my-5">HistoryPage</h1>
      <div className="flex flex-col gap-10 items-center justify-center ">
      {resultAllChecklists?.map((item) => (
        <TableComp key={item?.id} checklist={item?.tasks} date={new Date(item?.date).toLocaleDateString('tr-TR')} />
      ))}
      </div>
      {/* <table className="table border border-collapse">
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
              
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default HistoryPage;
